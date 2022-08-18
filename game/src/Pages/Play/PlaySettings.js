import CheckableSetting from "../../Components/UI-Components/CheckableSetting";
import { defaultSettings } from "../../Constants";
import React, { useState } from 'react';


function PlaySettings(props) {
    const [settings,setSettings] = useState(JSON.parse(window.localStorage.getItem("checkersSettings")) ?? defaultSettings)
    function handleChangeSettings(key,val){
        settings.game[key] = val
        setSettings(settings)
        window.localStorage.setItem("checkersSettings",settings)
    }
    return (
        <>
            <CheckableSetting
            value={settings.game.playComputer}
            setter={(val)=>handleChangeSettings("playComputer",val)}
            >Play computer</CheckableSetting>
            <CheckableSetting
           value={settings.game.forcedTakes}
           setter={(val)=>handleChangeSettings("forcedTakes",val)}
            >Forced Takes</CheckableSetting>
        </>
    );
}

export default PlaySettings;
