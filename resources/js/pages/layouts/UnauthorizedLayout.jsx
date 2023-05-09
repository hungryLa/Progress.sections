import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Container} from "../../components/Container";
import {Menu} from "../../components/Menu";
import useMenuStore from "../../store/useMenuStore";

export const UnauthorizedLayout = () => {
    const menuActive = useMenuStore((state) => state.menuActive)

    return (
        <div className='page page-guest'>
            <Header/>
            <section className='content'>
                <Outlet/>
                <Menu isActive={menuActive} />
            </section>
            <Footer/>
        </div>
    )
}
