import './Select.scss'

export const Select = ({id, className, children, label, error, value, onChange, bordered = false}) => {
    return (
        <div className={`select ${className ? className : ''} ${bordered ? 'select-bordered' : ''}`}>
            {label && <label className="select__label" htmlFor={id}>{label}</label>}
            <select className={'select__field'} id={id} value={value} onChange={onChange} multiple={multiple}>
                {children}
            </select>
            {error && <small className={'select__error'}>{error}</small>}
        </div>
    )
}
