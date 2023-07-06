import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Thread } from "@/models/Thread";

export default async function handle(req, res) {
    await mongooseConnect();
    if (req.method === "PUT") {
        const {user} = await getServerSession(req, res, authOptions);
        const thread = await Thread.findOne({userEmail:user.email});
        if (thread) {
            res.json(await Thread.findByIdAndUpdate(thread._id, req.body))
        } else {
            res.json(await Thread.create({userEmail:user.email, ...req.body}))
        }
    }
    if (req.method === "GET") {
        const {user} = await getServerSession(req, res, authOptions);
        const thread = await Thread.findOne({userEmail:user.email});
        res.json(thread);
    }
}