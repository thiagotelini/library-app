import { CustomerService } from "../../../4-framework/services/customerService";

export class ListCustomersUseCase {
  private customerService = new CustomerService()

  async run () {
    return this.customerService.listCustomers();
  }
}