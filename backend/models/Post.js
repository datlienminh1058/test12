const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: String,

  detail: String,

  carName: String,

  image: {
    public_id: String,
    url: String,
  },
  timeSlots: {
    to: {type: String},
    from: {type: String},
  },
  money: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);