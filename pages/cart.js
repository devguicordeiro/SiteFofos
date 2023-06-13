import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Table from "@/components/Table";
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

const ProductInfoCell = styled.div `
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const ProductImageBox = styled.div`
  img {
    max-width: 80px;
    max-height: 80px;
  }
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuantityLabel = styled.span`
  padding: 0 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then(response => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  function plusProduct(id) {
    addProduct(id);
  }

  function lessProduct(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header></Header>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Carrinho</h2>
            {!cartProducts?.length && <div>Seu carrinho está vazio</div>}
            {products?.length > 0 && (
              <Table>
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
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessProduct(product._id)}>-</Button>
                        <QuantityLabel>{cartProducts.filter(id => id === product._id).length}</QuantityLabel>
                        <Button onClick={() => plusProduct(product._id)}>+</Button>
                      </td>
                      <td>R${cartProducts.filter(id => id === product._id).length * product.price}</td>
                    </tr>
                  ))}
                    <tr>
                      <td>TOTAL:</td>
                      <td></td>
                      <td>R${total}</td>
                    </tr>
                </tbody>
              </Table>
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
  );
}
