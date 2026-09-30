const Material = require('../models/Material');
const User = require('../models/User');

exports.getAdminStats = async (req, res) => {
  try {
    const totalTickets = await Material.countDocuments();
    const categoryStats = await Material.aggregate([
      { $group: { _id: '$u_choice_2', count: { $sum: 1 } } }
    ]);
    const totalUsers = await User.countDocuments();

    res.json({ totalTickets, totalUsers, categoryStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicketClassification = async (req, res) => {
  try {
    const { id } = req.params;
    const { u_choice_2, u_choice_3, u_reference_7, u_choice_6 } = req.body;

    const updatedTicket = await Material.findByIdAndUpdate(
      id,
      { u_choice_2, u_choice_3, u_reference_7, u_choice_6 },
      { new: true }
    );

    res.json({ message: 'Ticket updated successfully', updatedTicket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};