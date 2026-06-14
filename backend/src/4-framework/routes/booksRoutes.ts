import { Router } from "express";
import { booksController } from "../../3-controller/booksController";

const router = Router();

router.get("/", booksController.listBooks);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.createBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

export default router;