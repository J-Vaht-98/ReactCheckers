import { Box } from "@mui/material";
import { getRgba } from "./ColorPicker";

function ColorExample({type,color}) {
    let borderRadius = '20px'
    let border = 0
    
    if(type ==='square'){
        borderRadius = '5px'
    }
    if(color.a === 0){
        border=1
    }
    color = getRgba(color)
    return ( 
        <Box 
        sx={{
            width:'40px',
            height:'40px',
            background:color,
            borderRadius: borderRadius,
            border:border
        }}
        >
        </Box>
     );
}

export default ColorExample;