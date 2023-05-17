import './TableRow.scss'

export const TableRow = ({children, head}) => {
    return (
        <div className={`table__row ${head ? 'table__row-head' : ''}`}>{children}</div>
    )
}
