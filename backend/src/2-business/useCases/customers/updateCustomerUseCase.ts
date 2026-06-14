import { CustomerService } from "../../../4-framework/services/customerService";
import { UpdateCustomerDto } from "../../interfaces/customers/updateCustomerDto";

export class UpdateCustomerUseCase {
  private customerService = new CustomerService()

  async run (customerCpf: string, customerData: UpdateCustomerDto) {
    return this.customerService.updateCustomer(customerCpf, customerData);
  }
}