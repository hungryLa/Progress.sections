import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Container} from "../../components/Container";
import {Menu} from "../../components/Menu";
import {useSelector} from "react-redux";

export const UnauthorizedLayout = () => {
    const isActive = useSelector((state) => state.menu.isActive)

    return (
        <div className='page page-guest'>
            <Header/>
            <section className='content'>
                <Outlet/>
                <Menu isActive={isActive} />
            </section>
            <Footer/>
        </div>
    )
}
