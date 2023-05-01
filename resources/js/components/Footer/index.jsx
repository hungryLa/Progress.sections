import {Container} from "../Container";
import './Footer.scss';
import {NavLink} from "react-router-dom";

export const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className="footer__inner">
                    <NavLink to={'/'}>EDU.PROGRESS © 2012 - 2023</NavLink>
                </div>
            </Container>
        </footer>
    )
}
