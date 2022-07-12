import { Request } from "express";
import { customerSchema } from "../../validation/customerPayloadSchema";
import { dbConnection } from "../../db/dbConnection";
import bcrypt from "bcrypt";
import ShortUniqueId from "short-unique-id";




export class CustomerRegistrationHandler {

    public static validateRegistration(req: Request) {
        const validation = customerSchema.validate(req.body);
        const { error } = validation;
        let failedValidation = error ? error.message : null;
        return failedValidation;
    }

    public static async createCustomerRecord(req: Request) {
        let {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        const passwordHash = await this.hashPassword(password);

        const uid = new ShortUniqueId({ length: 10 });
        let account_id = uid();

        let createCustomerQuery = `INSERT INTO customers (first_name, last_name, email, password, account_id)
        VALUES (?, ?, ?, ?, ?)`;

        let connection = await dbConnection();
        await connection.query(createCustomerQuery, [first_name, last_name, email, passwordHash, account_id]);
        
        let selectCustomerQuery = `SELECT first_name, last_name, email, customer_id, account_id FROM customers WHERE email = ?`;
        let [customerResult] = await connection.query<any[]>(selectCustomerQuery, [email]);

        if(!customerResult.length){
            throw new Error("Failed to create customer")
        }

        let customerId = customerResult[0].customer_id;
        await this.createCustomerAccount(account_id, customerId);
        return customerResult;

    }

    public static async checkCustomerExistence(req: Request) {
        let email = req.body.email;
        let connection = await dbConnection();
        let sql = `SELECT * FROM customers WHERE email = ?`;
        const [rows] = await connection.query<any[]>(sql, [email]);
        return rows;
    }

    private static async hashPassword(password: string) {
        const hashed = await bcrypt.hash(password, 10);
        return hashed;
    }

    private static async createCustomerAccount(account_id:string, customer_id:number){
        let createAccountQuery = `INSERT INTO accounts (account_id, customer_id, amount)
        VALUES (?, ?, ?)`;

        let connection = await dbConnection();
        await connection.query(createAccountQuery, [account_id, customer_id, 0]);

        let selectQuery = `SELECT * FROM accounts WHERE account_id = ?`;
        let [result] = await connection.query<any[]>(selectQuery, [account_id]);
        
        if(!result.length){
            throw new Error("Failed to create account for customer");
        }

        return result;
        
    }


}
