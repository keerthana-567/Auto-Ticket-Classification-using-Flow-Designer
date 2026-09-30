const Material = require('../models/Material');
const { classifyTicket } = require('../utils/gemini');

exports.createTicket = async (req, res) => {
  try {
    const { u_string_4, u_string_5 } = req.body;
    
    // Auto ticket number generation (matching INC prefix from XML)
    const count = await Material.countDocuments();
    const u_number = `INC${1000 + count + 1}`;

    // AI Classification
    const classification = await classifyTicket(u_string_4, u_string_5);

    const ticket = await Material.create({
      u_number,
      u_caller: req.user.id,
      u_string_4,
      u_string_5,
      u_choice_2: classification.category,
      u_choice_3: classification.subcategory,
      u_reference_7: classification.assignedGroup,
      attachmentPath: req.file ? req.file.path : ''
    });

    res.status(201).json({ message: 'Ticket created and auto-classified', ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Material.find().populate('u_caller', 'name email');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};