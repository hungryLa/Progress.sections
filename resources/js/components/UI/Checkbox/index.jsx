import './Checkbox.scss'

export const Checkbox = ({id, value, onChange, label, image = false}) => {
    return (
        <div className={`checkbox ${image ? 'checkbox-with-image' : ''}`}>
            <input
                type={"checkbox"}
                id={id}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}
