import { Request, Response } from "express";
import { loginSchema } from "../validation/loginPayloadSchema";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseService } from "./baseService";
import { dbConnection } from "../db/dbConnection";


dotenv.config();

export class LoginService extends BaseService {
    private req: Request;
    private res: Response;
    private EMAIL_NOT_FOUND_MSG: string = "Email not found. Please register";
    private INVALID_CREDS_MSG: string = "Invalid email or password";

    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
    }


    public async authenticate() {
        try {

            let failedValidation = this.validateLogin();
            if (failedValidation) return this.sendError(this.req, this.res, 400, failedValidation);
            await this.verifyRegistration();

            const { email, password } = this.req.body;
            const secret = process.env.ACCESS_TOKEN_SECRET;
            
            const token = jwt.sign({ email, password }, secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            const loginResponse = {
                email,
                token
            }

            return this.sendResponse(this.req, this.res, 200, loginResponse);


        } catch (error:any) {
            if(error.status){
                return this.sendError(this.req, this.res, error.status, error.message);
            }
            return this.sendError(this.req, this.res, 500, error.message);

        }
        

    }

    private validateLogin() {
        const validation = loginSchema.validate(this.req.body);
        const { error } = validation;
        let failedValidation = error ? error.message : null;
        return failedValidation;
    }

    private async verifyRegistration() {
        let { email, password } = this.req.body;
        let connection = await dbConnection();
        let sql = `SELECT * FROM customers WHERE email = '${email}'`;
        const [customerRecord] = await connection.query<any[]>(sql);

        if (!customerRecord.length) {
            let errorObject = {
                status: 404,
                message: this.EMAIL_NOT_FOUND_MSG
            }

            throw errorObject;
        }

        const passwordHash = customerRecord[0].password;
        const match = await bcrypt.compare(password, passwordHash);

        if (!match) {
            let errorObject = {
                status: 400,
                message: this.INVALID_CREDS_MSG
            }

            throw errorObject;
        }

        return true

    }

}
