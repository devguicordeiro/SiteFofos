import Link from "next/link";

export default function Header() {
    return (
        <header>
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
        </header>
    )
}