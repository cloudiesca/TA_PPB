// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svsqfoyntbomowcetkhg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2c3Fmb3ludGJvbW93Y2V0a2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzMwMjgsImV4cCI6MjA3OTMwOTAyOH0.WFesntD7f2mXfvG7-j83sgMtqQHfbokqiIehQ6YQnE4';

export const supabase = createClient(supabaseUrl, supabaseKey);