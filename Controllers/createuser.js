const prisma = require('../DB/db.config');

const createuser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newuser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(200).json({
      message: 'User created successfully',
      user: newuser,
    });
  } catch (error) {
    console.log('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update user
const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id), // Convert string to number
      },
      data: {
        name,
        email,
        password,
      },
    });
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user
const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.log('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Fix: Destructure `id` properly
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Get all users
const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Export all functions as properties of an object
module.exports = {
  createuser,
  updateuser,
  deleteuser,
  getUserById,
  getUser,
};
