import ProductBox from "@/components/ProductBox";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import { styled } from "styled-components";

const CategoryGrid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const CategoryTitle = styled.div `
    margin-top: 40px;
    display:flex;
    align-items: center;
    gap: 20px;
    a {
        color: #333;
    }
`;

const ShowAllSquare = styled(Link) `
    background-color: #ddd;
    border-radius: 5px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    text-decoration: none;
`;

const CatName = styled(Link) `
    text-decoration: none;
    h1:hover {
        color: fuchsia;
    }
`;

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
                        <CategoryTitle>
                            <div>
                                <CatName href={"/category/"+cat._id}>
                                    <Title>{cat.name}</Title>
                                </CatName>
                            </div>
                        </CategoryTitle>
                        <CategoryGrid>
                            {categoriesProducts[cat._id].map(p => (
                                <ProductBox key={p._id} {...p} />
                            ))}
                            <ShowAllSquare href={"/category/"+cat._id}>
                                Mostrar todos
                            </ShowAllSquare>
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