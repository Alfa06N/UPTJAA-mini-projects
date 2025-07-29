import { Router } from "express";
const router = Router();

// Obtener los items del carrito de un usuario
router.get("/:idUser", (req, res) => {});

// Agregar producto al carrito
router.post("/:idUser", (req, res) => {});

// Actualizar cantidad de un producto
router.put("/:idUser/:idProduct", (req, res) => {});

// Eliminar un producto del carrito
router.delete("/:idUser/:idProduct", (req, res) => {});

export default router;
