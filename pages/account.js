import Center from "@/components/center";
import Header from "@/components/header";
import { styled } from "styled-components";
import {signIn, signOut, useSession} from "next-auth/react"
import Button from "@/components/Button";

const Title = styled.h1`
    font-size: 1.5em;
    margin-top: 55px
`;

export default function AccountPage() {
    const {data:session} = useSession();
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
                <Title>Conta</Title>
                {session && (
                    <Button primary={1} onClick={logout}>Logout</Button>
                )}
                {!session && (
                    <Button primary={1} onClick={login}>Login</Button>
                )}
            </Center>
        </>
    )
}