import { BookEntity } from "../../1-models/book";

export interface IBookService {
    listBooks (): Promise<BookEntity[]>;
    getBookById (bookId: string): Promise<BookEntity>;
    createBook (bookData: BookEntity): Promise<void>;
    updateBook (bookId: string, bookData: Partial<BookEntity>): Promise<void>;
    deleteBook (bookId: string): Promise<void>;
}