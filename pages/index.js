import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct"

export default function HomePage({featuredProduct, newProducts, wishedNewProducts}) {
  return (
    <div>
      <Header></Header>
      <Featured product={featuredProduct}></Featured>
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts}></NewProducts>
    </div>
  )
} 

export async function getServerSideProps(ctx) {
  const featuredProductId = "649cb35f5a19a26d55334838";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {"_id":-1}, limit:12});
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const wishedNewProducts = session?.user
    ? 
    await WishedProduct?.find({
    userEmail:session.user.email,
    product: newProducts.map(p => p._id.toString()),
  }) 
    : 
    [];

  return {
    props: {featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
            wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}