import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BackButton from "../Components/UI-Components/BackButton";
function PageContainer(props) {
    return (
        <Container
            sx={{
                minWidth: 400,
                pt:props.noPadding ? 0 : 22
            }}
            component="main"
            maxWidth="xs">
            {props.children}

            {!props.noBackButton && <BackButton />}
        </Container>
    );
}
export default PageContainer;
