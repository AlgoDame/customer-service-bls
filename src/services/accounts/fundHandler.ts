import { Request } from "express";
import { accountFundSchema } from "../../validation/accountFundPayloadSchema";
import { dbConnection } from "../../db/dbConnection";
import { BillingServiceAxiosInstance } from "../../utils/billingAxiosInstance";
import { ICustomer } from "../../interface/icustomer";




export class FundAccountHandler {

    public static validatePayload(req: Request) {
        const validation = accountFundSchema.validate(req.body);
        const { error } = validation;
        let failedValidation = error ? error.message : null;
        return failedValidation;
    }

    public static async validateAccount(req: Request) {
        let accountId = req.body.account_id;
        let connection = await dbConnection();
        let sql = `SELECT * FROM customers WHERE account_id = ?`;
        const [customerRecord] = await connection.query<any[]>(sql, [accountId]);
        return customerRecord;
    }

    public static async sendFundDetailToBilling(req: Request, customerRecord: ICustomer) {
        let requestBody = {
            account_id: req.body.account_id,
            amount: req.body.amount,
            customer_id: customerRecord.customer_id
        }

        let axiosInstance = BillingServiceAxiosInstance.getAxiosInstance(req.headers.authorization || "");
        const response = await axiosInstance.post("/transactions", requestBody);
        console.log("billing funding response::: ", response.data);
        return response.data;
    }




}
