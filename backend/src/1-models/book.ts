export enum BookAvailability {
  AVAILABLE = 'available',
  LOANED = 'loaned'
}

export interface BookStatus {
  availability: BookAvailability;
  customerCpf?: string;
}

export interface BookEntity {
  bookId: string;
  title: string;
  author: string;
  publisher: string;
  tags: string[];
  shelf: string;
  status: BookStatus;
  returnDate?: string;
}