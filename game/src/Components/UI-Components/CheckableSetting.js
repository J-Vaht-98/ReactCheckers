import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
function CheckableSetting(props) {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
            <Typography variant="button" color="primary">
                {props.children}
            </Typography>
            <Switch
                sx={{ alignSelf: "right" }}
                checked={props.value}
                onChange={(e) => {
                    props.setter(e.target.checked)
                }}
            />
        </Box>
    );
}

export default CheckableSetting;
