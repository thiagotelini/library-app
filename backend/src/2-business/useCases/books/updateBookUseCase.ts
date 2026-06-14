import { BookService } from "../../../4-framework/services/bookService";
import { UpdateBookDto } from "../../interfaces/books/updateBookDto";

export class UpdateBookUseCase {
  private bookService = new BookService()

  async run (bookId: string, bookData: UpdateBookDto) {    
    return this.bookService.updateBook(bookId, {
      title: bookData.title,
      author: bookData.author,
      publisher: bookData.publisher,
      tags: bookData.tags,
      shelf: bookData.shelf,
      status: bookData.status,
      returnDate: bookData.returnDate,
    });
  }
}