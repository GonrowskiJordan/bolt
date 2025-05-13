/*
  # Create attestations table and policies

  1. New Tables
    - `attestations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `status` (text, either 'opt-in' or 'opt-out')
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `plan_year` (text, the year this attestation applies to)
      - `metadata` (jsonb, additional attestation data)

  2. Security
    - Enable RLS on attestations table
    - Add policies for:
      - Users can read their own attestations
      - Users can create their own attestations (one per plan year)
      - Records are immutable (no updates allowed)
*/

-- Create the attestations table
CREATE TABLE attestations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL CHECK (status IN ('opt-in', 'opt-out')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  plan_year text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Ensure one attestation per user per plan year
  CONSTRAINT unique_user_plan_year UNIQUE (user_id, plan_year)
);

-- Enable RLS
ALTER TABLE attestations ENABLE ROW LEVEL SECURITY;

-- Users can read their own attestations
CREATE POLICY "Users can read own attestations"
  ON attestations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create attestations for themselves (one per plan year)
CREATE POLICY "Users can create own attestations"
  ON attestations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (
      SELECT 1 
      FROM attestations a
      WHERE a.user_id = auth.uid()
      AND a.plan_year = plan_year
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_attestations_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON attestations
  FOR EACH ROW
  EXECUTE FUNCTION update_attestations_timestamp();