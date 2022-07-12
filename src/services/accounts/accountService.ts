import { Request, Response } from "express";
import { BaseService } from "../baseService";
import { FundAccountHandler } from "./fundHandler";

export class AccountService extends BaseService {
    private ACCOUNT_EXIST_MSG: string = "Account does not exist";

    public async fundAccount(req: Request, res: Response) {
        try {
            let failedValidation = FundAccountHandler.validatePayload(req);

            if (failedValidation) return this.sendError(req, res, 400, failedValidation);

            let customer = await FundAccountHandler.validateAccount(req);

            if (!customer.length){
                return this.sendError(req, res, 404, this.ACCOUNT_EXIST_MSG)
            } 

            let billingResponse = await FundAccountHandler.sendFundDetailToBilling(req);

            return this.sendResponse(req, res, 200, billingResponse);

        } catch (error:any) {
            console.error(`Error occurred in accountService::: ${error}`);
            return this.sendError(req, res, 500, error.message);
        }
    }


}
