import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { ICustomerService } from "../../2-business/services/iCustomerService";
import { CustomerEntity } from "../../1-models/customer";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export class CustomerService implements ICustomerService {
  TABLE_NAME = "Clientes";

  async listCustomers(): Promise<CustomerEntity[]> {
    const response = await dynamo.send(
      new ScanCommand({
        TableName: this.TABLE_NAME
      })
    );

    return (response.Items ?? []) as CustomerEntity[];
  }

  async getCustomerByCpf(customerCpf: string): Promise<CustomerEntity> {
    const response = await dynamo.send(
      new GetCommand({
        TableName: this.TABLE_NAME,
        Key: {
          cpf: customerCpf
        }
      })
    );

    return response.Item as CustomerEntity ?? null;
  }

  async createCustomer(customerData: CustomerEntity): Promise<void> {
    await dynamo.send(
      new PutCommand({
        TableName: this.TABLE_NAME,
        Item: customerData
      })
    );
  }

  async updateCustomer(customerCpf: string, customerData: Partial<CustomerEntity>): Promise<void> {
    const attributes = Object.keys(customerData);
    
    const updateExpression =
      "SET " +
      attributes
        .map((attr, i) => `#attr${i} = :value${i}`)
        .join(", ");

    const expressionAttributeNames = Object.fromEntries(
      attributes.map((attr, i) => [`#attr${i}`, attr])
    );

    const expressionAttributeValues = Object.fromEntries(
      attributes.map((attr, i) => [
        `:value${i}`,
        customerData[attr as keyof CustomerEntity]
      ])
    );

    await dynamo.send(
      new UpdateCommand({
        TableName: this.TABLE_NAME,
        Key: {
          cpf: customerCpf
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      })
    );
  }

  async deleteCustomer(customerCpf: string): Promise<void> {
    await dynamo.send(
      new DeleteCommand({
        TableName: this.TABLE_NAME,
        Key: {
          cpf: customerCpf
        }
      })
    );
  }
}