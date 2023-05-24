import {Container} from "../Container";
import './Footer.scss';
import {NavLink} from "react-router-dom";

export const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className="footer__inner">
                    <NavLink to={'/'} className={'footer__logo'}>
                        <img src="/images/progress.svg" alt="Progress logo image"/>
                        <span>EDU.PROGRESS © 2012 - 2023</span>
                    </NavLink>
                    <NavLink to={'/'}></NavLink>
                </div>
            </Container>
        </footer>
    )
}
