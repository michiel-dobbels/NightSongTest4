# Political Hub App

This directory contains a minimal React Native project using Expo and Supabase.

Currently the app only displays a simple "Hello World" message. It is intended as a starting point for a political hub app.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm start
   ```
   Then scan the QR code with the Expo Go app on your iPhone.

Remember to replace the Supabase credentials in `src/supabase.js` with your project credentials.

## Supabase SQL scripts

Run the SQL files found in the `sql/` directory using the Supabase dashboard.

1. Open your project in Supabase and go to the **SQL editor**.
2. Create a new query and paste in the contents of `sql/setup.sql` and `sql/profiles.sql`.
3. Execute the query to set up the tables and policies.
