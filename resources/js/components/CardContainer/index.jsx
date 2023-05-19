import './CardContainer.scss'
import {Button} from "../UI/Button";

export const CardContainer = ({children, title, buttonFunction, buttonTitle}) => {
    return (
        <div className={'card-container'}>
            {title || (buttonFunction && buttonTitle) ? (
                <div className="card-container__head">
                    {title && <h4>{title}</h4>}
                    {buttonFunction &&
                        <Button
                            type={'button'}
                            variant={'blue'}
                            onClick={buttonFunction}
                        >{buttonTitle}</Button>}
                </div>
            ) : ''}
            <div className="card-container__body">
                {children}
            </div>
        </div>
    )
}
