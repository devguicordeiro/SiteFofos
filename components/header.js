import Link from "next/link";
import { styled } from "styled-components";
import Center from "./center";

const StyledHeader = styled.header `
    background-color: #333;
`;
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;
const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 10px 0;
`;

const StyledNav = styled.nav `
    display: flex;
    gap: 15px;
`;

const NavLink = styled(Link) `
    color: #aaa;
    text-decoration: none;

`;

export default function Header() {
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={"/"}>
                        Fofos
                    </Logo>
                    <StyledNav>
                        <NavLink href={"/"}>Início</NavLink>
                        <NavLink href={"/products"}>Produtos</NavLink>
                        <NavLink href={"/categories"}>Categorias</NavLink>
                        <NavLink href={"/account"}>Conta</NavLink>
                        <NavLink href={"/cart"}>Carrinho (0)</NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}