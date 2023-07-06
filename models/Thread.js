import mongoose, { Schema, model, models } from "mongoose";

const ThreadSchema = new Schema({
    userEmail: {type:String, unique:true, required:true,},
    name: String,
    email: String,
    city: String,
    cep: String,
    address: String,
    house: String,
    complement: String,
});

export const Thread = models?.Thread || model("Thread", ThreadSchema);