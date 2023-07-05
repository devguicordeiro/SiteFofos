import Input from "@/components/Input";
import Center from "@/components/center";
import Header from "@/components/header";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
    padding: 5px 10px;
    margin: 20px;
    font-size: 1.3rem;
    border-radius: 5px; 
`;

export default function SearchPage() {
    const [phrase, setPhrase] = useState("");
    useEffect(() => {
        if (phrase.length > 0) {
            axios.get("/api/products?phrase="+encodeURIComponent(phrase))
            .then(response => {

            })
        }
    }, [phrase])
    return(
        <>
            <Header/>
            <Center>
                <SearchInput 
                    placeholder="Procure em nosso site..."
                    value={phrase}
                    onChange={ev => setPhrase(ev.target.value)}
                    autoFocus />
            </Center>
        </>
    )
}