-- =====================================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- Adds property details columns to the bookings table
-- =====================================================

-- Add address column
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS address text;

-- Add property details columns
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS square_footage integer;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS bedrooms integer;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS bathrooms numeric(3,1);

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings';