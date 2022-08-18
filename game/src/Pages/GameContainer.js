import Box from '@mui/material/Box'
function GameContainer(props) {
    return (
        <Box
            sx={{
                boxSizing: "content-box", //prevent the board divs from overflowing borders
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            component="main"
            maxWidth="s">
            {props.children}
        </Box>
    );
}
export default GameContainer