import { styled } from "styled-components";
import Center from "./center";
import Button from "./Button";

const Bg = styled.div`
 background-color: #333;
 color: #fff;
 padding: 50px; 0;
`;
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`;
const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;s
`;
const ColumnsWrapper = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    img{
        max-width: 100%;
    }
`;
const Column = styled.div`
    display: flex;
    align-items: center;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 5px;
`;

export default function Featured() {
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                    <div>
                        <Title>Pro</Title>
                        <Desc>lajsdoiasjdio jsaoi djasoijd asoijd saoi aksdopka asokdpoak oaksd poakdp okapdo kapodks  asodkopakdpoaksdpoakks asokd opakd opakpok asok</Desc>
                        <ButtonsWrapper>
                            <Button outline white size={"l"}>Saiba mais</Button>
                            <Button primary size={"l"}>Adicionar ao carrinho</Button>
                        </ButtonsWrapper>
                    </div>
                   </Column>
                    <Column>
                        <img src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="alt"/>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}