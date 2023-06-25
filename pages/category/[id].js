import Center from "@/components/center";
import Header from "@/components/header";
import { Category } from "@/models/Category";

export default function CategoryPage({category}) {
    return (
        <>
            <Header></Header>
            <Center>
                {category.name  }
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    const category = await Category.findById(context.query.id);
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
        }
    };
}