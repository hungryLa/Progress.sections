import "./Button.scss";

export const Button = ({ className, onClick, type, children, variant }) => {
    return (
        <button
            className={`button ${className && className} ${variant ? 'button-' + variant : ""}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};
