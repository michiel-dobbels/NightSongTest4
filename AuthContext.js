import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // 🧠 includes username
  const [loading, setLoading] = useState(true);

  // Helper ensures a profile exists for the given user so posts can
  // reference it without foreign-key errors
  const ensureProfile = async (authUser) => {
    if (!authUser) return null;

    // Try to load an existing profile first
    const existing = await fetchProfile(authUser.id);
    if (existing) return existing;

    // Fall back to metadata or the email prefix if no profile exists
    const metaUsername = authUser.user_metadata?.username;
    const defaultUsername = metaUsername
      ? metaUsername
      : authUser.email
      ? authUser.email.split('@')[0]
      : 'anonymous';

    // Create a new profile with the provided or derived username
    const { error } = await supabase.from('profiles').insert({
      id: authUser.id,
      username: defaultUsername,
      display_name: defaultUsername,
    });

    // Log any insertion error for easier debugging
    if (error) console.error('Failed to insert profile:', error);

    const profileData = {
      id: authUser.id,
      username: defaultUsername,
      display_name: defaultUsername,
      email: authUser.email,
    };

    setProfile(profileData);
    return profileData;
  };

  // 🔁 Refresh session on mount
  useEffect(() => {
    const getSession = async () => {
      // supabase-js v1 exposes `session()` to fetch the current session
      const session = supabase.auth.session();
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        // Ensure a profile exists so posting doesn't hit foreign-key errors
        await ensureProfile(session.user);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Refresh or create the profile for consistent posting
        ensureProfile(session.user);
      } else {
        setProfile(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // 🔐 Sign in
  async function signIn(email, password) {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (user) {
      // Immediately store the authenticated user
      setUser(user);

      // Create/load the profile so posts have the foreign key ready
      await ensureProfile(user);
    }

    return { error };
  }

  // 🔐 Sign up
  const signUp = async (email, password, username) => {
    if (!username) {
      return { error: { message: 'Username is required' } };
    }

    // supabase-js v1 uses a different signature than v2
    const { user: newUser, error } = await supabase.auth.signUp(
      { email, password },
      { data: { username, display_name: username } }
    );

    if (error) {
      // If an account already exists for this email, treat the attempt as a
      // regular sign in so the original username remains linked to the email.
      if (error.message && error.message.toLowerCase().includes('already')) {
        return await signIn(email, password);
      }

      console.error('❌ Sign up error:', error);
      return { error };
    }

    const userId = newUser?.id;
    if (userId) {
      const { error: insertError } = await supabase.from('profiles').insert({
        id: userId,
        username,
        display_name: username,
      });

      if (insertError) {
        // The insert can fail if policies aren't set up yet
        console.error('Failed to insert profile on sign up:', insertError);
      }

      // Immediately store the authenticated user and profile
      setUser(newUser);
      setProfile({
        id: userId,
        username,
        display_name: username,
        email: newUser.email,
      });
    }

    return { error: null };
  };


  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);

  };

  // 🔍 Fetch profile by ID
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      const authUser = supabase.auth.user();
      const meta = authUser?.user_metadata || {};
      const profileData = {
        ...data,
        email: authUser?.email,
        username: data.username || meta.username || authUser?.email?.split('@')[0],
        display_name:
          data.display_name || meta.display_name || data.username || meta.username,
      };
      setProfile(profileData);
      return profileData;
    }

    return null;
  };

  const value = {
    user,
    profile,      // ⬅️ includes .username for posts
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
