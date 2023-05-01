import {NavLink} from "react-router-dom";
import './Header.scss';
import {Container} from "../Container";
import {useEffect, useState} from "react";
import {Menu} from "../Menu";
import {useDispatch} from "react-redux";
import {changeToAdmin, changeToGuest, changeToSectionAdmin} from "../../store/userSlice";
import {toggleMenu} from "../../store/menuSlice";

export const Header = () => {
    const [isSticky, setIsSticky] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
       const handleScroll = () => {
           const currentPosition = window.scrollY;
           currentPosition > 0 ? setIsSticky(true) : setIsSticky(false);
       };

       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <header className={`header ${isSticky ? 'sticky' : ''}`}>
            <Container>
                <div className="header__inner">
                    <NavLink to={'/'} className={'header__logo'}>
                        <img src="/images/progress.svg" alt="Progress logo image"/>
                        <span>EDU.PROGRESS</span>
                    </NavLink>
                    <div>
                        <button onClick={() => dispatch(changeToGuest())}>Guest</button>
                        <button onClick={() => dispatch(changeToAdmin())}>Admin</button>
                        <button onClick={() => dispatch(changeToSectionAdmin())}>Section Admin</button>
                    </div>
                    <div className="header__info">
                        <a className="header__number" href={'tel:+79961234567'}>+7 (996) 123-45-67</a>
                        <button className="header__burger" onClick={() => dispatch(toggleMenu())}>x</button>
                    </div>
                </div>
            </Container>
        </header>
    )
}