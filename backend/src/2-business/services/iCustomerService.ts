import { CustomerEntity } from "../../1-models/customer";

export interface ICustomerService {
    listCustomers (): Promise<CustomerEntity[]>;
    getCustomerByCpf (customerCpf: string): Promise<CustomerEntity>;
    createCustomer (customerData: CustomerEntity): Promise<void>;
    updateCustomer (customerCpf: string, customerData: Partial<CustomerEntity>): Promise<void>;
    deleteCustomer (customerCpf: string): Promise<void>;
}