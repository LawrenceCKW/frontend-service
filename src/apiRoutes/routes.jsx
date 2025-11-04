import { lazy } from "react";

// TODO: Routes of all pages
const LandingPage = lazy(() => import('../components/landing/LandingPage.jsx'))
const Login = lazy(() => import('../components/auth/login/Login.jsx'))
const Signup = lazy(() => import('../components/auth/signup/Signup.jsx'))
const Account = lazy(() => import('../components/account/Account.jsx'))
const NotFoundPage = lazy(() => import('../components/notFound/NotFoundPage.jsx'))

// TODO: Routes of components
export const routes = [
    { path: '/',                element: <LandingPage /> },
    { path: '/login',           element: <Login /> },
    { path: '/signup',          element: <Signup/> },
    { path: './account',        element: <Account /> },
    { path: '*',                element: <NotFoundPage /> },
]