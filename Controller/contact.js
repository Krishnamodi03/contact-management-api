import contactData from "../Model/contactData.js";

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactData.find();
    res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve contacts",
      errors: [
        {
          field: "general",
          message: error.message,
          value: null,
        },
      ],
    });
  }
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await contactData.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
        errors: [
          {
            field: "id",
            message: "Contact with the provided ID does not exist",
            value: id,
          },
        ],
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact retrieved successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve contact",
      errors: [
        {
          field: "general",
          message: error.message,
          value: null,
        },
      ],
    });
  }
};

const createContact = async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;
  const newContact = new contactData({
    name,
    email,
    phoneNumber,
    message,
  });
  try {
    await newContact.save();
    res.status(201).json({
      success: true,
      message: "Contact data saved successfully",
      data: newContact,
    });
  } catch (error) {
    // Standardized error response format
    const errorResponse = {
      success: false,
      message: "Operation failed",
      errors: [],
    };

    if (error?.name === "ValidationError") {
      errorResponse.message = "Validation failed";
      errorResponse.errors = Object.values(error?.errors).map((err) => ({
        field: err.path,
        message: err.message,
        value: err.value,
      }));
      return res.status(400).json(errorResponse);
    }

    // Handle duplicate key error (E11000)
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];

      let errorMessage = "";
      if (field === "email") {
        errorMessage = `Email already exists.`;
      } else if (field === "phoneNumber") {
        errorMessage = `Phone number already exists.`;
      } else {
        errorMessage = `${field} already exists.`;
      }

      errorResponse.message = "Duplicate entry";
      errorResponse.errors = [
        {
          field: field,
          message: errorMessage,
          value: value,
        },
      ];

      return res.status(409).json(errorResponse);
    }

    // Handle other errors
    errorResponse.message = "Internal server error";
    errorResponse.errors = [
      {
        field: "general",
        message: error?.message || "An unexpected error occurred",
        value: null,
      },
    ];

    res.status(500).json(errorResponse);
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, message } = req.body;
  try {
    const updatedContact = await contactData.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phoneNumber,
        message,
        updatedAt: Date.now(),
      },
      // new: true is used to return the updated document
      // runValidators: true is used to run the validators again
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
        errors: [
          {
            field: "id",
            message: "Contact with the provided ID does not exist",
            value: id,
          },
        ],
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact data updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    // Standardized error response format
    const errorResponse = {
      success: false,
      message: "Operation failed",
      errors: [],
    };

    if (error?.name === "ValidationError") {
      errorResponse.message = "Validation failed";
      errorResponse.errors = Object.values(error?.errors).map((err) => ({
        field: err.path,
        message: err.message,
        value: err.value,
      }));
      return res.status(400).json(errorResponse);
    }

    // Handle duplicate key error (E11000)
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];

      let errorMessage = "";
      if (field === "email") {
        errorMessage = `Email already exists.`;
      } else if (field === "phoneNumber") {
        errorMessage = `Phone number already exists.`;
      } else {
        errorMessage = `${field} already exists.`;
      }

      errorResponse.message = "Duplicate entry";
      errorResponse.errors = [
        {
          field: field,
          message: errorMessage,
          value: value,
        },
      ];

      return res.status(409).json(errorResponse);
    }

    // Handle other errors
    errorResponse.message = "Internal server error";
    errorResponse.errors = [
      {
        field: "general",
        message: error?.message || "An unexpected error occurred",
        value: null,
      },
    ];

    res.status(500).json(errorResponse);
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await contactData.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
        errors: [
          {
            field: "id",
            message: "Contact with the provided ID does not exist",
            value: id,
          },
        ],
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      errors: [
        {
          field: "general",
          message: error.message,
          value: null,
        },
      ],
    });
  }
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
