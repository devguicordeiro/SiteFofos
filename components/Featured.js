import { styled } from "styled-components";
import Center from "./center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
 background-color: #333;
 color: #fff;
 padding: 50px; 0;
`;
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.8rem;
    @media screen and (min-width: 768px) {
        font-size: 3rem;
    }
`;
const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;s
`;
const ColumnsWrapper = styled.div `
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1) {
        order: 2;
    }
    
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        div:nth-child(1) {
            order: 0;
        }
        img{
            max-width: 100%;
        }
    }

`;
const Column = styled.div`
    display: flex;
    align-items: center;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

export default function Featured({product}) {
    const{addProduct} = useContext(CartContext)
    function addFeaturedToCart(){

        addProduct(prev => [product._id]);
    }
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                    <div>
                        <Title>{product.title}</Title>
                        <Desc>{product.description}</Desc>
                        <ButtonsWrapper>
                            <ButtonLink href={"/product/"+product._id} outline={1} white={1}>Saiba mais</ButtonLink>
                            <Button white={1} onClick={addFeaturedToCart}>
                                <CartIcon/>
                                Adicionar ao carrinho</Button>
                        </ButtonsWrapper>
                    </div>
                   </Column>
                    <Column>
                        <img src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="alt"/>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}