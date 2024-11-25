import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnegjquomzhooqfavtii.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZWdqcXVvbXpob29xZmF2dGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTgzMDQsImV4cCI6MjA0ODA3NDMwNH0.iFpS0mTyxMaYzSW30dXxUTG7h-FU6yWl_WEhqx1x4oY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const initializeSchema = async () => {
  // Create staff tables
  await supabase.rpc('create_staff_tables', {
    sql: `
      CREATE TABLE IF NOT EXISTS staff (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      CREATE TABLE IF NOT EXISTS loan_teams (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        loan_id TEXT REFERENCES loans(id),
        loan_officer_id UUID REFERENCES staff(id),
        additional_loan_officer_id UUID REFERENCES staff(id),
        loan_processor_id UUID REFERENCES staff(id),
        additional_loan_processor_id UUID REFERENCES staff(id),
        loan_officer_assistant_id UUID REFERENCES staff(id),
        additional_loan_officer_assistant_id UUID REFERENCES staff(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );
    `
  });

  // Create borrower-related tables
  await supabase.rpc('create_borrower_tables', {
    sql: `
      CREATE TABLE IF NOT EXISTS borrowers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        loan_id TEXT REFERENCES loans(id),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        dob DATE NOT NULL,
        ssn TEXT NOT NULL,
        marital_status TEXT,
        current_address TEXT NOT NULL,
        years_at_address INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      CREATE TABLE IF NOT EXISTS employment (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        borrower_id UUID REFERENCES borrowers(id),
        employer_name TEXT NOT NULL,
        position TEXT NOT NULL,
        years_employed NUMERIC,
        monthly_income NUMERIC NOT NULL,
        employment_type TEXT NOT NULL,
        employer_address TEXT NOT NULL,
        employer_phone TEXT,
        is_current BOOLEAN DEFAULT true,
        start_date DATE NOT NULL,
        end_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );
    `
  });

  // Create property and loan details tables
  await supabase.rpc('create_property_tables', {
    sql: `
      CREATE TABLE IF NOT EXISTS properties (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        loan_id TEXT REFERENCES loans(id),
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip TEXT NOT NULL,
        property_type TEXT NOT NULL,
        occupancy_type TEXT NOT NULL,
        purchase_price NUMERIC,
        estimated_value NUMERIC,
        year_built INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      CREATE TABLE IF NOT EXISTS credit_reports (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        borrower_id UUID REFERENCES borrowers(id),
        credit_score INTEGER NOT NULL,
        report_date DATE NOT NULL,
        total_monthly_debt NUMERIC,
        bankruptcy_history BOOLEAN DEFAULT false,
        foreclosure_history BOOLEAN DEFAULT false,
        report_source TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      CREATE TABLE IF NOT EXISTS loan_documents (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        loan_id TEXT REFERENCES loans(id),
        document_type TEXT NOT NULL,
        file_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        uploaded_by UUID REFERENCES staff(id),
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );
    `
  });

  // Update loans table with additional fields
  await supabase.rpc('update_loans_table', {
    sql: `
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS loan_purpose TEXT NOT NULL;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS loan_type TEXT NOT NULL;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS loan_term INTEGER NOT NULL;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS interest_rate_type TEXT NOT NULL;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS down_payment_amount NUMERIC;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS down_payment_percentage NUMERIC;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS estimated_closing_date DATE;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS application_date DATE DEFAULT CURRENT_DATE;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS loan_status TEXT DEFAULT 'pending';
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS underwriting_status TEXT;
      ALTER TABLE loans ADD COLUMN IF NOT EXISTS closing_status TEXT;
    `
  });
};