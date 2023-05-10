
import './Table.scss'

export const Table = ({children ,className}) => {
    return (
        <div className={`table ${className ? className : ''}`}>
            {children}
        </div>
    )
}