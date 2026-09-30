const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  sysUserId: { type: String, default: '' } // Reference for ServiceNow sys_user sync
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);