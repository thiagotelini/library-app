import { CustomerService } from "../../../4-framework/services/customerService";
import { CreateCustomerDto } from "../../interfaces/customers/createCustomerDto";

export class CreateCustomerUseCase {
  private customerService = new CustomerService()

  async run (customerData: CreateCustomerDto) {
    await this.customerService.createCustomer(customerData);
  }
}