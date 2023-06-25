import ProductBox from "@/components/ProductBox";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const CategoryGrid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const CategoryTitle = styled.h2 `
    margin-top: 40px;
    margin-bottom: 10px;
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
    return (
        <>
            <Header />
            <Center>
                {mainCategories.map(cat => (
                    <div key={cat._id}>
                        <CategoryTitle>{cat.name}</CategoryTitle>
                        <CategoryGrid>
                            {categoriesProducts[cat._id].map(p => (
                                <ProductBox {...p} />
                            ))}
                        </CategoryGrid>
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
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
            .filter(c => c?.parent?.toString() === mainCatId)
            .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product.find({category: categoriesIds}, null, {limit:3, sort:{"_id": -1}});
        categoriesProducts[mainCat._id] = products;
    }
    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
        },
    };
}