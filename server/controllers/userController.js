const { userModel } = require('../postgres/postgres');

module.exports = {

    getAllEmp: async (req, res) => {
        try {
            const User = userModel();
            if (!User) {
                return res.status(500).json({ error: 'User model is not initialized' });
            }

            const users = await User.findAll();
            if (users.length === 0) {
                return res.status(200).json({ message: 'User not found' });
            }
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    addEmp: async (req, res) => {
        const { name, email, designation, empId } = req.body;
        try {
            const User = userModel();
            if (!User) {
                return res.status(500).json({ error: 'User model is not initialized' });
            }

            console.log('empId:', empId); // Debugging

            if (!empId) {
                return res.status(400).json({ message: 'empId is required' });
            }

            const emp = await User.findOne({ where: { empId } });
            if (!emp) {
                await User.create(req.body);
                return res.status(201).json({ message: 'Employee added successfully' });
            } else {
                return res.status(400).json({ message: 'Employee already exists' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    updateEmp: async (req, res) => {
        const empId = req.params.empId;
        try {
            const User = userModel();
            if (!User) {
                return res.status(500).json({ error: 'User model is not initialized' });
            }

            console.log('empId:', empId); // Debugging

            if (!empId) {
                return res.status(400).json({ message: 'empId is required' });
            }

            const [updated] = await User.update(req.body, { where: { empId } });
            if (updated === 0) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            return res.status(200).json({ message: 'Employee updated successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    },

    deleteEmp: async (req, res) => {
        const empId = req.params.empId;
        try {
            const User = userModel();
            if (!User) {
                return res.status(500).json({ error: 'User model is not initialized' });
            }

            console.log('empId:', empId); // Debugging

            if (!empId) {
                return res.status(400).json({ message: 'empId is required' });
            }

            const deleted = await User.destroy({ where: { empId } });
            if (!deleted) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            return res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
};
