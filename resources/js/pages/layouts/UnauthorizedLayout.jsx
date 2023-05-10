import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Container} from "../../components/Container";
import {Menu} from "../../components/Menu";
import {useSelector} from "react-redux";
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
