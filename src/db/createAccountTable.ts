import { dbConnection} from "./dbConnection";
import { accountSchema } from "../schema/accountSchema";

export async function createAccountTable(){
    let connection = await dbConnection();
    const [rows, fields] = await connection.query(accountSchema);
    
}


