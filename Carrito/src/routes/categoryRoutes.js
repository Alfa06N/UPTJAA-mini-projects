import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriaControllers.js";
const router = Router();

// Obtener todas las categorías
router.get("/" , getCategories);

// Crear una categoría
router.post("/", createCategory);

// Editar una categoría
router.put("/:idCategory", updateCategory);

// Eliminar una categoría
router.delete("/:idCategory", deleteCategory);

export default router;
