import { BookService } from "../../../4-framework/services/bookService";

export class ListBooksUseCase {
  private bookService = new BookService()

  async run () {
    return this.bookService.listBooks();
  }
}