import Center from "@/components/center";
import Header from "@/components/header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
    return (
        <>
            <Header />
            <Center>
                {mainCategories.map(cat => (
                    <div key={cat._id}>
                        <h2>{cat.name}</h2>
                        <div>
                            {categoriesProducts[cat._id].map(p => (
                                <div>{p.title}</div>
                            ))}
                        </div>
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
            .map(c => c._id);
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