import { Request, Response, Router } from "express";
import { CustomerService } from "../services/customers/customerService";
import { LoginService } from "../services/login";
import { AccountService } from "../services/accounts/accountService";
import { authorize } from "../middleware/authVerifier";




export class BaseController {

    /**
     * Create the routes.
     *
     * @method loadRoutes
     */
    public loadRoutes(prefix: string, router: Router) {
        this.registerCustomer(prefix, router);
        this.initLoginCustomer(prefix, router);
        this.fundAccount(prefix, router);


    }

    private registerCustomer(prefix: string, router: Router): any {
        router.post(prefix + "/register", async (req: Request, res: Response) => {
            new CustomerService().create(req, res);
        });
    }

    private initLoginCustomer(prefix: string, router: Router): any {
        router.post(prefix + "/login", async (req: Request, res: Response) => {
            new LoginService(req, res).authenticate();
        });
    }

    private fundAccount(prefix: string, router: Router): any {
        router.post(prefix + "/fund", authorize, async (req: Request, res: Response) => {
            new AccountService().fundAccount(req, res);
        });
    }



}
