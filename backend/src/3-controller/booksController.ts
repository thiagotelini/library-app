import { Request, Response } from "express";

import { ListBooksUseCase } from "../2-business/useCases/books/listBooksUseCase";
import { GetBookByIdUseCase } from "../2-business/useCases/books/getBookByIdUseCase";
import { CreateBookUseCase } from "../2-business/useCases/books/createBookUseCase";
import { CreateBookDto } from "../2-business/interfaces/books/createBookDto";
import { UpdateBookUseCase } from "../2-business/useCases/books/updateBookUseCase";
import { UpdateBookDto } from "../2-business/interfaces/books/updateBookDto";
import { DeleteBookUseCase } from "../2-business/useCases/books/deleteBookUseCase";

class BooksController {
  async listBooks (req: Request, res: Response) {
    const listBooksUseCase = new ListBooksUseCase();
    
    return res.status(200).json({
      data: await listBooksUseCase.run()
    });
  }

  async getBookById (req: Request, res: Response) {
    const getBookByIdUsecase = new GetBookByIdUseCase();
    const bookId = req.params.id as string;

    return res.status(200).json({
      data: await getBookByIdUsecase.run(bookId)
    });
  }

  async createBook (req: Request, res: Response) {
    const createBookUseCase = new CreateBookUseCase();
    const bookData = req.body as CreateBookDto;

    await createBookUseCase.run(bookData);
    return res.status(201).json({
      message: "Book created successfully"
    });
  }

  async updateBook (req: Request, res: Response) {
    const updateBookUseCase = new UpdateBookUseCase();
    const bookId = req.params.id as string;
    const bookData = req.body as UpdateBookDto;

    await updateBookUseCase.run(bookId, bookData);
    return res.status(200).json({
      message: "Book updated successfully"
    });
  }

  async deleteBook (req: Request, res: Response) {
    const deleteBookUseCase = new DeleteBookUseCase();
    const bookId = req.params.id as string;

    await deleteBookUseCase.run(bookId);
    return res.status(200).json({
      message: "Book deleted successfully"
    });
  }
}

export const booksController = new BooksController();