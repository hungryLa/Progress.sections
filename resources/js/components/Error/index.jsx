import './Error.scss'
import {useEffect} from "react";

export const Error = ({errors}) => {
    useEffect(() => {console.log(Array.isArray(errors))}, [])
    return (
        <ul className={'error__list'}>
            {Array.isArray(errors) && errors.map((error, index) => (
                <li key={index} className={'error__item'}>{error}</li>
            ))}
        </ul>
    )
}
