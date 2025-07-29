import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "../routes/productRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("¡El servidor del carrito de compras está funcionando!");
});

app.listen(3000, () => {
  console.log(`Servidor Express escuchando en el puerto ${3000}`);
  console.log(`Puedes acceder a la API en: http://localhost:${3000}`);
});
