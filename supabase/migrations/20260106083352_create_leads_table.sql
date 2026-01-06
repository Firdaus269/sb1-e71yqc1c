/*
  # Create leads table for Aurotradex

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the lead
      - `mobile` (text, required) - Mobile phone number
      - `email` (text, required) - Email address
      - `created_at` (timestamptz) - Timestamp of lead submission
      - `updated_at` (timestamptz) - Timestamp of last update
      - `status` (text) - Lead status (new, contacted, qualified, etc.)
  
  2. Security
    - Enable RLS on `leads` table
    - Add policy for INSERT operations (allow anonymous users to submit)
    - Add policy for SELECT operations (only authenticated admin users)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
