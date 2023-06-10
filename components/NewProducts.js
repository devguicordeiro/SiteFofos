import { styled } from "styled-components"
import Center from "./center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

export default function NewProducts({products}) {
    return(
        <div>
            <Center>
            <ProductsGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBox {...product}/>
                ))}
            </ProductsGrid>
            </Center>
        </div>
    )
}