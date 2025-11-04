
import { forwardRef } from "react";
import "./InputField.css";

const InputField = forwardRef(function InputField(
    {
        type = "text",
        label,
        required = false,
        size = "md",
        id,
        autoComplete,
        style,
        registration,
        error,
        ...rest
    },
    ref
) {
    const inputId =
        id || `input-${(label || type).toString().replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div className="container">
            <div className={`entry_area${error ? " has-error" : ""}`} data-size={size} style={style}>
                <input
                    id={inputId}
                    type={type}
                    required={required}
                    placeholder=" "
                    autoComplete={autoComplete}
                    aria-required={required}
                    aria-invalid={!!error}
                    ref={ref}
                    {...registration}
                    {...rest}
                />
                <label className="label_line" htmlFor={inputId}>
                    {label}{required && " *"}
                </label>
            </div>
            {error ? <small className="field_error">{error}</small> : null}
        </div>
    );
});

export default InputField;
