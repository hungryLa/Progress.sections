import './Title.scss'

export const Title = ({children, className}) => {
    return <h1 className={`title ${className}`}>{children}</h1>
}
