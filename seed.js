require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Pet = require('./models/Pet');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pawpal');
  await User.deleteMany({});
  await Pet.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('admin123', salt);

  const admin = await User.create({ name: 'Admin', email: 'sheltonarun@karunya.edu.in', password: adminPass, role: 'admin' });

  await Pet.insertMany([
    { name: 'Buddy', type: 'Dog', breed: 'Labrador', age: 3, health: 'Good', addedBy: admin._id },
    { name: 'Mittens', type: 'Cat', breed: 'Siamese', age: 2, health: 'Good', addedBy: admin._id },
    { name: 'Nibbles', type: 'Rabbit', breed: 'Dutch', age: 1, health: 'Good', addedBy: admin._id }
  ]);

  console.log('Seed done. Admin: sheltonarun@karunya.edu.in / admin123');
  mongoose.disconnect();
}

seed();
