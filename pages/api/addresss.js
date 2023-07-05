import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Addresss } from "@/models/Addresss";

export default async function handle(req, res) {
    await mongooseConnect();
    if (req.method === "PUT") {
        const {user} = await getServerSession(req, res, authOptions);
        const addresss = await Addresss.findOne({userEmail:user.email});
        if (addresss) {
            res.json (await Addresss.findByIdAndUpdate(addresss._id, req.body));
        } else {
            res.json (await Addresss.create({userEmail:user.email, ...req.body}));
        }
    }
    if (req.method === "GET") {
        const {user} = await getServerSession(req, res, authOptions);
        const addresss = await Addresss.findOne({userEmail:user.email});
        res.json(addresss);
    }
}