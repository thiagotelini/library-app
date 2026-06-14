import { CustomerAddress } from "../../../1-models/customer";

export interface UpdateCustomerDto {
  name: string;
  phone: string;
  address: CustomerAddress;
}