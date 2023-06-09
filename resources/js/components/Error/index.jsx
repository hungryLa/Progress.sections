import './Error.scss'

export const Error = ({errors}) => {
    return (
        <ul className={'error__list'}>
            {Array.isArray(errors) && errors.map((error, index) => (
                <li key={index} className={'error__item'}>{error}</li>
            ))}
        </ul>
    )
}
