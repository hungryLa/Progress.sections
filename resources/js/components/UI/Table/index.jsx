import './Table.scss'

export const Table = ({children, className}) => {
    return (
        <div className={'table-responsive'}>
            <div className={`table ${className ? className : ''}`}>
                {children}
            </div>
        </div>
    )
}
