import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./apiRoutes/routes.jsx";
import {ContextProvider} from "./store/ContextApi.jsx";

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={ router }/>
            </Suspense>
        </ContextProvider>
    </StrictMode>
)
