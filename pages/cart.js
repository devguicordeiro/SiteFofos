import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/center";
import Header from "@/components/header";
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

        }
    }, [cartProducts]); 
    return (
        <>
            <Header></Header>
            <Center>
            <ColumnsWrapper>
                <Box>
                    {!cartProducts?.length && (
                        <div>Seu carrinho está vazio</div>
                    )}
                    {cartProducts?.length > 0 && (
                        <>
                            <h2>Cart</h2>
                            {cartProducts.map(productId => (
                                <div></div>
                            ))}
                        </>
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