import { createCustomerTable } from "./createCustomerTable";
import { createAccountTable } from "./createAccountTable";

export async function initSchemas() {
    await createCustomerTable();
    await createAccountTable();

}