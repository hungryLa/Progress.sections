import './Title.scss'

export const Title = ({children, className}) => {
    return <h1 className={`title ${className ? className : ''}`}>{children}</h1>
}
