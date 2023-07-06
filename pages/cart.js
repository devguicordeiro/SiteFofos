import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Input from "@/components/Input";
import Table from "@/components/Table";
import Center from "@/components/center";
import Header from "@/components/header";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
}
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
`;

const ProductInfoCell = styled.th`
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
  padding: 2px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    padding: 10px;
  };
`;

const QuantityLabel = styled.span`
  padding: 0 14px;
  display: block;
  @media screen and (min-width: 768px) { 
    display: inline-block;
    padding: 0 10px;
  };
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [complement, setComplement] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then(response => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get("/api/thread").then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setCep(response.data.cep);
      setAddress(response.data.address);
      setHouse(response.data.house);
      setComplement(response.data.complement);
    }
    )
  }, []);

  function plusProduct(id) {
    addProduct(id);
  }

  function lessProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      cep,
      address,
      house,
      complement,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header></Header>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Obrigado por comprar com a Fofos!</h1>
              <p>Nós vamos lhe enviar por email os detalhes de sua ordem.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <Center>
        <ColumnsWrapper>
        <RevealWrapper delay={0}>
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
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt={product.title} />
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
          </RevealWrapper>
          {!!cartProducts?.length && (
          <RevealWrapper delay={100}>
            <Box>
              <h2>Informação do pedido</h2>
              <Input
                type="text"
                placeholder="Nome"
                value={name}
                name="name"
                onChange={ev => setName(ev.target.value)}
              ></Input>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={ev => setEmail(ev.target.value)}
              ></Input>
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  name="city"
                  onChange={ev => setCity(ev.target.value)}
                ></Input>
                <Input
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  name="cep"
                  onChange={ev => setCep(ev.target.value)}
                ></Input>
              </CityHolder>
              <Input
                type="text"
                placeholder="Endereço"
                value={address}
                name="address"
                onChange={ev => setAddress(ev.target.value)}
              ></Input>
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Casa, apt, ..."
                  value={house}
                  name="house"
                  onChange={ev => setHouse(ev.target.value)}
                ></Input>
                <Input
                  type="text"
                  placeholder="Complemento"
                  value={complement}
                  name="complement"
                  onChange={ev => setComplement(ev.target.value)}
                ></Input>
              </CityHolder>
              <Button onClick={goToPayment} block={1} black={1}>
                Continuar para pagamento
              </Button>
            </Box>
          </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
