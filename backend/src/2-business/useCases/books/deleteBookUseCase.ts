import { BookService } from "../../../4-framework/services/bookService";

export class DeleteBookUseCase {
  private bookService = new BookService()

  async run (bookId: string) {    
    return this.bookService.deleteBook(bookId);
  }
}