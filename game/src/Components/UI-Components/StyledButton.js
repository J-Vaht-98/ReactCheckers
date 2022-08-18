import Button from '@mui/material/Button'
function StyledButton(props) {
    return ( 
        <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={props.onClick ?? null}
                    >
                    {props.children}
                </Button>
     );
}
export default StyledButton