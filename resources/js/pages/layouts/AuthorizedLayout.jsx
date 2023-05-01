import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../../components/Sidebar";
import {Container} from "../../components/Container";
import {useSelector} from "react-redux";
import {Menu} from "../../components/Menu";

export const AuthorizedLayout = () => {
    const isActive = useSelector((state) => state.menu.isActive)
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
