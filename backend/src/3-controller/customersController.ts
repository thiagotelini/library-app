import { Request, Response } from "express";

import { ListCustomersUseCase } from "../2-business/useCases/customers/listCustomersUseCase";
import { GetCustomerByCpfUseCase } from "../2-business/useCases/customers/getCustomerByCpfUseCase";
import { CreateCustomerUseCase } from "../2-business/useCases/customers/createCustomerUseCase";
import { CreateCustomerDto } from "../2-business/interfaces/customers/createCustomerDto";
import { UpdateCustomerUseCase } from "../2-business/useCases/customers/updateCustomerUseCase";
import { UpdateCustomerDto } from "../2-business/interfaces/customers/updateCustomerDto";
import { DeleteCustomerUseCase } from "../2-business/useCases/customers/deleteCustomerUseCase";

class CustomersController {
  async listCustomers (req: Request, res: Response) {
    const listCustomersUseCase = new ListCustomersUseCase();

    return res.status(200).json({
      data: await listCustomersUseCase.run()
    });
  }

  async getCustomerByCpf (req: Request, res: Response) {
    const getCustomerByCpfUseCase = new GetCustomerByCpfUseCase();
    const customerCpf = req.params.cpf as string;

    console.log("customerCpf", customerCpf);
    console.log("typeof customerCpf", typeof customerCpf);

    return res.status(200).json({
      data: await getCustomerByCpfUseCase.run(customerCpf)
    });
  }

  async createCustomer (req: Request, res: Response) {
    const createCustomerUseCase = new CreateCustomerUseCase();
    const customerData = req.body as CreateCustomerDto;

    await createCustomerUseCase.run(customerData);
    return res.status(201).json({
      message: "Customer created successfully"
    });
  }

  async updateCustomer (req: Request, res: Response) {
    const updateCustomerUseCase = new UpdateCustomerUseCase();
    const customerCpf = req.params.cpf as string;
    const customerData = req.body as UpdateCustomerDto;

    await updateCustomerUseCase.run(customerCpf, customerData);
    return res.status(200).json({
      message: "Customer updated successfully"
    });
  }

  async deleteCustomer (req: Request, res: Response) {
    const deleteCustomerUseCase = new DeleteCustomerUseCase();
    const customerCpf = req.params.cpf as string;

    await deleteCustomerUseCase.run(customerCpf);
    return res.status(200).json({
      message: "Customer deleted successfully"
    });
  }
}

export const customersController = new CustomersController();