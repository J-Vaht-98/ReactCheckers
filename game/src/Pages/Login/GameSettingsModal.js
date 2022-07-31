import { useEffect, useState } from "react";
import { ChromePicker, SketchPicker } from "react-color";

function GameSettingsModal({closeHandler}) {
    const [color,setColor] = useState('#333')
    const handleChange = (color,e)=>{
        setColor(color)
    }

    return ( 
    <div>
        <h3>this the settings modal</h3>
        <form>
            <ChromePicker color={color} onChange={handleChange}/>
        </form>
        <button onClick={()=>{closeHandler()}}>Close</button>
    </div> 
    
    );
}

export default GameSettingsModal;