import './CardContainer.scss'

export const CardContainer = ({children}) => {
    return (
        <div className={'card-container'}>
            {children}
        </div>
    )
}
