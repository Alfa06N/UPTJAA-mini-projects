import db from "../services/db.js";

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Categoría creada exitosamente." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  const { idCategory } = req.params;
  const { name } = req.body;
  try {
    await db.query("UPDATE categories SET name = ? WHERE idCategory = ?", [name, idCategory]);
    res.json({ message: "Categoría actualizada correctamente." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  const { idCategory } = req.params;
  try {
    await db.query("DELETE FROM categories WHERE idCategory = ?", [idCategory]);
    res.json({ message: "Categoría eliminada exitosamente." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};