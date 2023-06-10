import { styled } from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";

const ProductWrapper = styled.div`

`;

const FuchsiaBox = styled.div`
    background-color: fuchsia;
    padding: 20px;
    height: 120px;
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`;

const Title = styled.h2`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
`;

const ProductInfoBox = styled.div `
    margin-top: 2px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Price = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
`;

export default function ProductBox({_id, title, description, price, images}) {
    return(
        <ProductWrapper>
            <FuchsiaBox>
                <div>
                <img src={images[0]}></img>
                </div>
            </FuchsiaBox>
            <ProductInfoBox>
                <Title>{title}</Title>
                <PriceRow>
                    <Price>R$ {price}</Price>
                    <Button primary={1}><CartIcon/></Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}