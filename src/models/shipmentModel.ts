import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // Remove unique:true if a user can have multiple shipments
    },
    shipmentNumber: { type: String },
    shipmentIndex: { type: Number }, // <-- add this
    shipmentType: { type: String, default: "Outgoing" },
    methodOfAssignment: { type: String },
    shipmentSize: { type: String },
    recipient: { type: String },
    pickupMethod: { type: String },
    Status: { type: String },
    DateOfLastChange: { type: String },
    Paid: { type: Boolean },
  },
  { timestamps: true }
);

// Model registration. Key is case-sensitive and matches the capitalized name.
export const Shipment =
  mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
