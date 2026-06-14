export interface CustomerAddress {
  neighborhood: string;
  street: string;
  number: string;
}

export interface CustomerEntity {
  cpf: string;
  name: string;
  phone: string;
  address: CustomerAddress;
}