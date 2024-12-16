const bcrypt = require('bcryptjs');
const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const query = require('../model/pool');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await query('SELECT id FROM users WHERE email = ? and deletedAt is null', [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await query(
      'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 2] // Default role_id = 2 (user)
    );

    // Generate a JWT token
    const token = jwt.sign({ userId: result.insertId, role_id: 2 }, process.env.JWT_SECRET);

    // Send the token back to the frontend
    res.status(201).json({
      message: 'Registrasi Berhasil',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada sistem!' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const users = await query('SELECT * FROM users WHERE email = ? and deletedAt is null', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Email atau password salah!' });
    }

    const user = users[0];

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, role_id: user.role_id }, process.env.JWT_SECRET);

    // Send the token back to the client
    res.status(200).json({
      message: 'Login berhasil!',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada sistem!' });
  }
};


module.exports = { signup, login };
