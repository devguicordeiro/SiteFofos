import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import Center from "@/components/center";
import Header from "@/components/header";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
    padding: 5px 10px;
    margin: 20px;
    font-size: 1.3rem;
    border-radius: 5px; 
`;

export default function SearchPage() {
    const [phrase, setPhrase] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
    useEffect(() => {
        if (phrase.length > 0) {
            setIsLoading(true);
            debouncedSearch(phrase);
        } else{
            setProducts([]);
        }
    }, [phrase]);
    
    function searchProducts(phrase) {
        axios.get("/api/products?phrase="+encodeURIComponent(phrase))
        .then(response => {
            setProducts(response.data);
            setIsLoading(false);
        })
    }
    return(
        <>
            <Header/>
            <Center>
                <SearchInput 
                    placeholder="Procure em nosso site..."
                    value={phrase}
                    onChange={ev => setPhrase(ev.target.value)}
                    autoFocus />
                    {!isLoading && phrase !== "" && products.length === 0 && (
                        <h2>Nenhum produto encontrado para pesquisa "{phrase}".</h2>
                    )}
                    {isLoading && (
                        <Spinner fullWidth={true} />
                    )}
                    {!isLoading && products.length > 0 && (
                        <ProductsGrid products={products} />
                    )}
            </Center>
        </>
    )
}