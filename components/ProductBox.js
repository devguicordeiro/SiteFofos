import { styled } from "styled-components";
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import FlyingButtonComponent from "./FlyingButtonWrapper";
import HeartoutIcon from "./icons/HeartoutIcon";

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


export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;
  const { addProduct } = useContext(CartContext);
  return (
    <ProductWrapper>
      <FuchsiaBox href={url}>
        <div>
          <HeartoutIcon />
          <img src={images?.[0]} alt={title} />
        </div>
      </FuchsiaBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>R$ {price}</Price>
          <FlyingButtonComponent _id={_id} src={images?.[0]}>
            <CartIcon></CartIcon>
          </FlyingButtonComponent>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
