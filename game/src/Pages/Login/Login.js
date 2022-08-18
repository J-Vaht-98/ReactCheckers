import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import StyledButton from "../../Components/UI-Components/StyledButton";
import PageContainer from "../PageContainer";
function Login(props) {
    return (
        <PageContainer noBackButton>
            <CssBaseline />
            <StyledButton onClick={() => (window.location.href = "/play")}>
                Play local
            </StyledButton>

            <StyledButton
                onClick={() => (window.location.href = "/multiplayer")}>
                Play against other people
            </StyledButton>
            <StyledButton onClick={() => (window.location.href = "/settings")}>
                Settings
            </StyledButton>
        </PageContainer>
    );
}

export default Login;
