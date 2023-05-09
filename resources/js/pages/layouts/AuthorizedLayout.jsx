import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../../components/Sidebar";
import {Container} from "../../components/Container";
import {Menu} from "../../components/Menu";
import useMenuStore from "../../store/useMenuStore";

export const AuthorizedLayout = () => {
    const isActive = useMenuStore((state) => state.menuActive)
    return (
        <div className='page'>
            <Header />
            <section className='content'>
                <Container>
                    <Sidebar />
                    <main>
                        <Outlet />
                    </main>
                </Container>
                <Menu isActive={isActive} />
            </section>
            <Footer />
        </div>
    )
}
