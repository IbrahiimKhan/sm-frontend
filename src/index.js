import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>   
);