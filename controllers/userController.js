//Imports
const { User, Thought } = require("../models/index");

//Get all users
module.exports = {
  async getUsers(req, res) {
    try {
      const user = await User
      
        .find()
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single user
  async getUser(req, res) {
    try {
      const user = await User
      
        .findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Create user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
       res.json(user);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({
        message: "User and associated thoughts and reactions deleted!",
      })
    } catch (err) {
        res.status(500).json(err);
    }
  },

  // Add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "Check user and friend ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};




