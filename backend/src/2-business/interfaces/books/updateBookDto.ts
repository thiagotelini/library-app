import { BookStatus } from "../../../1-models/book";

export interface UpdateBookDto {
    title: string;
    author: string;
    publisher: string;
    tags: string[];
    shelf: string;
    status: BookStatus;
    returnDate?: string;
}