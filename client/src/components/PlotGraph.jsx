import React, { useEffect, useRef } from "react";

function PlotGraph({ points, newPoints }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && points.length) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            // Set canvas size based on your graph range
            const padding = 20;
            const width = canvas.width;
            const height = canvas.height;
            const maxX = Math.max(...points.map(p => p.x), ...newPoints.map(p => p.x));
            const maxY = Math.max(...points.map(p => p.y), ...newPoints.map(p => p.y));

            // Set axis
            ctx.clearRect(0, 0, width, height); // Clear canvas
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding); // X axis
            ctx.lineTo(width - padding, height - padding);
            ctx.moveTo(padding, height - padding); // Y axis
            ctx.lineTo(padding, padding);
            ctx.stroke();

            // Function to draw each point slowly
            let currentIndex = 0;
            const drawPoint = () => {
                if (currentIndex < points.length) {
                    const point = points[currentIndex];
                    const x = (point.x / maxX) * (width - 2 * padding) + padding;
                    const y = height - (point.y / maxY) * (height - 2 * padding) - padding;

                    // Draw point
                    ctx.fillStyle = "blue";
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Move to the next point
                    currentIndex++;
                    setTimeout(drawPoint, 5); // 50ms delay between points, adjust as needed
                }
            };


            drawPoint(); // Start drawing points

            currentIndex = 0;
            const drawPoint2 = () => {
                if (currentIndex < newPoints.length) {
                    const point = newPoints[currentIndex];
                    const x = (point.x / maxX) * (width - 2 * padding) + padding;
                    const y = height - (point.y / maxY) * (height - 2 * padding) - padding;

                    // Draw point
                    ctx.fillStyle = "green";
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Move to the next point
                    currentIndex++;
                    setTimeout(drawPoint2, 5); // 50ms delay between points, adjust as needed
                }
            };


            drawPoint2(); // Start drawing points
        }
    }, [points]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default PlotGraph;

