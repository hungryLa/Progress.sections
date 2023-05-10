import "./Button.scss";

export const Button = ({ className, onClick, type, children, variant }) => {
    return (
        <button
            className={`button ${className && className} button-${
                variant ? variant : ""
            }`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};
