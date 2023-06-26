import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/center";
import Header from "@/components/header";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useState } from "react";
import { styled } from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

const CategoryHeader = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FiltersWrapper = styled.div `
    display: flex;
    gap: 15px;
`;

const Filter = styled.div `
    background-color: #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    select{
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: inherit;
    }
`;

export default function CategoryPage({category, products}) {
    const [filtersValues, setFiltersValues] = useState(category.properties
        .map(p => ({name:p.name, value:"all"})));
    function handleFilterChange(filterName, filterValue) {
        setFiltersValues(prev => {
            const newValues = prev.map(p => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value,
            }));
            return newValues;
        });
    }

    return (
        <>
            <Header></Header>
            <Center>
                <CategoryHeader>
                    <Title>{category.name}</Title>
                    <FiltersWrapper>
                        {category.properties.map(prop => (
                            <Filter key={prop.name}>
                                <span>{prop.name}:</span>
                                <select
                                onChange={ev => handleFilterChange(prop.name, ev.target.value)} 
                                value={filtersValues.find(f => f.name === prop.name).value}>
                                    <option value="all">Nenhuma</option>
                                    {prop.values.map(val => (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </Filter>
                        ))}
                    </FiltersWrapper>
                </CategoryHeader>
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