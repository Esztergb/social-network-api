//Imports
const { Schema, model } = require("mongoose");
// const reactionSchema = require("./Reaction");

const reactionSchema = new Schema(
  {
    // reactionId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
  // {
  //   toJSON: {
  //     getters: true, //Getters allow you to define a function that transforms the raw value of a schema field before it is returned from the database. This can be useful for formatting, parsing, or encrypting data stored in MongoDB.
  //   },
  // }
);

//Thought Schema based on challange README instructions

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true,
    },
    id: false,
  }
);

// Increases reaction count in Thought model object when reactions are added to a thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Creates Thought model with thoughtSchema
const Thought = model("thought", thoughtSchema);

// Exports
module.exports = Thought;