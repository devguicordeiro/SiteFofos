import Center from "@/components/center";
import Header from "@/components/header";
import { styled } from "styled-components";
import {signIn, signOut, useSession} from "next-auth/react"
import Button from "@/components/Button";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useState } from "react";

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

export default function AccountPage() {
    const {data:session} = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [house, setHouse] = useState("");
    const [complement, setComplement] = useState("");
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
    return (
        <>
            <Header />
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>
                                <h2>Lista de desejos</h2>
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                <h2>Detalhes da conta</h2>
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
                                    <Button block={1} black={1}>
                                        Continuar para pagamento
                                    </Button>
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