import mongoose, { Schema } from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      email: String,
      isFavourite: {
        type: Boolean,
        default: false,
      },
      contactType: {
        type: String, 
        enum: ["work", "home", "personal"],
        default: "personal",
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
      },
      photo: {
        type: String
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  export const Contact = mongoose.model("Contact", contactSchema);