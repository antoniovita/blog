const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashedPassoword = await bcrypt.hash(password, 10);
        const user = await User.create({email, username, password: hashedPassoword});
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

const loginUsername = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });
  
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


 const loginEmail = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });
  
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  module.exports = { createUser, loginUsername, loginEmail };