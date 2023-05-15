import './Checkbox.scss'

export const Checkbox = ({id, value, onChange, label}) => {
    return (
        <div className={'checkbox'}>
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
