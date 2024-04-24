import { useEffect, useRef, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { HexColorPicker } from 'react-colorful';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebaseConfig';
import { useFetchImages } from '../../../features';
import { uploadSuccessful } from '../../../shared/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../../app/store/useUser';

type Props = {
    imageId?: string;
};

function Paint({ imageId }: Props) {
    const { email, displayName } = useUser();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [lineWidth, setLineWidth] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [figureIsFilled, setFigureIsFilled] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState('brush');
    const [prevMouseX, setPrevMouseX] = useState(0);
    const [prevMouseY, setPrevMouseY] = useState(0);
    const [snapshot, setSnapshot] = useState<ImageData | null>(null);
    const [imageURL, setImageURL] = useState('');

    const storage = getStorage();
    const { imagesData } = useFetchImages();

    useEffect(() => {
        if (imageId) {
            const getImageUrl = async () => {
                const result = await getDownloadURL(ref(storage, `/images/${imageId}`));
                setImageURL(result);
            };
            getImageUrl();
        }
    }, [imageId]);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            const context = canvasRef.current.getContext('2d', { willReadFrequently: true });
            contextRef.current = context;
            setDefaultCanvasBackground(imageURL);
        }
    }, [imageURL]);

    const startDrawing = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setPrevMouseX(offsetX);
        setPrevMouseY(offsetY);
        if (contextRef.current && canvasRef.current) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
            contextRef.current.lineWidth = lineWidth;
            contextRef.current.strokeStyle = selectedColor;
            contextRef.current.fillStyle = selectedColor;
            setSnapshot(contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
        }
        setIsDrawing(true);
    };
    const finishDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };
    const draw = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
        if (!isDrawing) {
            return;
        }
        contextRef.current?.putImageData(snapshot as ImageData, 0, 0);
        const { offsetX, offsetY } = nativeEvent;
        switch (selectedTool) {
            case 'brush':
                contextRef.current?.lineTo(offsetX, offsetY);
                contextRef.current?.stroke();
                break;
            case 'line':
                contextRef.current?.beginPath();
                contextRef.current?.moveTo(prevMouseX, prevMouseY);
                contextRef.current?.lineTo(offsetX, offsetY);
                contextRef.current?.closePath();
                contextRef.current?.stroke();
                break;
            case 'rectangle': {
                if (!figureIsFilled) {
                    contextRef.current?.strokeRect(offsetX, offsetY, prevMouseX - offsetX, prevMouseY - offsetY);
                } else contextRef.current?.fillRect(offsetX, offsetY, prevMouseX - offsetX, prevMouseY - offsetY);
                break;
            }
            case 'circle': {
                contextRef.current?.beginPath();
                const radius = Math.sqrt(Math.pow(prevMouseX - offsetX, 2) + Math.pow(prevMouseX - offsetX, 2));
                contextRef.current?.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
                figureIsFilled ? contextRef.current?.fill() : contextRef.current?.stroke();
                break;
            }
            default:
                break;
        }
    };

    const clearCanvas = () => {
        canvasRef.current && contextRef.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const setDefaultCanvasBackground = (imageURL: string) => {
        if (contextRef.current && canvasRef.current && imageURL) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = imageURL;
            img.onload = () => {
                contextRef.current!.drawImage(img, 0, 0);
            };
        } else if (contextRef.current && canvasRef.current && !imageURL) {
            contextRef.current.fillStyle = '#ffffff';
            contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            contextRef.current.fillStyle = selectedColor;
        }
    };

    const setWidth = (_: Event, newValue: number | number[]) => {
        setLineWidth(newValue as number);
    };

    const img = canvasRef.current?.toDataURL();

    const isActive = {
        color: '#fff',
        backgroundColor: '#1976d2',
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    };

    // Save func
    const saveImage = async () => {
        if (imageURL) {
            const testDocumentId = imagesData?.filter((el) => el.id === imageId)[0].documentId;
            const storageRef = ref(storage, `/images/${imageId}`);
            await uploadString(storageRef, img!, 'data_url').then(() => {
                uploadSuccessful();
            });
            const downloadURL = await getDownloadURL(storageRef);
            const imageRef = doc(db, 'users', testDocumentId);
            const uploading = await updateDoc(imageRef, {
                id: imageId,
                name: displayName,
                email: email,
                image: downloadURL,
            });

            console.log('Updating....', uploading);
        } else {
            const newImageId = uuidv4();
            const storageRef = ref(storage, `/images/${newImageId}`);
            await uploadString(storageRef, img!, 'data_url').then(() => {
                uploadSuccessful();
            });
            const downloadURL = await getDownloadURL(storageRef);
            const uploading = await addDoc(collection(db, 'users'), {
                id: newImageId,
                name: displayName,
                email: email,
                image: downloadURL,
            });

            console.log('Uploading....', uploading);
        }
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
                        <Button variant="contained" onClick={saveImage}>
                            Save
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <canvas
                        style={{ border: '1px black solid', width: '100%', height: '100%', touchAction: 'none' }}
                        onPointerMove={draw}
                        onPointerDown={startDrawing}
                        onPointerUp={finishDrawing}
                        ref={canvasRef}
                    />
                </Grid>
            </Grid>
            <ToastContainer />
        </Container>
    );
}

export default Paint;
