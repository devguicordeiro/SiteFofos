import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/center";
import Header from "@/components/header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
`;

export default function CartPage() {
    const {cartProducts} = useContext(CartContext);
    const [products, setProducts] = useState ([]);
    useEffect (() => {
        if (cartProducts.length > 0) {
            axios.post("/api/cart", {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        }
    }, [cartProducts]); 
    return (
        <>
            <Header></Header>
            <Center>
            <ColumnsWrapper>
                <Box>
                <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Seu carrinho está vazio</div>
                    )}
                    {products?.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                    <tr>
                                        <td>{product.title}</td>
                                         <td>{cartProducts.filter(id => id === product._id).length}</td>
                                        <td></td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                                    <Box>
                                        <h2>Informação do pedido</h2>
                                        <input type="text"></input>
                                        <input type="text"></input>
                                        <Button block={1} black={1}>Continuar para pagamento</Button>
                                     </Box>
                )}
            </ColumnsWrapper>
            </Center>
        </>
    )
}