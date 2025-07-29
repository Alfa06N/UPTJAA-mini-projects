import { Router } from "express";
import {
  createUser,
  updateUser,
  loginUser,
  recoverPassword,
} from "../controllers/userControllers.js";


const router = Router();
// Crear un nuevo usuario
router.post("/", createUser);

// Editar datos de usuario
router.put("/:idUser", updateUser);

// Iniciar sesión
router.post("/login", loginUser);

// Recuperar contraseña
router.post("/recover-password", recoverPassword);

export default router;
