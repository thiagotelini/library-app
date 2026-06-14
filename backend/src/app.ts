import express from "express";
import cors from "cors";

import booksRoutes from "./4-framework/routes/booksRoutes";
import customerRoutes from "./4-framework/routes/customersRoutes";

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/books", booksRoutes);
app.use("/customers", customerRoutes);

export default app;