import './Modal.scss';

export const Modal = ({isActive, children, className}) => {
    return (
        <div className={`modal ${className ? className : ''} ${isActive ? 'modal-active' : ''}`}>
            <div className="modal__inner">
                {children}
            </div>
        </div>
    )
}
