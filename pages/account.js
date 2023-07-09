import Center from "@/components/center";
import Header from "@/components/header";
import { styled } from "styled-components";
import {signIn, signOut, useSession} from "next-auth/react"
import Button from "@/components/Button";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";

const Title = styled.h1`
    font-size: 1.5em;
    margin-top: 55px
`;

const ColsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 40px;
    margin: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedGrid = styled.div`
    display: grid;
    gap: 20px;
`;

export default function AccountPage() {
    const {data:session} = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [house, setHouse] = useState("");
    const [complement, setComplement] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [wishedLoaded, setWishedLoaded] = useState(false);
    const [wishedProducts, setWishedProducts] = useState([]);
    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }
    async function login() {
        await signIn("google", {
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }
    function saveThread() {
        const data = {name, email, city, cep, address, house, complement};
        axios.put("/api/thread", data);
    }
    useEffect(() => { 
            axios.get("/api/thread").then(response => {
                setName(response.data.name);
                setEmail(response.data.email);
                setCity(response.data.city);
                setCep(response.data.cep);
                setAddress(response.data.address);
                setHouse(response.data.house);
                setComplement(response.data.complement);
                setLoaded(true);
            });
            axios.get("/api/wishlist").then(response => {
                setWishedProducts(response.data.map(wp => wp.product));
                setWishedLoaded(true);
            })
    }, []);
    function producetRemovedWish(idToRemove) {
        setWishedProducts(products => {
            return [...products.filter(p => p._id.toString() !== idToRemove )];
        })
    }

    return (
        <>
            <Header />
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>
                                <h2>Lista de desejos</h2>
                                {!wishedLoaded && (
                                    <Spinner fullWidth={true} />
                                )}
                                {wishedLoaded && (
                                    <WishedGrid>
                                        {wishedProducts.length > 0 && wishedProducts.map
                                            (wp => (
                                        <ProductBox {...wp} wished="true"
                                             key={wp._id} onRemoveHeart={producetRemovedWish} />
                                         ))}
                                  </WishedGrid>
                                )}
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                            <h2>Detalhes da conta</h2>
                            {!loaded && (
                                <Spinner fullWidth={true}></Spinner>
                            )}
                                {loaded && (
                                    <>
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
                                    <Button onClick={saveThread} block={1} black={1}>
                                        Salvar
                                    </Button>
                                    <hr />
                                    </>
                                )}
                                {session && (
                                    <Button primary={1} onClick={logout}>Logout</Button>
                                )}
                                {!session && (
                                    <Button primary={1} onClick={login}>Login</Button>
                                )}
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
            </Center>
        </>
    )
}