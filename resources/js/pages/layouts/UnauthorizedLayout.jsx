import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Menu} from "../../components/Menu";
import useMenuStore from "../../store/useMenuStore";

export const UnauthorizedLayout = () => {
    const isMenuActive = useMenuStore(state => state.isMenuActive)

    return (
        <div className='page page-guest'>
            <Header/>
            <section className='content'>
                <Outlet/>
                <Menu isActive={isMenuActive} />
            </section>
            <Footer/>
        </div>
    )
}
