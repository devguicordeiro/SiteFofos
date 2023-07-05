import mongoose, { Schema, model, models } from "mongoose";

const AddressSchema = new Schema({
    user: mongoose.Types.ObjectId,
    name: String,
    email: String,
    city: String,
    cep: String,
    address: String,
    house: String,
    complement: String,
});

export const Address = models?.address || model("Address", AddressSchema);