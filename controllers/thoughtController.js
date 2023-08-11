//Imports
const { User, Thought } = require("../models/index");

//Get all thoughts
module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  //Get single though
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  //Create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
console.log(thought)
      const user = await User.findByIdAndUpdate(
         req.body.userID, //{ _id: req.body.thoughtId }, whats the difference between this and 
        // { _id: req.params.thoughtId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      res.json({ thought, user });
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
       res.status(500).json(err);
    }
  },

  // Delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId,}
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        message: "Thought & associated reactions successfully deleted",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Check thought and reaction ID" });
      }

      res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },
};
