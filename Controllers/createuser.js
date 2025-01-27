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

const batchadduser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newuser = await prisma.user.createMany({
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
    res.status(500).json({ error: 'Failed to create batch user' });
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

// Route for search
const search = async (req, res) => {
  const { query } = req.query; // e.g., ?query=searchTerm
  try {
      const results = await prisma.yourModel.findMany({
          where: {
              OR: [
                  { name: { contains: query, mode: 'insensitive' } }, // Adjust field1
                  { email: { contains: query, mode: 'insensitive' } }, // Adjust field2
              ],
          },
      });
      res.status(200).json({ success: true, data: results });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error searching records' });
  }
};

// Route for pagination
const pagination =  async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Defaults: page 1, 10 items per page
  const skip = (page - 1) * limit;

  try {
      const results = await prisma.yourModel.findMany({
          skip: parseInt(skip),
          take: parseInt(limit),
      });
      const total = await prisma.yourModel.count(); // Total records
      res.status(200).json({
          success: true,
          data: results,
          meta: {
              total,
              page: parseInt(page),
              limit: parseInt(limit),
              totalPages: Math.ceil(total / limit),
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error fetching records' });
  }
};

// Route for filter
const filter= async (req, res) => {
  const { name,startDate, endDate } = req.query; // e.g., ?field1=value1&field2=value2
  try {
      const results = await prisma.yourModel.findMany({
          where: {
            AND: [
              name ? { name: { contains: name, mode: 'insensitive' } } : {},
              startDate && endDate
                  ? { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
                  : {},
          ],
          },
      });
      res.status(200).json({ success: true, data: results });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error filtering records' });
  }
};


// Export all functions as properties of an object
module.exports = {
  createuser,
  updateuser,
  deleteuser,
  getUserById,
  getUser,
  batchadduser,
  filter,
  pagination,
  search
};
