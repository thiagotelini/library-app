import express from "express";
import booksRoutes from "./4-framework/routes/booksRoutes";
import customerRoutes from "./4-framework/routes/customersRoutes";

const app = express();

app.use(express.json());

app.use("/books", booksRoutes);
app.use("/customers", customerRoutes);

export default app;