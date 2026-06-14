import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { IBookService } from "../../2-business/services/iBookService";
import { BookEntity } from "../../1-models/book";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export class BookService implements IBookService {
  TABLE_NAME = "Livros";

  async listBooks(): Promise<BookEntity[]> {
    const response = await dynamo.send(
      new ScanCommand({
        TableName: this.TABLE_NAME
      })
    );

    return (response.Items ?? []) as BookEntity[];
  }

  async getBookById(bookId: string): Promise<BookEntity> {
    const response = await dynamo.send(
      new GetCommand({
        TableName: this.TABLE_NAME,
        Key: {
          bookId
        }
      })
    );

    return response.Item as BookEntity ?? null;
  }

  async createBook(bookData: BookEntity): Promise<void> {
    await dynamo.send(
      new PutCommand({
        TableName: this.TABLE_NAME,
        Item: bookData
      })
    );
  }

  async updateBook(
    bookId: string,
    bookData: Partial<BookEntity>
  ): Promise<void> {

    const attributes = Object.keys(bookData)
      .filter(
        key => bookData[key as keyof BookEntity] !== undefined
      );

    const updateExpression =
      "SET " +
      attributes
        .map((attr, i) => `#attr${i} = :value${i}`)
        .join(", ");

    const expressionAttributeNames = Object.fromEntries(
      attributes.map((attr, i) => [
        `#attr${i}`,
        attr
      ])
    );

    const expressionAttributeValues = Object.fromEntries(
      attributes.map((attr, i) => [
        `:value${i}`,
        bookData[attr as keyof BookEntity]
      ])
    );

    await dynamo.send(
      new UpdateCommand({
        TableName: this.TABLE_NAME,
        Key: {
          bookId
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      })
    );
  }

  async deleteBook(bookId: string): Promise<void> {
    await dynamo.send(
      new DeleteCommand({
        TableName: this.TABLE_NAME,
        Key: {
          bookId
        }
      })
    );
  }
}