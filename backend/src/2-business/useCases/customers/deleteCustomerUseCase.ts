import { CustomerService } from "../../../4-framework/services/customerService";

export class DeleteCustomerUseCase {
  private customerService = new CustomerService()

  async run (customerCpf: string) {
    return this.customerService.deleteCustomer(customerCpf);
  }
}