import { Router } from "express";

const router = Router();


// Obtener todos los productos
router.get("/", (req, res) => {});

// Obtener un producto específico
router.get("/:idProduct", (req, res) => {});

// Crear un producto
router.post("/", (req, res) => {});

// Editar un producto
router.put("/:idProduct", (req, res) => {});

// Eliminar un producto
router.delete("/:idProduct", (req, res) => {});


export default router;