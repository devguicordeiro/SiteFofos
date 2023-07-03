import { styled } from "styled-components";
import { ButtonStyle } from "./Button";
import FlyingButtonOriginal from "react-flying-item";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button{
    ${ButtonStyle}
    ${props => props.main ? `
        background-color: black;
        color: white;
        border: 2px solid fuchsia;
    ` : `
        background-color: transparent;
        color: fuchsia;
        border: 2px solid fuchsia;
    `}
    }
`;

export default function FlyingButtonComponent(props) {
    const {addProduct} = useContext(CartContext);
    return (
        <FlyingButtonWrapper main={props.main} onClick={() => addProduct(props._id)}>
            <FlyingButtonOriginal 
                {...props}
                targetTop={"5%"} 
                targetLeft={"90%"}
                flyingItemStyling={{width: "auto",
                                    height: "auto",
                                    maxWidth: "60px",
                                    maxHeight: "60px",
                                    borderRadius: "0",
                }}>
            </FlyingButtonOriginal>
        </FlyingButtonWrapper>
    )
}