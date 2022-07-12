import axios from "axios";

export class BillingServiceAxiosInstance {
    public static getAxiosInstance(authorization:string) {
        return axios.create({
            baseURL: process.env.BASE_URL_BILLING,
            headers: {
                authorization
            }
        });
    }

}

