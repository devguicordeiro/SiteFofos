import { styled } from "styled-components";
import Center from "./center";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import FlyingButtonComponent from "./FlyingButtonWrapper";
import {RevealWrapper} from "next-reveal";

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
    img.main {
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

const StyledColumn = styled(Column)`
display: flex;
align-items: center;
justify-content: center;
`;

const ContentWrapper = styled.div`
    @media screen and (max-width: 768px) {
        display: flex;
        div {
            justify-content: center;
        }
}
`;

export default function Featured({product}) {
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                    <ContentWrapper>
                        <RevealWrapper delay={0} origin={"left"}>
                            <Title>{product?.title}</Title>
                            <Desc>{product?.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={"/product/"+product?._id} outline={1} white={1}>
                                    Saiba Mais
                                </ButtonLink>
                                <FlyingButtonComponent _id={product?._id} src={product?.images?.[0]}>
                                    <CartIcon/> Adicionar ao Carrinho
                                </FlyingButtonComponent>
                            </ButtonsWrapper>
                        </RevealWrapper>
                    </ContentWrapper    >
                   </Column>
                    <StyledColumn>
                        <RevealWrapper delay={0}>
                            <div>
                                <img className={"main"} src={product?.images?.[0]} alt="alt"/>
                            </div>
                        </RevealWrapper>
                    </StyledColumn>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}