const mongoose = require("mongoose");

// define the structure to add in mongoDB
const bugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
});

const Bugs = mongoose.model("bugs", bugSchema);

module.exports = Bugs;
