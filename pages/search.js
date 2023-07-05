import Input from "@/components/Input";
import Center from "@/components/center";
import Header from "@/components/header";
import { useRef } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
    padding: 5px 10px;
    margin: 20px;
    font-size: 1.3rem;
    border-radius: 5px; 
`;

export default function SearchPage() {
    return(
        <>
            <Header/>
            <Center>
                <SearchInput 
                    placeholder="Procure em nosso site..."
                    autoFocus />
            </Center>
        </>
    )
}