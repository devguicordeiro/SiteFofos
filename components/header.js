import Link from "next/link";
import { styled } from "styled-components";

const StyledHeader = styled.header `
    background-color: #333;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Link href={"/"}>
                Fofos
            </Link>
            <nav>
                <Link href={"/"}>Início</Link>
                <Link href={"/products"}>Produtos</Link>
                <Link href={"/categories"}>Categorias</Link>
                <Link href={"/account"}>Conta</Link>
                <Link href={"/cart"}>Carrinho (0)</Link>
            </nav>
        </StyledHeader>
    )
}