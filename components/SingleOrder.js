import { styled } from "styled-components"

const StyledOrder = styled.div`
    background-color: fuchsia;
    margin: 10px 0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 30px;
    time{
        font-size: 0.9rem;
        font-weight: bold;
        color: purple
    }
`;
const ProductRow = styled.div`
    span{
        border: 1px solid black;
        color: purple;
        padding: 0 2px;
        border-radius: 5px;
    }
`;

export default function SingleOrder({line_items, createdAt}) {
    return(
        <StyledOrder>
            <div>
                <time>{(new Date(createdAt)).toLocaleString("pt-BR")}</time>
            </div>
            <div>
                {line_items.map(item => (
                    <ProductRow>
                        <span>{item.quantity} x</span> {item.price_data.product_data.name}
                    </ProductRow>
                ))}
            </div>

        </StyledOrder>
    )
}