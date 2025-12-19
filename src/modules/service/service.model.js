const mongoose = require("mongoose");
const { StatusSchema } = require("../../config/common.schema.js");

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 2,
      max: 200,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    serviceCategory: {
      type: mongoose.Types.ObjectId,
      ref: "ServiceCategory",
      default: null
    },
    fee: {
      type: Number,
      min: 0,
      default: 0
    },
    description: {
      type: String,
      required: true
    },
    requiredDocuments: [
      {
        type: String
      }
    ],
    processingTime: {
      type: String,
      default: "3-5 working days"
    },
    status: { ...StatusSchema },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
