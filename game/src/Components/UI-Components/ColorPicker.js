import { Button, InputLabel, Slider, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import random from "lodash/random";
import ColorExample from "./ColorExample";
export const getRgba = ({ r, g, b, a }) => {
    return `rgba(${r},${g},${b},${a})`;
};
export const strToRgba = (str)=>{
    const fallback = {r:0,g:0,b:0,a:0} //transparent
    if(!str) return fallback
    if(!str.includes("rgba(")) return fallback
    str = str.replace(/\s/g, '');
    str = str.replace('rgba(','')
    str = str.replace(')','')
    str = str.split(',')
    return{
        r:parseInt(str[0]),
        g:parseInt(str[1]),
        b:parseInt(str[2]),
        a:parseFloat(str[3])
    }
}
function ColorPicker(props) {
    const [closed, setClosed] = useState(true);
    const color = strToRgba(props.defaultValue);
    const canvasStyle = {
        background: "none",
        borderRadius: "10px",
    };
    const canvasWidth = 100;
    const canvasHeight = 100;
    const canvasKey = Math.random();
    const canvasID = `canvas-${canvasKey}`;
    useEffect(() => {
        if (!closed) {
            const canvas = document.getElementById(canvasID);
            const ctx = canvas.getContext("2d");
            const init = (color) => {
                if (props.type === "square") {
                    ctx.fillStyle = color;
                    ctx.fillRect(1, 1, 99, 99);
                } else {
                    //Draw a circle
                    ctx.beginPath();
                    ctx.arc(50, 50, 46, 0, 2 * Math.PI);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            };
            init(getRgba(color));
            return () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            };
        }
    }, [color, closed]);
    const handleSliderChange = (key, val) => {
        // setColor({ ...color, [key]: val });
        color[key] = val
        props.onChange(getRgba(color));
    };

    return (
        <>
            {!closed && (
                <Box
                    sx={{
                        mt: 2,
                        minWidth: "xs",
                        display: "grid",
                        gridTemplateRows: "10% 90%",
                        gridAutoFlow: "column",
                        "&:hover": {
                            background:
                                "linear-gradient(90deg,#e66465, 10%, #9198e5)",
                            borderRadius: "10px",
                        },
                    }}>
                    <Typography
                        sx={{
                            gridRow: 1,
                            gridColumn: "1/4",
                            pb: 1,
                            pl: 9,
                        }}
                        color="primary"
                        variant="button">
                        {props.label}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pb: 7,
                        }}>
                        <canvas
                            style={canvasStyle}
                            id={canvasID}
                            width={canvasWidth}
                            height={canvasHeight}
                        />
                    </Box>
                    <Box
                        sx={{
                            alignSelf: "flex-end",
                            pl: 2,
                        }}>
                        <InputLabel>Red</InputLabel>
                        <Slider
                            value={color.r}
                            min={0}
                            max={255}
                            onChange={(e, val) => handleSliderChange("r", val)}
                        />
                        <InputLabel>Green</InputLabel>
                        <Slider
                            value={color.g}
                            min={0}
                            max={255}
                            onChange={(e, val) => handleSliderChange("g", val)}
                        />
                        <InputLabel>Blue</InputLabel>
                        <Slider
                            value={color.b}
                            min={0}
                            max={255}
                            onChange={(e, val) => handleSliderChange("b", val)}
                        />
                        <InputLabel>Opacity</InputLabel>
                        <Slider
                            value={color.a}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={(e, val) => handleSliderChange("a", val)}
                        />

                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}>
                            <Button
                                onClick={(e) => {
                                    const a = parseFloat(random(0.4,1.0).toFixed(1))
                                    const randomColor = {
                                        r: random(0, 255),
                                        g: random(0, 255),
                                        b: random(0, 255),
                                        a: a,
                                    };
                                    // setColor(randomColor);
                                    props.onChange(getRgba(randomColor));
                                }}>
                                Randomize?
                            </Button>
                            <Button
                                color="error"
                                variant="contained"
                                sx={{
                                    alignSelf: "right",
                                    p: 0,
                                }}
                                onClick={() =>
                                    closed ? setClosed(false) : setClosed(true)
                                }>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
            {closed && (
                <Box
                    sx={{
                        display:'flex',
                        width:'100%',
                        justifyContent:'space-between'
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            closed ? setClosed(false) : setClosed(true);
                        }}>
                        {props.label}
                    </Button>
                
                    <ColorExample type={props.type} color={color} />
                </Box>
            )}
        </>
    );
}
export default ColorPicker;
