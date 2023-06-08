import Featured from "@/components/Featured";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({product}) {
  return (
    <div>
      <Header></Header>
      <Featured product={product}></Featured>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "64752d48bc69b54eb8c26185";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: {product: JSON.parse(JSON.stringify(product)),}

  }
}