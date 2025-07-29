import { Router } from "express";
const router = Router();

// Obtener todas las categorías
router.get("/", (req, res) => {});

// Crear una categoría
router.post("/", (req, res) => {});

// Editar una categoría
router.put("/:idCategory", (req, res) => {});

// Eliminar una categoría
router.delete("/:idCategory", (req, res) => {});

export default router;
