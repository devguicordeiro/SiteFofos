import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
max-width: 100%;
max-height: 100%;
border-radius: 5px;
`;

const MainImage = styled.img`
max-width: 100%;
max-height: 200px;
border-radius: 5px;
`;

const MainImageWrapper = styled.div`
    text-align: center;
`;
const ImageButtons = styled.div `
display: flex;
flex-grow: 0;
gap: 5px;
margin-top: 5px;
`;
const ImageButton = styled.div `
border: 2px solid #aaa;
${props => props.active ? `border-color: fuchsia;` : ` opacity: .9;`}
border-radius: 5px;
height: 40px;
padding: 2px;
cursor: pointer;
box-sizing: border-box;
`;

export default function ProductImages({images}) {
    
    const [activeImage, setActiveImage] = useState(images?.[0]);
    return(
        <>
            <MainImageWrapper>
                <MainImage src={activeImage} />
            </MainImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                    key={image}
                    active={image === activeImage} 
                    onClick={() => setActiveImage(image)}>
                        <Image src={image} />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}