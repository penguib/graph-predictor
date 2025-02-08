import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GraphSubmission from "./pages/GraphSubmission.jsx"
import Feed from "./pages/Feed.jsx";
import BottomNav from "./components/BottomNav.jsx";
import About from "./pages/About.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<GraphSubmission />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/about" element={<About />} />

            </Routes>
            <BottomNav />
            <div className='mb-32'></div>
        </Router>
    )
}

export default App
