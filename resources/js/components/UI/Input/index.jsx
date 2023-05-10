import './Input.scss'

export const Input = ({ value, label, id, className, type, placeholder, onChange }) => {
    return (
        <div className={`input ${className ? className : ""}`}>
            {label && <label className="input__label" htmlFor={id}>{label}</label>}
            <input
                className="input__field"
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};
