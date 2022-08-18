import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip"

function Login(props) {
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
                    Play Local
                </Button>
                    <Box sx={{width:'100%'}}>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>{window.location.href = "/multiplayer"}}
                    >
                    Play against other people
                </Button>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                    onClick={()=>{window.location.href = "/settings"}}
                    >
                    Settings
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
