import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ContactMe from "./pages/ContactMe";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<ContactMe />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;