import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
      <Header></Header>
      <Featured product={featuredProduct}></Featured>
      <NewProducts></NewProducts>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "64752d48bc69b54eb8c26185";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {"_id":-1, limit:10}});
  return {
    props: {featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}