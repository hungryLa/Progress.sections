import './Select.scss'

export const Select = ({id, className, children, label, error, value, onChange, multiple = false, bordered = false}) => {
    return (
        <div className={`select ${className ? className : ''} ${bordered ? 'select-bordered' : ''}`}>
            {label && <label className="select__label" htmlFor={id}>{label}</label>}
            <div className={`select__wrapper ${multiple ? 'select__wrapper-no-arrow' : ''}`}>
                <select className={'select__field'} id={id} value={value || ''} onChange={onChange} multiple={multiple}>
                    {children}
                </select>
            </div>
            {error && <small className={'select__error'}>{error}</small>}
        </div>
    )
}
