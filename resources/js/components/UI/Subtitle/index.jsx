import './Subtitle.scss'

export const Subtitle = ({children, className}) => {
    return <h2 className={`subtitle ${className ? className : ''}`}>{children}</h2>
}
