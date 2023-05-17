import './TextArea.scss'

export const TextArea = ({value, label, id, className, placeholder, onChange, bordered = false, error = null}) => {
    return (
        <div className={`textarea ${className ? className : ""} ${bordered ? 'textarea-bordered' : ''}`}>
            {label && <label className="input__label" htmlFor={id}>{label}</label>}
            <textarea
                className="textarea__field"
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                rows={6}
            ></textarea>
            {error && <small className={'textarea__error'}>{error}</small>}
        </div>
    );
}
