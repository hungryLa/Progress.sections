import {NavLink, useLocation, useNavigate} from "react-router-dom";
import useMenuStore from "../../store/useMenuStore";
import useAuthStore from "../../store/useAuthStore";

import './Navigation.scss'
import useContentStore from "../../store/useContentStore";
import {useEffect} from "react";

export const Navigation = ({navigationLinks, place, isAuthenticated = true}) => {
    const navigate = useNavigate()
    const closeMenu = useMenuStore(({closeMenu}) => closeMenu)
    const user = useAuthStore(({user}) => user)
    const logout = useAuthStore(({logout}) => logout)

    const logoutHandler = async () => {
        await logout()
        closeMenu()
        navigate('/', {replace: true})
    }

    const clearTitle = useContentStore(({clearTitle}) => clearTitle)
    const clearImage = useContentStore(({clearImage}) => clearImage)
    const location = useLocation()

    useEffect(() => {
        console.log(location)
        clearTitle()
        clearImage()
    }, [location])

    return (
        <nav className={`navigation ${place ? 'navigation-' + place : ''} ${!user ? 'navigation-unauth' : ''}`}>
            <ul className={'navigation__list'}>
                {navigationLinks.map(link => (
                        <li className={'navigation__item'} key={link.title}>
                            <NavLink className={'navigation__item-link'} to={link.path}>
                                <svg className={'navigation__item-image'} width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 8.88878C4 7.53861 5.09427 6.44434 6.44444 6.44434H23.5556C24.9038 6.44434 26 7.53861 26 8.88878V21.111C26 22.4593 24.9038 23.5554 23.5556 23.5554H6.44444C5.09427 23.5554 4 22.4593 4 21.111V8.88878ZM10.1111 14.9999C10.1111 14.3238 9.56493 13.7777 8.88889 13.7777C8.21285 13.7777 7.66667 14.3238 7.66667 14.9999C7.66667 15.6759 8.21285 16.2221 8.88889 16.2221C9.56493 16.2221 10.1111 15.6759 10.1111 14.9999ZM10.1111 11.3332C10.1111 10.6572 9.56493 10.111 8.88889 10.111C8.21285 10.111 7.66667 10.6572 7.66667 11.3332C7.66667 12.0093 8.21285 12.5554 8.88889 12.5554C9.56493 12.5554 10.1111 12.0093 10.1111 11.3332ZM10.1111 18.6666C10.1111 17.9905 9.56493 17.4443 8.88889 17.4443C8.21285 17.4443 7.66667 17.9905 7.66667 18.6666C7.66667 19.3426 8.21285 19.8888 8.88889 19.8888C9.56493 19.8888 10.1111 19.3426 10.1111 18.6666ZM12.5556 10.4166C12.0476 10.4166 11.6389 10.8252 11.6389 11.3332C11.6389 11.8412 12.0476 12.2499 12.5556 12.2499H21.1111C21.6191 12.2499 22.0278 11.8412 22.0278 11.3332C22.0278 10.8252 21.6191 10.4166 21.1111 10.4166H12.5556ZM12.5556 14.0832C12.0476 14.0832 11.6389 14.4919 11.6389 14.9999C11.6389 15.5079 12.0476 15.9166 12.5556 15.9166H21.1111C21.6191 15.9166 22.0278 15.5079 22.0278 14.9999C22.0278 14.4919 21.6191 14.0832 21.1111 14.0832H12.5556ZM12.5556 17.7499C12.0476 17.7499 11.6389 18.1586 11.6389 18.6666C11.6389 19.1745 12.0476 19.5832 12.5556 19.5832H21.1111C21.6191 19.5832 22.0278 19.1745 22.0278 18.6666C22.0278 18.1586 21.6191 17.7499 21.1111 17.7499H12.5556Z"
                                          fill="currentColor"/>
                                </svg>
                                <span>{link.title}</span>
                            </NavLink>
                        </li>
                    )
                )}
                {isAuthenticated && (
                    <li className={'navigation__item'}>
                        <button className={'navigation__item-link'} onClick={() => logoutHandler()}>
                            <svg className={'navigation__item-image'} width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8.88878C4 7.53861 5.09427 6.44434 6.44444 6.44434H23.5556C24.9038 6.44434 26 7.53861 26 8.88878V21.111C26 22.4593 24.9038 23.5554 23.5556 23.5554H6.44444C5.09427 23.5554 4 22.4593 4 21.111V8.88878ZM10.1111 14.9999C10.1111 14.3238 9.56493 13.7777 8.88889 13.7777C8.21285 13.7777 7.66667 14.3238 7.66667 14.9999C7.66667 15.6759 8.21285 16.2221 8.88889 16.2221C9.56493 16.2221 10.1111 15.6759 10.1111 14.9999ZM10.1111 11.3332C10.1111 10.6572 9.56493 10.111 8.88889 10.111C8.21285 10.111 7.66667 10.6572 7.66667 11.3332C7.66667 12.0093 8.21285 12.5554 8.88889 12.5554C9.56493 12.5554 10.1111 12.0093 10.1111 11.3332ZM10.1111 18.6666C10.1111 17.9905 9.56493 17.4443 8.88889 17.4443C8.21285 17.4443 7.66667 17.9905 7.66667 18.6666C7.66667 19.3426 8.21285 19.8888 8.88889 19.8888C9.56493 19.8888 10.1111 19.3426 10.1111 18.6666ZM12.5556 10.4166C12.0476 10.4166 11.6389 10.8252 11.6389 11.3332C11.6389 11.8412 12.0476 12.2499 12.5556 12.2499H21.1111C21.6191 12.2499 22.0278 11.8412 22.0278 11.3332C22.0278 10.8252 21.6191 10.4166 21.1111 10.4166H12.5556ZM12.5556 14.0832C12.0476 14.0832 11.6389 14.4919 11.6389 14.9999C11.6389 15.5079 12.0476 15.9166 12.5556 15.9166H21.1111C21.6191 15.9166 22.0278 15.5079 22.0278 14.9999C22.0278 14.4919 21.6191 14.0832 21.1111 14.0832H12.5556ZM12.5556 17.7499C12.0476 17.7499 11.6389 18.1586 11.6389 18.6666C11.6389 19.1745 12.0476 19.5832 12.5556 19.5832H21.1111C21.6191 19.5832 22.0278 19.1745 22.0278 18.6666C22.0278 18.1586 21.6191 17.7499 21.1111 17.7499H12.5556Z"
                                      fill="currentColor"/>
                            </svg>
                            <span>Выйти</span>
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}
