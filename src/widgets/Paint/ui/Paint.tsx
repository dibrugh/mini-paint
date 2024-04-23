import {
    Box,
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
import { useContext, useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../app/context/Auth';
import { UsefetchImages, saveImage, useCanvasToolbar } from '../../../features';
import { HexColorPicker } from 'react-colorful';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

type Props = {
    imageId?: string;
};

function Paint({ imageId }: Props) {
    const currentUser = useContext(AuthContext);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [lineWidth, setLineWidth] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [figureIsFilled, setFigureIsFilled] = useState(false);

    const {
        draw,
        startDrawing,
        finishDrawing,
        setWidth,
        setDefaultCanvasBackground,
        clearCanvas,
        selectedTool,
        setSelectedTool,
    } = useCanvasToolbar({ contextRef, canvasRef, lineWidth, selectedColor, figureIsFilled, setLineWidth, imageId });

    const img = canvasRef.current?.toDataURL();

    // experimental
    const storage = getStorage();
    const [imageURL, setImageURL] = useState('');
    const { imagesData } = UsefetchImages();
    useEffect(() => {
        if (imageId) {
            const getImageUrl = async () => {
                const result = await getDownloadURL(ref(storage, `/images/${imageId}`));
                setImageURL(result);
            };
            getImageUrl();
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;

            const context = canvasRef.current.getContext('2d', { willReadFrequently: true });
            contextRef.current = context;
            setDefaultCanvasBackground(imageURL);
        }
    }, [imageURL]);

    const isActive = {
        color: '#fff',
        backgroundColor: '#1976d2',
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    };

    return (
        <Container sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="h5" component="h5" sx={{ marginBottom: '15px' }}>
                        Shapes
                    </Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedTool('rectangle')}
                                sx={selectedTool === 'rectangle' ? isActive : null}
                            >
                                <ListItemIcon>
                                    <Crop32Icon />
                                </ListItemIcon>
                                <ListItemText primary="Rectangle" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedTool('circle')}
                                sx={selectedTool === 'circle' ? isActive : null}
                            >
                                <ListItemIcon>
                                    <PanoramaFishEyeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Circle" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedTool('line')}
                                sx={selectedTool === 'line' ? isActive : null}
                            >
                                <ListItemIcon>
                                    <HorizontalRuleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Line" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ margin: '10px 15px' }}>
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
                    <Typography variant="h5" component="h5" sx={{ marginBottom: '15px' }}>
                        Options
                    </Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedTool('brush')}
                                sx={selectedTool === 'brush' ? isActive : null}
                            >
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
                                onChange={setWidth}
                            />
                        </ListItem>
                    </List>
                    <Typography variant="h5" component="h5" sx={{ marginBottom: '15px' }}>
                        Colors
                    </Typography>
                    <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', paddingTop: '40px' }}>
                        <Button variant="outlined" onClick={clearCanvas}>
                            Clear canvas
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => saveImage({ img, currentUser, imageId, imageURL, imagesData })}
                        >
                            Save
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <canvas
                        style={{ border: '1px black solid', width: '100%', height: '100%' }}
                        onMouseMove={draw}
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        ref={canvasRef}
                    />
                </Grid>
            </Grid>
            <ToastContainer />
        </Container>
    );
}

export default Paint;
