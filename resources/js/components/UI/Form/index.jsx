import './Form.scss'

export const Form = ({onSubmit, className, inputs, buttons}) => {
    return (
        <form className={`form ${className}`} onSubmit={onSubmit}>
            <div className="form__inputs">
                {inputs}
            </div>
            <div className="form__buttons">
                {buttons}
            </div>
        </form>
    )
}
