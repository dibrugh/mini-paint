import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    FormGroup,
    FormControlLabel,
    Switch,
    useMediaQuery,
} from '@mui/material';
import Crop32Icon from '@mui/icons-material/Crop32';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import BrushIcon from '@mui/icons-material/Brush';

type selectedTool = 'brush' | 'rectangle' | 'circle' | 'line';

type ToolBarProps = {
    selectedTool: selectedTool;
    setSelectedTool: React.Dispatch<React.SetStateAction<selectedTool>>;
    figureIsFilled: boolean;
    setFigureIsFilled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToolBar({ selectedTool, figureIsFilled, setSelectedTool, setFigureIsFilled }: ToolBarProps) {
    const matchDownM = useMediaQuery('(max-width:1000px)');
    const matchDownSm = useMediaQuery('(max-width:700px)');
    const isActive = {
        color: '#fff',
        backgroundColor: '#1976d2',
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    };
    return (
        <Box
            sx={matchDownSm ? { display: 'flex', alignItems: 'center' } : { display: 'block' }}
            flexDirection={matchDownSm ? 'row' : 'column'}
        >
            <Typography variant="h5" component="h5" sx={{ marginBottom: '15px' }}>
                Shapes
            </Typography>
            <List sx={matchDownSm ? { display: 'flex', alignItems: 'center' } : { display: 'block' }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => setSelectedTool('rectangle')}
                        sx={selectedTool === 'rectangle' ? isActive : null}
                    >
                        <ListItemIcon>
                            <Crop32Icon />
                        </ListItemIcon>
                        <ListItemText primary={matchDownM ? '' : 'Rectangle'} />
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
                        <ListItemText primary={matchDownM ? '' : 'Circle'} />
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
                        <ListItemText primary={matchDownM ? '' : 'Line'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => setSelectedTool('brush')}
                        sx={selectedTool === 'brush' ? isActive : null}
                    >
                        <ListItemIcon>
                            <BrushIcon />
                        </ListItemIcon>
                        <ListItemText primary={matchDownM ? '' : 'Brush'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ margin: '10px 15px' }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch checked={figureIsFilled} onChange={() => setFigureIsFilled(!figureIsFilled)} />
                            }
                            label={matchDownM ? '' : 'Filled'}
                        />
                    </FormGroup>
                </ListItem>
            </List>
        </Box>
    );
}
