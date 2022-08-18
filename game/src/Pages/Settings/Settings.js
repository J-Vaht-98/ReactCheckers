import {
    Container,
    Switch,
    Typography,
    Box,
    Button,
    Tooltip,
} from "@mui/material";
import ColorPicker from "../../Components/UI-Components/ColorPicker";
import { useState } from "react";
import CheckableSetting from "../../Components/UI-Components/CheckableSetting";
import DoubleCheckButton from "../../Components/UI-Components/DoubleCheckButton";
import { defaultSettings } from "../../Constants";

function OptionBox(props) {
    return (
        <Box {...props} marginTop={2}>
            {props.children}
        </Box>
    );
}
export function getGameSettingsFromLocalStorage() {
    try {
        return JSON.parse(window.localStorage.getItem("checkersSettings"));
    } catch (error) {
        return;
    }
}

function Settings(props) {
    const localStorageSettings =
        getGameSettingsFromLocalStorage() ?? defaultSettings;
    const [settings, setSettings] = useState(localStorageSettings);
    function handleRevertSettings() {
        setSettings(localStorageSettings);
    }
    function handleSaveSettings() {
        console.log("Saving " + settings)
        window.localStorage.setItem(
            "checkersSettings",
            JSON.stringify(settings)
        );
    }
    function handleColorChange(key, val) {
        let state = { ...settings };
        state.style[key] = val;
        setSettings(state);
    }
    function handleButtonColorChange(idx, val) {
        let state = { ...settings };
        state.style.buttons.colors[idx] = val;
        setSettings(state);
    }
    function handleFullRevert() {
        setSettings(defaultSettings)
        window.localStorage.setItem(
            "checkersSettings",
            JSON.stringify(defaultSettings)
        );
    }
    return (
        <>
            <CheckableSetting
                value={settings.game.playComputer}
                setter={(value) => {
                    let state = { ...settings };
                    state.game.playComputer = value;
                    setSettings(state);
                }}>
                Play Computer
            </CheckableSetting>
            <CheckableSetting
                value={settings.game.forcedTakes}
                setter={(value) => {
                    let state = { ...settings };
                    state.game.forcedTakes = value;
                    setSettings(state);
                }}>
                Forced Takes
            </CheckableSetting>
            {props.showColorSettings && (
                <Box>
                    <OptionBox>
                        <ColorPicker
                            onChange={(val) =>
                                handleColorChange("blackSquare", val)
                            }
                            defaultValue={settings.style.blackSquare}
                            label="Select black square color"
                            type="square"
                        />
                    </OptionBox>
                    <OptionBox>
                        <ColorPicker
                            onChange={(val) =>
                                handleColorChange("whiteSquare", val)
                            }
                            label="Select white square color"
                            type="square"
                            defaultValue={settings.style.whiteSquare}
                        />
                    </OptionBox>
                    <OptionBox>
                        <ColorPicker
                            onChange={(val) => handleButtonColorChange(0, val)}
                            defaultValue={settings.style.buttons.colors[0]}
                            label="Select Player 1 button color"
                        />
                    </OptionBox>
                    <OptionBox>
                        <ColorPicker
                            onChange={(val) => handleButtonColorChange(1, val)}
                            defaultValue={settings.style.buttons.colors[1]}
                            label="Select Player 2 button color"
                        />
                    </OptionBox>
                </Box>
            )}
            {props.showSaveOptions && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 4,
                        p: 0,
                    }}>
                    <DoubleCheckButton onClick={handleSaveSettings}>
                        Save settings
                    </DoubleCheckButton>
                    <DoubleCheckButton onClick={handleRevertSettings}>
                        Revert settings to latest saved
                    </DoubleCheckButton>
                    {props.showFullRevert && (
                        <DoubleCheckButton onClick={handleFullRevert}>
                            Revert to default settings
                        </DoubleCheckButton>
                    )}
                </Box>
            )}
        </>
    );
}

export default Settings;
