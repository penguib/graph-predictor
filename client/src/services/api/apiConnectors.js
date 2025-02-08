import axios from "axios";

export async function submitGraphToServer(xAxis, yAxis, points, imageString, name) {
    try {
        const body = {
            description_x: xAxis,
            description_y: yAxis,
            points: points,
            image: imageString,
            name: name,
        }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/graphs`, body);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export async function submitRatingToServer(id, isCorrect) {
    try {
        const body = {
            id: id,
            rating: isCorrect
        }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ratings`, body);
    } catch (err) {
        console.log(err);
    }
}

export async function getGraphsFromServer() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/graphs`);
        return response;
    } catch (err) {
        console.log(err);
    }
}
