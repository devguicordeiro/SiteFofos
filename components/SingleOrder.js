import { styled } from "styled-components"

const StyledOrder = styled.div`
    background-color: fuchsia;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    border-radius: 5px;
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

const OrderData = styled.div`
    padding: 10px;
    margin-top: 2px;
    line-height: 1.3rem;
    font-size: 0.9rem;
    color: purple;
`;

export default function SingleOrder({line_items, createdAt, ...rest}) {
    return(
        <StyledOrder>
            <div>
                <time>{(new Date(createdAt)).toLocaleString("pt-BR")}</time>
                <OrderData>
                    {rest.name}<br />
                    {rest.email}<br />
                    {rest.cep}, {rest.city} <br />
                    {rest.address} <br />
                    {rest.house}, {rest.complement}

                </OrderData>
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