import { styled } from "styled-components";

const Image = styled.img`
max-width: 100%;
max-height: 100%;
border-radius: 5px;
`;

const ImageButtons = styled.div `
display: flex;
flex-grow: 0;
gap: 5px;
margin-top: 5px;
`;
const ImageButton = styled.div `
border: 2px solid #aaa;
border-radius: 5px;
height: 40px;
padding: 2px;
cursor: pointer;
box-sizing: border-box;
`;

export default function ProductImages({images}) {
    

    return(
        <>
            <Image src={images?.[0]} />
            <ImageButtons>
                {images.map(image => (
                    <ImageButton>
                        <Image src={image} />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}