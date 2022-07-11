export const accountSchema = `CREATE TABLE IF NOT EXISTS accounts(
    account_id VARCHAR(255) NOT NULL,
    customer_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES customers(account_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
 );`
 
