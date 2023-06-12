import Center from "@/components/center";
import Header from "@/components/header";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
`;

export default function CartPage() {
    return (
        <>
            <Header></Header>
            <Center>
            <ColumnsWrapper>
                <Box>1</Box>
                <Box>2</Box>
            </ColumnsWrapper>
            </Center>
        </>
    )
}