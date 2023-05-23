import './Input.scss'

export const Input = ({ value, label, id, className, type, placeholder, onChange, bordered = false, error = null, multiple = false}) => {
    return (
        <div className={`input ${className ? className : ""} ${bordered ? 'input-bordered' : ''}`}>
            {label && <label className="input__label" htmlFor={id}>{label}</label>}
            <input
                className="input__field"
                type={type}
                id={id}
                value={value || ''}
                placeholder={placeholder}
                onChange={onChange}
                multiple={multiple}
            />
            {error && <small className={'input__error'}>{error}</small>}
        </div>
    );
};
