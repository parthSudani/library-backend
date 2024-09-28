const User = require("../models/User");
const { createQuery, findOneQuery } = require("../services/query.service");

// Controller to create a new user
exports.createUser = async (req, res) => {
  const { email, phone } = req.body;

  try {
    if (!email && !phone) {
      res.status(400).send({ message: "Email or phone is required!" });
    }

    if (email) {
      const findEmail = await findOneQuery(User, { email: email });
      if (!findEmail) {
        res.status(400).send({ message: "Email already exist!" });
      }
    }

    const user = {
      email: req.body.email,
      name: req.body.firstName,
      role: req.body.role,
    };
    const token = jwt.sign(user, "your_secret_key", { expiresIn: "1h" });

    const createUser = await createQuery(User, {
      ...req.body,
      ...{ token: token },
    });

    res
      .status(201)
      .send({ message: "User created successfully", user: createUser });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
};

// Controller to get a user's details by ID
exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error });
  }
};

// Controller to update user details by ID
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phone, salary, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone, salary, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error });
  }
};

// Controller to delete a user by ID
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
};
