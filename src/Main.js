import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import App from "./App";
import PageLogin from "./components/PageLogin";
import Register from "./components/PageRegister";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<PageLogin/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/:status" element={<App/>}/>
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
};
export default Main;