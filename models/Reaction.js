// Imports
// const { Schema, Types } = require("mongoose");

// This will not be a model, but rather will be used as the reaction field's sub-document schema in the Thought model
// const reactionSchema = new Schema(
//   {
//     // reactionId: {
//     //   type: Schema.Types.ObjectId,
//     //   default: () => new Types.ObjectId(),
//     // },
//     reactionBody: {
//       type: String,
//       required: true,
//       maxlength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   // {
//   //   toJSON: {
//   //     getters: true, //Getters allow you to define a function that transforms the raw value of a schema field before it is returned from the database. This can be useful for formatting, parsing, or encrypting data stored in MongoDB.
//   //   },
//   // }
// );

// // Exports
// module.exports = reactionSchema;