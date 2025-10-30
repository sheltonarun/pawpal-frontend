const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Admin: list users
router.get('/', verifyToken, isAdmin, async (req,res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Admin: add user (create with role)
router.post('/', verifyToken, isAdmin, async (req,res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash, role: role || 'user' });
    await user.save();
    res.status(201).json({ message: 'User added' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Admin: update user details (role/name/email)
router.put('/:id', verifyToken, isAdmin, async (req,res) => {
  const updates = (({ name, email, role }) => ({ name, email, role }))(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { res.status(400).json({ message: 'Invalid data' }); }
});

// Admin: delete user
router.delete('/:id', verifyToken, isAdmin, async (req,res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
