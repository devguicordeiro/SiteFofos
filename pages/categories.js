import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
    return (
        <>
            <Header />
            <Center>
                {mainCategories.map(cat => (
                    <div key={cat._id}>
                        <h2>{cat.name}</h2>
                    </div>
                ))}
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const categories = await Category.find().maxTimeMS(30000);
    const mainCategories = categories.filter(c => !c.parent);
    const categoriesProducts = {}; 
    for (const mainCat of mainCategories) {
        const products = await Product.find({category: mainCat._id}, null, {limit:3, sort:{"_id": -1}});
        categoriesProducts[mainCat._id] = products;
    }
    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
        },
    };
}