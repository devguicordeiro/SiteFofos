import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

export default function ProductsPage() {
    return(
        <>
            <Header></Header>
            <Center>
                <Title>Todos os Produtos</Title>
            </Center>
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    return {props:{
        products: await Product.find({}, {sort:"_id"}),
    }};
}