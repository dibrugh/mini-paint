import { useState } from 'react';

type selectedTool = 'brush' | 'rectangle' | 'circle' | 'line';

type Props = {
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    lineWidth: number;
    selectedColor: string;
    selectedTool: selectedTool;
    figureIsFilled: boolean;
};

export default function useDraw({
    contextRef,
    canvasRef,
    lineWidth,
    selectedColor,
    selectedTool,
    figureIsFilled,
}: Props) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevMouseX, setPrevMouseX] = useState(0);
    const [prevMouseY, setPrevMouseY] = useState(0);
    const [snapshot, setSnapshot] = useState<ImageData | null>(null);

    const startDrawing = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        // Adjust the drawing coordinates based on the screen resolution
        const scaleX = canvasRef.current!.width / canvasRef.current!.offsetWidth;
        const scaleY = canvasRef.current!.height / canvasRef.current!.offsetHeight;
        const adjustedOffsetX = offsetX * scaleX;
        const adjustedOffsetY = offsetY * scaleY;
        setPrevMouseX(adjustedOffsetX);
        setPrevMouseY(adjustedOffsetY);
        if (contextRef.current && canvasRef.current) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(adjustedOffsetX, adjustedOffsetY);
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

        // Adjust the drawing coordinates based on the screen resolution
        const scaleX = canvasRef.current!.width / canvasRef.current!.offsetWidth;
        const scaleY = canvasRef.current!.height / canvasRef.current!.offsetHeight;
        const adjustedOffsetX = offsetX * scaleX;
        const adjustedOffsetY = offsetY * scaleY;

        switch (selectedTool) {
            case 'brush':
                contextRef.current?.lineTo(adjustedOffsetX, adjustedOffsetY);
                contextRef.current?.stroke();
                break;
            case 'line':
                contextRef.current?.beginPath();
                contextRef.current?.moveTo(prevMouseX, prevMouseY);
                contextRef.current?.lineTo(adjustedOffsetX, adjustedOffsetY);
                contextRef.current?.closePath();
                contextRef.current?.stroke();
                break;
            case 'rectangle': {
                if (!figureIsFilled) {
                    contextRef.current?.strokeRect(
                        adjustedOffsetX,
                        adjustedOffsetY,
                        prevMouseX - adjustedOffsetX,
                        prevMouseY - adjustedOffsetY
                    );
                } else {
                    contextRef.current?.fillRect(
                        adjustedOffsetX,
                        adjustedOffsetY,
                        prevMouseX - adjustedOffsetX,
                        prevMouseY - adjustedOffsetY
                    );
                }
                break;
            }
            case 'circle': {
                contextRef.current?.beginPath();
                const radius = Math.sqrt(
                    Math.pow(prevMouseX - adjustedOffsetX, 2) + Math.pow(prevMouseY - adjustedOffsetY, 2)
                );
                contextRef.current?.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
                figureIsFilled ? contextRef.current?.fill() : contextRef.current?.stroke();
                break;
            }
            default:
                break;
        }
    };
    return {
        startDrawing,
        finishDrawing,
        draw,
    };
}
