import db from "../services/db.js"; // Conexión a la base de datos

export const createUser = async (req, res) => {
  const { username, email, password_hash } = req.body;
  try {
    await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, password_hash]
    );
    res.status(201).json({ message: "Usuario creado exitosamente." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { idUser } = req.params;
  const { username, email } = req.body;
  try {
    await db.query(
      "UPDATE users SET username = ?, email = ? WHERE idUser = ?",
      [username, email, idUser]
    );
    res.json({ message: "Usuario actualizado correctamente." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password_hash } = req.body;
  try {
    const [result] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password_hash = ?",
      [username, password_hash]
    );

    if (result.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    res.json({ message: "Inicio de sesión exitoso.", user: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario válido. Proceder con recuperación." });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};