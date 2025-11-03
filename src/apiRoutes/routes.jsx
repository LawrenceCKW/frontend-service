import { lazy } from "react";

const LandingPage = lazy(() => import('../components/landing/LandingPage.jsx'))
const Login = lazy(() => import('../components/auth/Login.jsx'))
const Signup = lazy(() => import('../components/auth/Signup.jsx'))
const NotFoundPage = lazy(() => import('../components/notFound/NotFoundPage.jsx'))

export const routes = [
    { path: '/',                element: <LandingPage /> },
    { path: '/login',           element: <Login /> },
    { path: '/signup',          element: <Signup/> },
    { path: '*',                element: <NotFoundPage /> },
]