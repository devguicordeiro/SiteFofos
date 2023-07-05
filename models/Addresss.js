import mongoose, { Schema, model, models } from "mongoose";

const AddresssSchema = new Schema({
    userEmail: {type:String, unique:true, required:true},
    name: String,
    email: String,
    city: String,
    cep: String,
    address: String,
    house: String,
    complement: String,
});

export const Addresss = models?.addresss || model("Addresss", AddresssSchema);