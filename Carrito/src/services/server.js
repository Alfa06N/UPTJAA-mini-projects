import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import productsRoutes from "./routes/products.js";
// import categoriesRoutes from "./routes/categories.js";
// import usersRoutes from "./routes/users.js";
// import cartRoutes from "./routes/cart.js";

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use("/api/products", productsRoutes);
// app.use("/api/categories", categoriesRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("¡El servidor del carrito de compras está funcionando!");
});

app.listen(3000, () => {
  console.log(`Servidor Express escuchando en el puerto ${3000}`);
  console.log(`Puedes acceder a la API en: http://localhost:${3000}`);
});
