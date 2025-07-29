import { Router } from "express";

const router = Router();

// Crear un nuevo usuario
router.post("/", (req, res) => {});

// Editar datos de usuario
router.put("/:idUser", (req, res) => {});

// Iniciar sesión
router.post("/login", (req, res) => {});

// Recuperar contraseña
router.post("/recover-password", (req, res) => {});

export default router;
