import { Container, Switch, Typography, Box, Button } from "@mui/material";
import ColorPicker from "../Components/UI-Components/ColorPicker";
import { useState } from "react";

function OptionBox(props) {
    return (
        <Box {...props} marginTop={2}>
            {props.children}
        </Box>
    );
}

function Settings(props) {
    const revertState = () => {
        let storedState = window.localStorage.getItem('checkersTheme')
        if(storedState){
            storedState = JSON.parse(storedState)
            props.setState({...storedState})
            return
        }
        let state = { ...defaultState };
        props.setState(state);
    };
    const defaultState = JSON.stringify(window.localStorage.getItem('checkersTheme')) || props.defaultState //fallbackState
    
    const handleSaveSettings = ()=>{
        window.localStorage.setItem("checkersTheme",JSON.stringify(props.state))
    }
    const [revert, setRevert] = useState(false);
    return (
        <>
            <Container maxWidth="xs">
                <OptionBox
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Typography variant="button" color="primary">
                        Play computer
                    </Typography>
                    <Switch
                        sx={{ alignSelf: "right" }}
                        checked={props.state.game.playComputer}
                        onChange={(e) => {
                            let state = { ...props.state };
                            state.game.playComputer = e.target.checked;
                            props.setState(state);
                        }}
                    />
                </OptionBox>
                <OptionBox>
                    <ColorPicker
                        onChange={(val) => {
                            let state = { ...props.state };
                            state.style.blackSquare = val;
                            props.setState(state);
                        }}
                        defaultValue={props.state.style.blackSquare}
                        label="Select black square color"
                        type="square"
                    />
                </OptionBox>
                <OptionBox>
                    <ColorPicker
                        onChange={(val) => {
                            let state = { ...props.state };
                            state.style.whiteSquare = val;
                            props.setState(state);
                        }}
                        label="Select white square color"
                        type="square"
                        defaultValue={props.state.style.whiteSquare}
                    />
                </OptionBox>
                <OptionBox>
                    <ColorPicker
                        onChange={(val) => {
                            let state = { ...props.state };
                            state.style.buttons.colors[0] = val;
                            props.setState(state);
                        }}
                        defaultValue={props.state.style.buttons.colors[0]}
                        label="Select Player 1 button color"
                    />
                </OptionBox>
                <OptionBox>
                    <ColorPicker
                        onChange={(val) => {
                            let state = { ...props.state };
                            state.style.buttons.colors[1] = val;
                            props.setState(state);
                        }}
                        defaultValue={props.state.style.buttons.colors[1]}
                        label="Select Player 2 button color"
                    />
                </OptionBox>
                <Box
                    sx={{
                        mt:2
                    }}
                >
                    <Button
                        onClick={() => {
                            if(revert){
                                revertState()
                                setRevert(false)
                            }
                            else
                                setRevert(true);
                            
                        }}
                        color={revert? "error":undefined}
                        sx={{
                            float: "left",
                        }}>
                        Revert Settings
                    </Button>
                    {revert && <Button
                        onClick={()=>{
                            setRevert(false)
                        }}
                        sx={{
                            float: "right",
                        }}>
                        Cancel
                    </Button>}
                    <Button
                        sx={{
                            float:'left'
                        }}
                        onClick={()=>handleSaveSettings()}
                    >
                        Save Settings
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        sx={{
                            mt: 22,
                            float: "left",
                        }}
                        onClick={() => {
                            window.location = "/";
                        }}>
                        Back
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default Settings;
