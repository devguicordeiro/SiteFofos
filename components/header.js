import Link from "next/link";
import { styled } from "styled-components";
import Center from "./center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import MenuIcon from "./icons/MenuIcon";

const StyledHeader = styled.header`
  background-color: #333;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const StyledNav = styled.nav.attrs((props) => ({
  mobileNavActive: props.mobileNavActive.toString(),
}))`
  ${(props) => (props.mobileNavActive === "true" ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #333;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Fofos</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Início</NavLink>
            <NavLink href={"/products"}>Produtos</NavLink>
            <NavLink href={"/categories"}>Categorias</NavLink>
            <NavLink href={"/account"}>Conta</NavLink>
            <NavLink href={"/cart"}>Carrinho ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <MenuIcon></MenuIcon>
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
