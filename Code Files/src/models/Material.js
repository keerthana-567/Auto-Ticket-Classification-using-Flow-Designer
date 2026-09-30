const mongoose = require('mongoose');

// Aligned with ServiceNow table schema u_incident_workflow
const materialSchema = new mongoose.Schema({
  u_number: { type: String, required: true, unique: true }, // INC number
  u_caller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  u_choice_2: { type: String, enum: ['network', 'hardware', 'access', 'performance'] }, // Category
  u_choice_3: { type: String }, // Subcategory
  u_string_4: { type: String, required: true }, // Short Description
  u_string_5: { type: String }, // Description
  u_choice_6: { type: String, default: 'New' }, // State
  u_reference_7: { type: String }, // Assigned Group
  u_reference_8: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assigned to
  attachmentPath: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);