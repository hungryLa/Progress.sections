import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import localStorage from "redux-persist/es/storage";
import useMenuStore from "../../store/useMenuStore";
import useAuthStore from "../../store/useAuthStore";

export const Navigation = ({navigationLinks, place}) => {
    const navigate = useNavigate()
    const closeMenu = useMenuStore(({closeMenu}) => closeMenu)
    const logout = useAuthStore(({logout}) => logout)

    const logoutHandler = async () => {
        await logout()
        closeMenu()
        navigate('/', {replace: true})
    }

    return (
        <nav className={`navigation ${place ? 'navigation' + place : ''}`}>
            <ul>
                {navigationLinks.map(link => (
                        <li key={link.title}>
                            <NavLink to={link.path}>{link.title}</NavLink>
                        </li>
                    )
                )}
                <li>
                    <button onClick={() => logoutHandler()}>Выйти</button>
                </li>
            </ul>
        </nav>
    )
}
