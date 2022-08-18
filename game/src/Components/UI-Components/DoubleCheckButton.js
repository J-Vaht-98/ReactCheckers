import { Button,Box} from "@mui/material";
import { useState } from 'react';

function DoubleCheckButton(props) {
    const [doubleCheck,setDoubleCheck] = useState(false)
    const btn = <Button sx={{p:0}}onClick={()=>setDoubleCheck(true)}>{props.children}</Button>
    const doubleCheckButton= <Button 
        color="error"
    onClick={()=>{
        if(props.onClick)
            props.onClick()
        setDoubleCheck(false)
    }}>{props.children}</Button>
    const goBackButton = <Button onClick={()=>setDoubleCheck(false)}>Cancel</Button>
    return ( 
        <>
           <Box
           sx={{
            display:'flex',
            width:'100%',
            justifyContent:'space-between',
            flexDirection:'column',
            float:props.float
           }}>
           {!doubleCheck && btn}
           {!doubleCheck && <Button></Button>}
            {doubleCheck && doubleCheckButton}
            {doubleCheck && goBackButton}
           </Box>
        </>
     );
}

export default DoubleCheckButton;