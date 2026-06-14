import { Router } from "express";
import { customersController } from "../../3-controller/customersController";

const router = Router();

router.get("/", customersController.listCustomers);
router.get("/:cpf", customersController.getCustomerByCpf);
router.post("/", customersController.createCustomer);
router.put("/:cpf", customersController.updateCustomer);
router.delete("/:cpf", customersController.deleteCustomer);

export default router;