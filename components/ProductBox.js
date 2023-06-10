import { styled } from "styled-components"

const ProductWrapper = styled.div`

`;

const FuchsiaBox = styled.div`
    background-color: fuchsia;
    padding: 20px;
    height: 150px;
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    img{
        max-width: 100%;
        max-height: 150px;
    }
`;

export default function ProductBox({_id, title, description, price, images}) {
    return(
        <ProductWrapper>
        <FuchsiaBox>
            <div>
               <img src={images[0]}></img>
            </div>
        </FuchsiaBox>
        {title}
        </ProductWrapper>
    )
}