import {Container} from "../Container";
import './Menu.scss';

export const Menu = ({isActive}) => {
    return (
        <div className={`menu ${isActive ? 'menu-active' : ''}`}>
            <Container>
                <div className="menu__inner">
                    Menu
                </div>
            </Container>
        </div>
    )
}
