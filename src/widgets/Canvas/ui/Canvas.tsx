// Вешать на кликнутые кнопки стиль active

import {
    Button,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Slider,
    Switch,
    Typography,
} from '@mui/material';

import Crop32Icon from '@mui/icons-material/Crop32';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import BrushIcon from '@mui/icons-material/Brush';
import { useEffect, useRef, useState } from 'react';

function Canvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    // Далее можно будет получать тулы по Primary тексту
    const [selectedTool, setSelectedTool] = useState('brush');

    const [prevMouseX, setprevMouseX] = useState(null);
    const [prevMouseY, setprevMouseY] = useState(null);
    const [snapshot, setSnapshot] = useState(null);
    const [figureIsFilled, setFigureIsFilled] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const context = canvas.getContext('2d', { willReadFrequently: true });
        contextRef.current = context;

        setDefaultCanvasBackground();
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setprevMouseX(offsetX);
        setprevMouseY(offsetY);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineWidth = lineWidth;
        contextRef.current.strokeStyle = selectedColor;
        contextRef.current.fillStyle = selectedColor;
        setSnapshot(contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
        setIsDrawing(true);
    };
    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        contextRef.current.putImageData(snapshot, 0, 0);
        const { offsetX, offsetY } = nativeEvent;
        switch (selectedTool) {
            case 'brush':
                contextRef.current.lineTo(offsetX, offsetY);
                contextRef.current.stroke();
                break;
            case 'line':
                contextRef.current.beginPath();
                contextRef.current.moveTo(prevMouseX, prevMouseY);
                contextRef.current.lineTo(offsetX, offsetY);
                contextRef.current.closePath();
                contextRef.current.stroke();
                break;
            case 'rectangle': {
                if (!figureIsFilled) {
                    contextRef.current.strokeRect(offsetX, offsetY, prevMouseX - offsetX, prevMouseY - offsetY);
                } else contextRef.current.fillRect(offsetX, offsetY, prevMouseX - offsetX, prevMouseY - offsetY);
                break;
            }
            case 'circle': {
                contextRef.current.beginPath();
                const radius = Math.sqrt(Math.pow(prevMouseX - offsetX, 2) + Math.pow(prevMouseX - offsetX, 2));
                contextRef.current.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
                figureIsFilled ? contextRef.current.fill() : contextRef.current.stroke();
                break;
            }
            default:
                break;
        }
    };

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const setDefaultCanvasBackground = () => {
        contextRef.current.fillStyle = '#ffffff';
        contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.fillStyle = selectedColor;
    };

    const saveImage = () => {
        const img = canvasRef.current.toDataURL();
        console.log(img);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography>Shapes</Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setSelectedTool('rectangle')}>
                                <ListItemIcon>
                                    <Crop32Icon />
                                </ListItemIcon>
                                <ListItemText primary="Rectangle" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setSelectedTool('circle')}>
                                <ListItemIcon>
                                    <PanoramaFishEyeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Circle" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setSelectedTool('line')}>
                                <ListItemIcon>
                                    <HorizontalRuleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Line" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={figureIsFilled}
                                            onChange={() => setFigureIsFilled(!figureIsFilled)}
                                        />
                                    }
                                    label="Filled"
                                />
                            </FormGroup>
                        </ListItem>
                    </List>
                    <Typography>Options</Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setSelectedTool('brush')}>
                                <ListItemIcon>
                                    <BrushIcon />
                                </ListItemIcon>
                                <ListItemText primary="Brush" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <Slider
                                value={lineWidth}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={1}
                                max={20}
                                onChange={(e) => setLineWidth(e.target.value)}
                            />
                        </ListItem>
                    </List>
                    <Typography>Colors</Typography>
                    <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
                    <Button variant="outlined" onClick={clearCanvas}>
                        Clear canvas
                    </Button>
                    <Button variant="contained" onClick={saveImage}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <canvas
                        style={{ border: '1px red solid', width: '100%', height: '100%' }}
                        onMouseMove={draw}
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        ref={canvasRef}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Canvas;
