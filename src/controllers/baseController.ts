import { Request, Response, Router } from "express";
import { CustomerService } from "../services/customers/customerService";



export class BaseController {

    /**
     * Create the routes.
     *
     * @method loadRoutes
     */
    public loadRoutes(prefix: string, router: Router) {
        this.registerCustomer(prefix, router);
     

    }

    private registerCustomer(prefix: string, router: Router): any {
        router.post(prefix + "/register", async (req: Request, res: Response) => {
            new CustomerService().create(req, res);
        });
    }

    

}
