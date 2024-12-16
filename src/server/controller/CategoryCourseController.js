const bcrypt = require('bcryptjs');
const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const CategoryCourse = require('../model/CategoryCourse');
const query = require('../model/pool');

const list = async (req, res) => {
  try {
    const categories = await query('SELECT * FROM category_courses where deletedAt is null');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const add = async (req, res) => {
  try {
    const { name, description } = req.body; // Replace with your actual fields
    const result = await query(
      'INSERT INTO category_courses (name, description) VALUES (?, ?)',
      [name, description]
    );

    res.status(201).json({
      message: 'Kategori berhasil disimpan!',
      item: { id: result.insertId, name, description },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEdit = async (req, res) => {
  try {
    const category = await query('SELECT * FROM category_courses WHERE id = ? and deletedAt is null', [req.params.id]);
    if (category.length === 0) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan!' });
    }
    res.status(200).json(category[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postEdit = async (req, res) => {
  try {
    const { name, description } = req.body; // Replace with your actual fields
    const { id } = req.params;

    const existingCategory = await query('SELECT * FROM category_courses WHERE id = ? and deletedAt is null', [id]);
    if (existingCategory.length === 0) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan!' });
    }

    await query(
      'UPDATE category_courses SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );

    res.status(201).json({
      message: 'Kategori berhasil disimpan!',
      category: { id, name, description },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await query('SELECT * FROM category_courses WHERE id = ? and deletedAt is null', [id]);
    if (existingCategory.length === 0) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan!' });
    }

    await query(`UPDATE category_courses
    SET deletedAt = NOW()
    WHERE id = ?`, [id]);
    res.status(201).json({ message: 'Kategori berhasil dihapus!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { list, add, getEdit, postEdit, postDelete };
