import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import FlyingButtonComponent from "@/components/FlyingButtonWrapper";
import ProductImages from "@/components/ProductImages";
import WhiteBox from "@/components/WhiteBox";
import Center from "@/components/center";
import Header from "@/components/header";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 40px 0;
    @media screen and (min-width: 768px) {
        grid-template-columns: .8fr 1.2fr;
    }
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const Price = styled.div`
    font-size: 1.4rem;
`;

export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);
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
                           <PriceRow>
                                <Price>
                                    R${product.price}
                                </Price>
                                <div>
                                    <FlyingButtonComponent main _id={product._id} src={product.images?.[0]}>
                                        <CartIcon/>Adicionar ao Carrinho
                                    </FlyingButtonComponent>
                                </div>
                            </PriceRow>
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