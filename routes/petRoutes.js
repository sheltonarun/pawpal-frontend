const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public: list pets
router.get('/', async (req,res) => {
  try {
    const pets = await Pet.find().populate('addedBy','name email').populate('adopter','name email');
    res.json(pets);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Admin: add pet
router.post('/', verifyToken, isAdmin, async (req,res) => {
  try {
    const pet = new Pet({ ...req.body, addedBy: req.user.id });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) { res.status(400).json({ message: 'Invalid data' }); }
});

// Admin: update pet
router.put('/:id', verifyToken, isAdmin, async (req,res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) { res.status(400).json({ message: 'Invalid data' }); }
});

// Admin: delete pet
router.delete('/:id', verifyToken, isAdmin, async (req,res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// User: adopt a pet (must be authenticated user)
router.post('/:id/adopt', verifyToken, async (req,res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    if (pet.adopted) return res.status(400).json({ message: 'Already adopted' });
    pet.adopted = true;
    pet.adopter = req.user.id;
    await pet.save();
    res.json({ message: 'Adoption successful', pet });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
