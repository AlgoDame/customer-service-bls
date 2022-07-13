import { Request } from "express";
import { userAccountSchema } from "../../validation/accountFundPayloadSchema";
import { dbConnection } from "../../db/dbConnection";




export class GetAccountHandler {

    public static validatePayload(req: Request) {
        const validation = userAccountSchema.validate(req.query);
        const { error } = validation;
        let failedValidation = error ? error.message : null;
        return failedValidation;
    }

    public static async fetchAccount(req: Request) {
        let accountId = req.query.account_id;
        let connection = await dbConnection();
        let sql = `SELECT * FROM accounts WHERE account_id = ?`;
        const [accountRecord] = await connection.query<any[]>(sql, [accountId]);

        if(!accountRecord.length){
            let errorObject = {
                status: 404,
                message: "Account not found"
            }

            throw errorObject;
        }
        return accountRecord[0];
    }

}
