import { dbConnection} from "./dbConnection";
import { customerSchema } from "../schema/customerSchema";

export async function createCustomerTable(){
    let connection = await dbConnection();
    const [rows, fields] = await connection.query(customerSchema);
    
}


