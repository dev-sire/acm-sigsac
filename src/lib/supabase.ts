
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define registration types
export type RegistrationData = {
  id?: string;
  name: string;
  fatherName: string;
  email: string;
  phone: string;
  rollNo: string;
  department: string;
  university: string;
  teamMemberName?: string | null;
  createdAt?: string;
};

// Registration service functions
export const registrationService = {
  // Get count of registrations for an event
  async getRegistrationsCount(eventType: string): Promise<number> {
    const { count, error } = await supabase
      .from(`registrations_${eventType}`)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error getting registrations count:', error);
      throw error;
    }
    
    return count || 0;
  },
  
  // Submit registration
  async submitRegistration(eventType: string, data: RegistrationData): Promise<void> {
    // Check if registration limit has been reached
    const count = await this.getRegistrationsCount(eventType);
    if (count >= 100) {
      throw new Error('Registration limit reached for this event');
    }
    
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from(`registrations_${eventType}`)
      .select('email')
      .eq('email', data.email)
      .single();
      
    if (existingUser) {
      throw new Error('You have already registered for this event');
    }
    
    // Submit registration
    const { error } = await supabase
      .from(`registrations_${eventType}`)
      .insert([{
        ...data,
        createdAt: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('Error submitting registration:', error);
      throw error;
    }
  }
};
