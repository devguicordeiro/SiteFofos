import ProductImages from "@/components/ProductImages";
import WhiteBox from "@/components/WhiteBox";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top:40px;
`;

export default function ProductPage({product}) {
    return (
        <>
            <Header>            </Header>
                <Center>
                    <ColWrapper>
                        <WhiteBox>
                            <ProductImages images={product.images}></ProductImages>
                        </WhiteBox>
                        <div>
                           <Title>{product.title}</Title>
                           <p>{product.description}</p>
                        </div>
                    </ColWrapper>
                </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props:{
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}