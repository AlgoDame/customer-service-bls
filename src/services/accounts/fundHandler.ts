import { Request } from "express";
import { accountFundSchema } from "../../validation/accountFundPayloadSchema";
import { dbConnection } from "../../db/dbConnection";
import { BillingServiceAxiosInstance } from "../../utils/billingAxiosInstance";




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
        const [rows] = await connection.query<any[]>(sql, [accountId]);
        return rows;
    }

    public static async sendFundDetailToBilling(req: Request) {
        let requestBody = {
            account_id: req.body.account_id,
            amount: req.body.amount
        }
        let axiosInstance = BillingServiceAxiosInstance.getAxiosInstance(req.headers.authorization || "");
        const response = await axiosInstance.post("/transactions", requestBody);
        console.log("funding response ", response);
        return response.data;
    }


    

}
