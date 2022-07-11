import { Request, Response } from "express";
import { BaseService } from "../baseService";
import { CustomerRegistrationHandler } from "./customerHandler";

export class CustomerService extends BaseService {
    private CUSTOMER_EXIST_MSG: string = "Customer already exists";

    public async create(req: Request, res: Response) {
        try {
            let failedValidation = CustomerRegistrationHandler.validateRegistration(req);

            if (failedValidation) return this.sendError(req, res, 400, failedValidation);

            let customer = await CustomerRegistrationHandler.checkCustomerExistence(req);

            if (customer.length){
                return this.sendError(req, res, 412, this.CUSTOMER_EXIST_MSG)
            } 

            let customerRecord = await CustomerRegistrationHandler.createCustomerRecord(req);

            if(!customerRecord.length){
                throw new Error("Failed to create customer")
            }

            return this.sendResponse(req, res, 201, customerRecord);

        } catch (error:any) {
            console.error(`Error occurred in customerService::: ${error}`);
            return this.sendError(req, res, 500, error.message);
        }
    }


}
