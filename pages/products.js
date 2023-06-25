import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
    margin-top: 55px
`;

export default function ProductsPage({products}) {
    return(
        <>
            <Header></Header>
            <Center>
                <Title>Todos os Produtos</Title>
                <ProductsGrid products={products}></ProductsGrid>
            </Center>
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{"_id":-1}});
    return {props:{
        products: JSON.parse(JSON.stringify(products)),
    }};
}