import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from  "react-router-dom";

function Login() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 22,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>{window.location.href = "/play"}}
                    >
                    Play
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}>
                    Settings
                </Button>
                <Typography component="h1" color="text.secondary">
                  Customize your boards appearance and more..
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
