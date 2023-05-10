import {Container} from "../Container";
import {Title} from "../UI/Title";
import './Menu.scss';
import {useSelector} from "react-redux";
import {Navigation} from "../Navigation";
import {navigationLinks} from "../../helpers/navigationLinks";
import {useEffect} from "react";
import useAuthStore from "../../store/useAuthStore";

export const Menu = ({isActive}) => {
    const user = useAuthStore((state) => state.user)

    console.log(user)
    useEffect(() => {
        isActive ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
    }, [isActive])

    return (
        <div className={`menu ${isActive ? 'menu-active' : ''}`}>
            <Container>
                <div className={`menu__inner ${user === null ? 'menu__inner-wide' : ''}`}>
                    {user && (
                        <div className={'menu__navigation'}>
                            <Title>Меню</Title>
                            {user?.role === 'admin' &&
                                <Navigation place={'menu'} navigationLinks={navigationLinks.mainAdmin}/>}
                            {user?.role === 'schools_owner' &&
                                <Navigation place={'menu'} navigationLinks={navigationLinks.sectionAdmin}/>}
                            {user?.role === 'user' &&
                                <Navigation place={'menu'} navigationLinks={navigationLinks.user}/>}
                            {user?.role === 'teacher' &&
                                <Navigation place={'menu'} navigationLinks={navigationLinks.teacher}/>}
                        </div>
                    )}
                    <div className={'menu__contacts'}>
                        <Title>Контакты</Title>
                        <ul className={'menu__contacts__list'}>
                            <li className={'menu__contacts__item'}>
                                <a className={'menu__contacts__link'} href="mailto:info@circleschool.ru">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_0_1521)">
                                            <path
                                                d="M25 5H5C3.625 5 2.5125 6.125 2.5125 7.5L2.5 22.5C2.5 23.875 3.625 25 5 25H25C26.375 25 27.5 23.875 27.5 22.5V7.5C27.5 6.125 26.375 5 25 5ZM25 22.5H5V10L15 16.25L25 10V22.5ZM15 13.75L5 7.5H25L15 13.75Z"
                                                fill="currentColor"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_1521">
                                                <rect width="30" height="30" fill="currentColor"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>
                                        info@circleschool.ru
                                    </span>
                                </a>
                            </li>
                            <li className={'menu__contacts__item'}>
                                <a className={'menu__contacts__link'} href="tel:+79961234567">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_0_1530)">
                                            <path
                                                d="M25 19.375C23.4375 19.375 21.9375 19.125 20.5375 18.6625C20.1 18.525 19.6125 18.625 19.2625 18.9625L16.5125 21.7125C12.975 19.9125 10.075 17.025 8.275 13.475L11.025 10.7125C11.375 10.3875 11.475 9.9 11.3375 9.4625C10.875 8.0625 10.625 6.5625 10.625 5C10.625 4.3125 10.0625 3.75 9.375 3.75H5C4.3125 3.75 3.75 4.3125 3.75 5C3.75 16.7375 13.2625 26.25 25 26.25C25.6875 26.25 26.25 25.6875 26.25 25V20.625C26.25 19.9375 25.6875 19.375 25 19.375ZM23.75 15H26.25C26.25 8.7875 21.2125 3.75 15 3.75V6.25C19.8375 6.25 23.75 10.1625 23.75 15ZM18.75 15H21.25C21.25 11.55 18.45 8.75 15 8.75V11.25C17.075 11.25 18.75 12.925 18.75 15Z"
                                                fill="currentColor"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_1530">
                                                <rect width="30" height="30" fill="currentColor"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span>
                                        +7 (996) 123-45-67
                                    </span>
                                </a>
                            </li>
                            <li className="menu__contacts__item">
                                <a href="#" className="menu__contacts__link">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.9789 25.5057C11.7301 22.7399 6.72852 16.0366 6.72852 12.2714C6.72852 7.70318 10.4317 4 14.9999 4C19.5664 4 23.2713 7.70318 23.2713 12.2714C23.2713 16.0366 18.2309 22.7399 16.0209 25.5057C15.491 26.1648 14.5088 26.1648 13.9789 25.5057ZM14.9999 15.0285C16.5207 15.0285 17.7571 13.7921 17.7571 12.2714C17.7571 10.7507 16.5207 9.51427 14.9999 9.51427C13.4792 9.51427 12.2428 10.7507 12.2428 12.2714C12.2428 13.7921 13.4792 15.0285 14.9999 15.0285Z"
                                            fill="currentColor"/>
                                    </svg>
                                    <div>
                                        <span>ООО «ПРОГРЕСС +»</span>
                                        <span>450065, Республика Башкортостан,
                                            г. Уфа, ул. Карла Маркса, 3Б, офис 403
                                            по будням с 9:00 до 18:00</span>
                                        <span>ИНН 0273908137</span>
                                        <span>КПП 027701001</span>
                                        <span>ОГРН 1160280082896</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}
