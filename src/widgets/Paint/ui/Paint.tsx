import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/model/reduxHooks';
import ToolBar from '../../../entities/ToolBar/ui/ToolBar';
import { saveImage } from '../../../features';
import { HexColorPicker } from 'react-colorful';
import { ToastContainer } from 'react-toastify';
import { Box, Button, Container, Grid, List, ListItem, Slider, Typography, useMediaQuery } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import useDraw from '../model/useDraw';
import Canvas from '../../../entities/Canvas/ui/Canvas';
import { setImage } from '../../../entities/ImageCard/model/imageSlice';

type selectedTool = 'brush' | 'rectangle' | 'circle' | 'line';

function Paint() {
    const { image, id, documentId } = useAppSelector((state) => state.image);
    const { displayName, email } = useAppSelector((state) => state.user);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const [lineWidth, setLineWidth] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [figureIsFilled, setFigureIsFilled] = useState(false);
    const [selectedTool, setSelectedTool] = useState<selectedTool>('brush');

    const matchDownM = useMediaQuery('(max-width:1000px)');
    const matchDownSm = useMediaQuery('(max-width:700px)');

    const { startDrawing, finishDrawing, draw } = useDraw({
        contextRef,
        canvasRef,
        lineWidth,
        selectedColor,
        selectedTool,
        figureIsFilled,
    });

    const clearCanvas = () => {
        canvasRef.current && contextRef.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const setWidth = (_: Event, newValue: number | number[]) => {
        setLineWidth(newValue as number);
    };

    const imageDataURL = canvasRef.current?.toDataURL();

    const dispatch = useAppDispatch();
    const dispatchImageData = (
        documentId: string,
        email: string | null,
        id: string,
        image: string,
        name: string | null
    ) => dispatch(setImage({ documentId, email, id, image, name }));

    const [loading, setLoading] = useState(false);

    const handleImageSave = () => {
        setLoading(true);
        saveImage({
            displayName,
            email,
            image,
            imageDataURL,
            id,
            documentId,
            dispatchImageData,
        }).then(() => setLoading(false));
    };

    return (
        <Container sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={2} flexDirection={matchDownSm ? 'column' : 'row'}>
                <Grid
                    item
                    xs={matchDownSm ? 12 : matchDownM ? 2 : 3}
                    sx={matchDownSm ? { display: 'flex', flexWrap: 'wrap' } : { display: 'block' }}
                >
                    <ToolBar
                        selectedTool={selectedTool}
                        figureIsFilled={figureIsFilled}
                        setSelectedTool={setSelectedTool}
                        setFigureIsFilled={setFigureIsFilled}
                    />
                    <Box
                        sx={matchDownSm ? { display: 'flex', alignItems: 'center' } : null}
                        flexDirection={matchDownSm ? 'row' : 'column'}
                    >
                        <Typography
                            variant="h5"
                            component="h5"
                            sx={matchDownSm ? { display: 'none' } : { display: 'block', marginBottom: '15px' }}
                        >
                            Options
                        </Typography>
                        <List sx={matchDownSm ? { display: 'flex', flexWrap: 'wrap' } : { display: 'block' }}>
                            <ListItem disablePadding sx={{ marginBottom: '20px' }}>
                                <Slider
                                    value={lineWidth}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={20}
                                    onChange={setWidth}
                                />
                            </ListItem>
                            <ListItem disablePadding>
                                <HexColorPicker
                                    color={selectedColor}
                                    onChange={setSelectedColor}
                                    style={
                                        matchDownSm
                                            ? { width: '150px', height: '100px' }
                                            : matchDownM
                                              ? { width: '100%', height: '200px' }
                                              : undefined
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: '10px',
                            paddingTop: '40px',
                        }}
                        flexDirection={matchDownSm ? 'row' : matchDownM ? 'column' : 'row'}
                    >
                        <Button variant="outlined" onClick={clearCanvas}>
                            Clear canvas
                        </Button>
                        <Button variant="contained" disabled={loading} onClick={handleImageSave}>
                            Save
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={matchDownSm ? 12 : matchDownM ? 10 : 9}>
                    <Canvas
                        image={image}
                        canvasRef={canvasRef}
                        contextRef={contextRef}
                        draw={draw}
                        startDrawing={startDrawing}
                        finishDrawing={finishDrawing}
                        selectedColor={selectedColor}
                    />
                </Grid>
            </Grid>
            <ToastContainer />
        </Container>
    );
}

export default Paint;
