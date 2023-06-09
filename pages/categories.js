import ProductBox from "@/components/ProductBox";
import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import { styled } from "styled-components";
import { RevealWrapper } from "next-reveal";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

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

export default function CategoriesPage({ mainCategories, categoriesProducts, wishedProducts=[] }) {
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
                            {categoriesProducts[cat._id].map((p, index) => (
                                <RevealWrapper key={p._id} delay={index*50}>
                                    <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                                </RevealWrapper>
                            ))}
                            <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                                <ShowAllSquare href={"/category/"+cat._id}>
                                    Mostrar todos
                                </ShowAllSquare>
                            </RevealWrapper>
                        </CategoryGrid>
                    </div>
                ))}
            </Center>
        </>
    );
}

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const categories = await Category.find().maxTimeMS(30000);
    const mainCategories = categories.filter(c => !c.parent);
    const categoriesProducts = {};
    const allFechedProductsId = [];
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
            .filter(c => c?.parent?.toString() === mainCatId)
            .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product.find({category: categoriesIds}, null, {limit:3, sort:{"_id": -1}});
        allFechedProductsId.push(...products.map(p => p._id.toString( )))
        categoriesProducts[mainCat._id] = products;
    }
    const session = await getServerSession(ctx.req, ctx.res, authOptions)
    const wishedProducts = session?.user 
        ?
        await WishedProduct?.find({
        userEmail:session?.user.email,
        product: allFechedProductsId,
    }) :
        [];

    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts: wishedProducts.map (i => i.product.toString()),
        },
    };
}