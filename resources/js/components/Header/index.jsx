import {NavLink} from "react-router-dom";
import './Header.scss';
import {Container} from "../Container";
import {useEffect, useState} from "react";
import useMenuStore from "../../store/useMenuStore";

export const Header = () => {
    const [isSticky, setIsSticky] = useState(false)

    const toggleMenu = useMenuStore(state => state.toggleMenu)

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
                    <div className="header__info">
                        <a className="header__number" href={'tel:+79961234567'}>+7 (996) 123-45-67</a>
                        <button className="header__burger" onClick={() => toggleMenu()}>x</button>
                    </div>
                </div>
            </Container>
        </header>
    )
}
