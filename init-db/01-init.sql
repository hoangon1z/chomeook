-- Initialize database for Save Paws
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'UTC';

-- Create a read-only user for analytics (optional)
-- CREATE USER analytics_user WITH PASSWORD 'analytics123';
-- GRANT CONNECT ON DATABASE globaldogrescue TO analytics_user;
-- GRANT USAGE ON SCHEMA public TO analytics_user;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_user;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analytics_user;
