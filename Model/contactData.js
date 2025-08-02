import mongoose from "mongoose";

const contactDataSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: function (v) {
        // Name should be at least 3 characters long
        return v.length >= 3;
      },
      message: () => "Name must be at least 3 characters long",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        // Email regex pattern for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v);
      },
      message: () => "Please enter a valid email address",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    validate: {
      validator: function (v) {
        // Phone number should be exactly 10 digits
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(v);
      },
      message: () => "Phone number must be exactly 10 digits",
    },
  },
  message: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Specify the collection name explicitly
const contactData = mongoose.model(
  "contacts",
  contactDataSchema,
  "contact-details"
);

export default contactData;
