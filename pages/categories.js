import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

export default function CategoriesPage({ categories }) {
    return (
        <>
            <Header />
            <Center>
                {categories.map(cat => (
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
    const categories = await Category.find({ parent: null }).maxTimeMS(30000);
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}