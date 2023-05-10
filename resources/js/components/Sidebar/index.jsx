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
            {user?.role === 'admin' && <Navigation place={'sidebar'} navigationLinks={navigationLinks.mainAdmin}/>}
            {user?.role === 'schools_owner' && <Navigation place={'sidebar'} navigationLinks={navigationLinks.sectionAdmin}/>}
            {user?.role === 'user' && <Navigation place={'sidebar'} navigationLinks={navigationLinks.user}/>}
            {user?.role === 'teacher' && <Navigation place={'sidebar'} navigationLinks={navigationLinks.teacher}/>}
        </aside>
    )
}
