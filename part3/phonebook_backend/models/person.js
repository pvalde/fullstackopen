const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to DB");
mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "The name must be at least 3 characters long"],
    required: [true, "Name required."],
  },
  number: {
    type: String,
    minLength: [
      11,
      "The number must be at least 8 digit and must have a valid prefix",
    ], // 8 digits + 'dd-' (the first three)
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{8}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, "The phone number is required."],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });
});

module.exports = mongoose.model("Person", personSchema);
