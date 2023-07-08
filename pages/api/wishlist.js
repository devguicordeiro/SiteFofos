import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    await mongooseConnect();
    if (req.method === "POST") {
        const {productId} = req.body;
        res.json(productId);
    }
}