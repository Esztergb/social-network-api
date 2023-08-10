// Imports
const { Schema, model } = require("mongoose");

// User Schema based on README instructions

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that increases friend count in User model object when friends are added by a user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our user model
const Post = model('user', userSchema);

module.exports = User;