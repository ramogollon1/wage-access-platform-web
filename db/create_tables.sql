SELECT 'CREATE DATABASE wage_access_platform'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wage_access_platform');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    total_earned_wages DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL 
);


CREATE TABLE IF NOT EXISTS employee_wages (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL,
    total_earned_wages DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS currency_rates (
    id SERIAL PRIMARY KEY,
    currency_pair VARCHAR(10) UNIQUE NOT NULL,
    exchange_rate DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS wage_access_requests (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(50) UNIQUE,
    employee_id VARCHAR(10) NOT NULL,
    requested_amount DECIMAL(10, 2) NOT NULL,
    requested_currency VARCHAR(10)
);

-- -- Insertar datos de salario de empleados en la tabla employee_wages
-- INSERT INTO employee_wages (employee_id, total_earned_wages, currency)
-- VALUES
--   ('E01', 1200, 'USD'),
--   ('E02', 9500, 'ARS'),
--   ('E03', 800, 'USD');

-- -- Insertar tasas de cambio de moneda en la tabla currency_rates
-- INSERT INTO currency_rates (currency_pair, exchange_rate)
-- VALUES
--   ('USD_ARS', 100),
--   ('ARS_USD', 0.01);

-- -- Insertar solicitudes de acceso a salarios en la tabla wage_access_requests
-- INSERT INTO wage_access_requests (request_id, employee_id, requested_amount, requested_currency)
-- VALUES
--   ('R01', 'E01', 200, 'USD'),
--   ('R02', 'E02', 1000, 'ARS'),
--   ('R03', 'E03', 100, 'USD');
