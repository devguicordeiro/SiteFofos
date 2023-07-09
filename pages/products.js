import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";

const Title = styled.h1`
    font-size: 1.5em;
    margin-top: 55px
`;

export default function ProductsPage({products,wishedProducts}) {
    return(
        <>
            <Header></Header>
            <Center>
                <Title>Todos os Produtos</Title>
                <ProductsGrid products={products} wishedProducts={wishedProducts}></ProductsGrid>
            </Center>
        </>
    )
}

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{"_id":-1}});
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    
    const wishedProducts = session?.user 
        ? 
        await WishedProduct?.find({
        userEmail:session?.user.email,
        product: products.map(p => p._id.toString()),
    })  : 
        [];
    
    return {props:{
        products: JSON.parse(JSON.stringify(products)),
        wishedProducts: wishedProducts.map(i => i.product.toString()),
    }};
}