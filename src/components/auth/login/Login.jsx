import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import { useMyContext } from "../../../store/ContextApi.jsx";
import InputField from "../../shared/InputField/InputField.jsx";
import Button from "../../shared/button/Button.jsx";
import api from "../../../services/api.jsx";  // axios instance after the fixes
import "./Login.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Your Context returns an OBJECT { token, setToken, ... }
    const { setToken, token } = useMyContext();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: { username: "", password: "" },
        mode: "onTouched"
    });

    const values = watch();
    const isValid = useMemo(() => {
        const uOk = values.username.trim().length > 0;
        const pOk = values.password.trim().length >= 6;
        return uOk && pOk;
    }, [values]);

    const handleSuccessfulLogin = (rawToken, decodedToken, rolesFromBody) => {
        const roles =
            Array.isArray(rolesFromBody) ? rolesFromBody
                : Array.isArray(decodedToken?.roles) ? decodedToken.roles
                    : typeof decodedToken?.roles === "string"
                        ? decodedToken.roles.split(",").map(s => s.trim()).filter(Boolean) : [];

        const user = {
            username: decodedToken.sub,
            roles
        };

        localStorage.setItem("JWT_TOKEN", rawToken);
        localStorage.setItem("USER", JSON.stringify(user));
        localStorage.setItem("IS_ADMIN", JSON.stringify(roles.includes("ROLE_ADMIN")));

        // Share globally via context
        setToken(rawToken);

        // Land on a protected page (your ProtectedRoute checks token)
        navigate("/account");
    };

    const onLoginHandler = async (data) => {
        console.log("[submit] form data:", data);

        try {
            setLoading(true);

            console.log("[request] POST /auth/public/signin");
            const response = await api.post("/auth/public/signin", data);

            console.log("[response] status:", response.status);
            console.log("[response] body:", response.data);

            if (response.status === 200 && response.data?.jwtToken) {
                toast.success("Login Successful");
                const raw = response.data.jwtToken;

                console.log("[jwt] raw token:", raw.slice(0, 25) + "...");
                const decoded = jwtDecode(raw);
                console.log("[jwt] decoded:", decoded);

                handleSuccessfulLogin(raw, decoded, response.data.roles);
                reset();
            } else {
                console.log("[response] unexpected format");
                toast.error("Login failed. Please check your credentials and try again.");
            }
        } catch (err) {
            console.error("[error] signin failed:", err);
            console.error("[error] response:", err?.response);
            toast.error("Invalid credentials");
        } finally {
            console.log("[finally] done, setLoading(false)");
            setLoading(false);
        }
    };

    // If already logged in, redirect away from the login page
    useEffect(() => {
        if (token) navigate("/");
    }, [navigate, token]);

    return (
        <div className="login_wrap">
            <form className="login_card" onSubmit={handleSubmit(onLoginHandler)} noValidate>
                <h1 className="login_title">Login</h1>

                {/* Username */}
                <div className="login_field">
                    <InputField
                        type="text"
                        label="Username"
                        required
                        size="md"
                        autoComplete="username"
                        registration={register("username", {
                            required: "Username is required"
                        })}
                        error={errors.username?.message}
                    />
                </div>

                {/* Password */}
                <div className="login_field">
                    <InputField
                        type="password"
                        label="Password"
                        required
                        size="md"
                        autoComplete="current-password"
                        registration={register("password", {
                            required: "Password is required",
                            // minLength: { value: 6, message: "At least 6 characters" }
                        })}
                        error={errors.password?.message}
                    />
                </div>

                <div className="login_actions">
                    <Button
                        disabled={loading || !isValid}
                        type="submit"
                        onHandleClick={handleSubmit(onLoginHandler)}
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
