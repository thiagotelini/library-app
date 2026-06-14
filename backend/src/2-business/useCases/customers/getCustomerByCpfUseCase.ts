import { CustomerService } from "../../../4-framework/services/customerService";

export class GetCustomerByCpfUseCase {
  private customerService = new CustomerService()

  async run (customerCpf: string) {
    return this.customerService.getCustomerByCpf(customerCpf);
  }
}