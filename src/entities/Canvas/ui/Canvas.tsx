import { useEffect } from 'react';

type Props = {
    image: string | null;
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    draw: ({ nativeEvent }: { nativeEvent: MouseEvent }) => void;
    startDrawing: ({ nativeEvent }: { nativeEvent: MouseEvent }) => void;
    finishDrawing: () => void;
    selectedColor: string;
};

export default function Canvas({
    image,
    canvasRef,
    contextRef,
    draw,
    startDrawing,
    finishDrawing,
    selectedColor,
}: Props) {
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            const context = canvasRef.current.getContext('2d', { willReadFrequently: true });
            contextRef.current = context;
            setDefaultCanvasBackground(image);
        }
    }, [image]);

    const setDefaultCanvasBackground = (imageURL: string | null) => {
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
    return (
        <canvas
            style={{ border: '1px black solid', width: '100%', height: '100%', touchAction: 'none' }}
            onPointerMove={draw}
            onPointerDown={startDrawing}
            onPointerUp={finishDrawing}
            ref={canvasRef}
        />
    );
}
