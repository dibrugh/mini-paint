import { useState } from 'react';

type Props = {
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    lineWidth: number;
    setLineWidth: React.Dispatch<React.SetStateAction<number>>;
    selectedColor: string;
    figureIsFilled: boolean;
    imageId?: string;
};

function useCanvasToolbar(props: Props) {
    const { contextRef, canvasRef, lineWidth, selectedColor, figureIsFilled, setLineWidth } = props;

    const [isDrawing, setIsDrawing] = useState(false);

    const [selectedTool, setSelectedTool] = useState('brush');
    const [prevMouseX, setprevMouseX] = useState(0);
    const [prevMouseY, setprevMouseY] = useState(0);
    const [snapshot, setSnapshot] = useState<ImageData | null>(null);

    const startDrawing = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setprevMouseX(offsetX);
        setprevMouseY(offsetY);
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

    const setDefaultCanvasBackground = (test: string) => {
        if (contextRef.current && canvasRef.current && test) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = test;
            img.onload = () => {
                contextRef.current!.drawImage(img, 0, 0);
            };
        } else if (contextRef.current && canvasRef.current && !test) {
            contextRef.current.fillStyle = '#ffffff';
            contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            contextRef.current.fillStyle = selectedColor;
        }
    };

    const setWidth = (_: Event, newValue: number | number[]) => {
        setLineWidth(newValue as number);
    };

    return {
        draw,
        startDrawing,
        finishDrawing,
        setWidth,
        setDefaultCanvasBackground,
        clearCanvas,
        selectedTool,
        setSelectedTool,
    };
}

export default useCanvasToolbar;
