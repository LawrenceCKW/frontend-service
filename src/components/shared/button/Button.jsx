// src/components/shared/button/Button.jsx
import "./Button.css";

const Button = ({ disabled, children, onHandleClick, type = "submit" }) => {
    return (
        <div>
            <button
                disabled={disabled}
                type={type}                 // default submit
                onClick={onHandleClick}     // also triggers when clicking
            >
                {children}
            </button>
        </div>
    );
};
export default Button;
