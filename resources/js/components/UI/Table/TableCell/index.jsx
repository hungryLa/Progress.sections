import './TableCell.scss'

export const TableCell = ({children, style}) => {
    return (
        <div style={style} className={'table__cell'}>{children}</div>
    )
}
