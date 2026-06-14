import { BookAvailability } from "../../../1-models/book";
import { BookService } from "../../../4-framework/services/bookService";
import { CreateBookDto } from "../../interfaces/books/createBookDto";

export class CreateBookUseCase {
  private bookService = new BookService()

  async run (bookData: CreateBookDto) {    
    return this.bookService.createBook({
        bookId: crypto.randomUUID(),
        title: bookData.title,
        author: bookData.author,
        publisher: bookData.publisher,
        tags: bookData.tags,
        shelf: bookData.shelf,
        status: {
            availability: BookAvailability.AVAILABLE
        }
    });
  }
}