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
    useEffect(()=> {
        isActive ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
    }, [isActive])

    return (
        <div className={`menu ${isActive ? 'menu-active' : ''}`}>
            <Container>
                <div className={`menu__inner ${user === null ? 'menu__inner-wide' : ''}`}>
                    {user && (
                        <div>
                            <Title>Меню</Title>
                            {user?.role === 'admin' && <Navigation place={'menu'} navigationLinks={navigationLinks.mainAdmin}/>}
                            {user?.role === 'schools_owner' && <Navigation place={'menu'}  navigationLinks={navigationLinks.sectionAdmin}/>}
                            {user?.role === 'user' && <Navigation place={'menu'}  navigationLinks={navigationLinks.user}/>}
                            {user?.role === 'teacher' && <Navigation place={'menu'}  navigationLinks={navigationLinks.teacher}/>}
                        </div>
                    )}
                    <div>
                        <Title>Контакты</Title>
                    </div>
                </div>
            </Container>
        </div>
    )
}
