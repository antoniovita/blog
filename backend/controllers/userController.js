require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, password: hashedPassword });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const userResponse = { id: user.id, email: user.email, username: user.username, token };
        res.status(201).json(userResponse);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const loginUsername = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });
        
        console.log("Usuário encontrado:", user.id);
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token,
          username: user.username,
          id: user.id });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const loginEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

        console.log("Usuário encontrado:", user.id);
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token,
          username: user.username,
          id: user.id
         });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" })
  }
};

const getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "username", "email"]
      });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor" });
    }
};

const getUserByToken = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar o usuário.' });
  }
};


module.exports = { createUser, loginUsername, loginEmail, getAllUsers, getUserById, getUserByToken };
