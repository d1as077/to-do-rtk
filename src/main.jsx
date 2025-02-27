import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {ToastContainer} from "react-toastify"

import App from "./App.jsx"
import {store} from "./redux/store.js"

import "./index.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer
                autoClose={1000}
                limit={5}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </Provider>
    </StrictMode>
)
