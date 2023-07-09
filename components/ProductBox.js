import { styled } from "styled-components";
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext, useState } from "react";
import FlyingButtonComponent from "./FlyingButtonWrapper";
import HeartoutIcon from "./icons/HeartoutIcon";
import HeartfillIcon from "./icons/HeartfillIcon";
import axios from "axios";

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
  position: relative;
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

const WishlistButton = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  ${props => props.wished ? `
    color: red;
  ` : `
    color: black;
  `}
  svg{
    width: 18px;
  }
`;


export default function ProductBox({
        _id, title, description, price,
        images, wished=false, onRemoveHeart=() => {},
      }) {
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveHeart) {
      onRemoveHeart(_id);
    }
    axios.post("/api/wishlist", {
      product: _id,
    }).then(() => {});
    setIsWished(nextValue);
  }
  return (
    <ProductWrapper>
      <FuchsiaBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartfillIcon/> : <HeartoutIcon/>}
          </WishlistButton>
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
