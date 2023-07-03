import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import FlyingButton from "react-flying-item";

const ProductWrapper = styled.div``;

const FuchsiaBox = styled(Link)`
  background-color: fuchsia;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
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

const ButtonWrapper = styled.div`
  button: 5px solid red;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext);
  return (
    <ProductWrapper>
      <FuchsiaBox href={url}>
        <div>
          <img src={images?.[0]} alt={title} />
        </div>
      </FuchsiaBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>R$ {price}</Price>
          <ButtonWrapper onClick={() => addProduct(_id)}>
          <FlyingButton src={images?.[0]} 
                        targetTop={"5%"} 
                        targetLeft={"90%"}
                        flyingItemStyling={{width: "auto",
                                            height: "auto",
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                            borderRadius: "0",
                        }}>
            ---- <CartIcon />
          </FlyingButton>
          </ButtonWrapper>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
