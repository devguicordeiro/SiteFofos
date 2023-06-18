import { styled } from "styled-components";
import Center from "./center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;

export default function NewProducts({ products }) {
  return (
    <div>
      <Center>
        <Title>Novidades</Title>
        <ProductsGrid>
          <ProductsGrid products={products}>

          </ProductsGrid>
        </ProductsGrid>
      </Center>
    </div>
  );
}
