import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitAttestation(attestationData: {
  status: 'opt-in' | 'opt-out';
  planYear: string;
  metadata?: Record<string, unknown>;
}) {
  const { data, error } = await supabase
    .from('attestations')
    .insert([
      {
        status: attestationData.status,
        plan_year: attestationData.planYear,
        metadata: attestationData.metadata
      }
    ])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique violation
      throw new Error('You have already submitted an attestation for this plan year');
    }
    throw error;
  }

  return data;
}