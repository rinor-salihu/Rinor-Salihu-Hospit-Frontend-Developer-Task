import { toast, TypeOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastNotify = (message: string, type: TypeOptions = "success") => {
    toast(message, {
        type: type,
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default toastNotify;
