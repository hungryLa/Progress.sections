import {useEffect} from "react";
import {Navigation} from "../Navigation";
import {navigationLinks} from "../../helpers/navigationLinks";
import './Sidebar.scss';
import useAuthStore from "../../store/useAuthStore";


export const Sidebar = () => {
    const user = useAuthStore(({user}) => user)

    useEffect(() => {
        console.log(user)
    })

    return (
        <aside className={'sidebar'}>
            {user?.role === 'admin' && <Navigation navigationLinks={navigationLinks.mainAdmin}/>}
            {user?.role === 'schools_owner' && <Navigation navigationLinks={navigationLinks.sectionAdmin}/>}
            {user?.role === 'user' && <Navigation navigationLinks={navigationLinks.user}/>}
            {user?.role === 'teacher' && <Navigation navigationLinks={navigationLinks.teacher}/>}
        </aside>
    )
}
