import { BookService } from "../../../4-framework/services/bookService";

export class GetBookByIdUseCase {
  private bookService = new BookService()

  async run (bookId: string) {
    return this.bookService.getBookById(bookId);
  }
}