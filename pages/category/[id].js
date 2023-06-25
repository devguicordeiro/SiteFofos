import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/center";
import Header from "@/components/header";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

export default function CategoryPage({category, products}) {
    return (
        <>
            <Header></Header>
            <Center>
                <Title>{category.name}</Title>
                <ProductsGrid products={products}></ProductsGrid>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    const category = await Category.findById(context.query.id);
    const subCategories = await Category.find({parent:category._id});
    const catIds = [category.id, ...subCategories.map(c => c._id)];
    const products = await Product.find({category:catIds});
    
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}