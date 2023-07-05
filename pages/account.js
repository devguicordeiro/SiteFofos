import Center from "@/components/center";
import Header from "@/components/header";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
    margin-top: 55px
`;

export default function AccountPage() {
    return (
        <>
            <Header />
            <Center>
                <Title>Conta</Title>
            </Center>
        </>
    )
}