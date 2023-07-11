export default function SingleOrder({line_items, createdAt}) {
    return(
        <div>
            <time>{createdAt}</time>
            {line_items.map(item => (
                <div>
                    {item.price_data.product_data.name}
                </div>
            ))}
        </div>
    )
}