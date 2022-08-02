import { Box, Typography, TextField, Button, Switch } from "@mui/material";
function CheckableOption(props) {
    return (
        <Box
            maxWidth
            sx={{
                mt: 1,
                display: "inline-flex",
                justifyContent: "space-between",
            }}>
            <Typography
                sx={{
                    alignSelf: "center",
                }}
                variant="h6"
                align="left">
                {props.text}
            </Typography>
            <Switch
                onChange={(e) => props.onChange(e)}
                sx={{
                    alignSelf: "flex-start",
                }}
                defaultChecked
            />
        </Box>
    );
}
function TypeableOption(props) {
    // https://mui.com/material-ui/react-text-field/
    return (
        <Box
            maxWidth
            sx={{
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
            }}>
            <TextField
                defaultValue={props.placeholder}
                label={props.label}
                variant="outlined"
                onChange={(e) => props.onChange(e)}
            />
        </Box>
    );
}

function Settings({ setPlayComputer }) {
    /**
     * @param {setAiOpponent} -parent setState to set ai opponent on/off
     * @param {setNick} -parent setState to set nickname
     */
    return (
        <Box
            sx={{
                mt: 1,
                pl: 1,
                pr: 2,
                pb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                borderRadius: "10px",
                width: "100%",
                "&:hover": {
                    borderColor: "rgba(0,0,0,0.5)",
                },
            }}
            maxWidth>
            <CheckableOption
                text="Play computer"
                onChange={(e) => setPlayComputer(e.target.checked)}
            />
        </Box>
    );
}

export default Settings;
