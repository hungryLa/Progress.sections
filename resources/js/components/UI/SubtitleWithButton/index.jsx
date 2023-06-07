import { Subtitle } from "../Subtitle";
import { Button } from "../Button";
import './SubtitleWithButton.scss'

export const SubtitleWithButton = ({ title, buttonText, onClick }) => {
    return (
        <div className="subtitle-with-button">
            <Subtitle>{title}</Subtitle>
            <Button variant={"blue"} onClick={onClick}>
                {buttonText}
            </Button>
        </div>
    );
};
