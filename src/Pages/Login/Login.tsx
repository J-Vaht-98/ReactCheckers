import CssBaseline from "@mui/material/CssBaseline";
import { FC } from "react";
import StyledButton from "../../Components/UI-Components/StyledButton";
import PageContainer from "../PageContainer";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <PageContainer noBackButton>
      <CssBaseline />
      <StyledButton onClick={() => (window.location.href = "/play")}>
        Play local
      </StyledButton>

      <StyledButton onClick={() => (window.location.href = "/multiplayer")}>
        Play against other people
      </StyledButton>
      <StyledButton onClick={() => (window.location.href = "/settings")}>
        Settings
      </StyledButton>
    </PageContainer>
  );
};

export default Login;
