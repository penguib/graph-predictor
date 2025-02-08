export function loadOpenCV() {
    return new Promise((resolve, reject) => {
        if (window.cv) {
            resolve(window.cv);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://docs.opencv.org/master/opencv.js"; // CDN for OpenCV.js
        script.async = true;
        script.onload = () => {
            if (window.cv) {
                resolve(window.cv);
            } else {
                reject(new Error("Failed to load OpenCV"));
            }
        };
        script.onerror = () => reject(new Error("Failed to load OpenCV"));

        document.body.appendChild(script);
    });
}

export async function getPointsFromGraph(imageElement) {
    const cv = await loadOpenCV(); // Ensure OpenCV is loaded

    let src = cv.imread(imageElement);
    let gray = new cv.Mat();
    let edges = new cv.Mat();
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
    cv.Canny(gray, edges, 50, 150);

    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    let points = [];
    for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        for (let j = 0; j < contour.data32S.length; j += 2) {
            let x = contour.data32S[j];
            let y = src.rows - contour.data32S[j + 1]; // ✅ Flip Y-axis
            points.push({ x, y });
        }
    }

    // Sort by x-coordinate to maintain graph order
    points.sort((a, b) => a.x - b.x);

    // Reduce to 100 points by sampling evenly
    if (points.length > 100) {
        let step = Math.ceil(points.length / 100);
        points = points.filter((_, index) => index % step === 0).slice(0, 100);
    }

    // Cleanup
    src.delete();
    gray.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();

    return points;
}
