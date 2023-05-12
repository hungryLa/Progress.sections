import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../../components/Sidebar";
import {Container} from "../../components/Container";
import {useSelector} from "react-redux";
import {Menu} from "../../components/Menu";
import useMenuStore from "../../store/useMenuStore";
import {Title} from "../../components/UI/Title";

export const AuthorizedLayout = () => {
    const isMenuActive = useMenuStore(store => store.isMenuActive)
    return (
        <div className='page page-authenticated'>
            <Header />
            <section className='content'>
                <Container>
                    <Title className={'content__title'}>Личный кабинет</Title>
                    <div className="content__inner">
                        <Sidebar />
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </Container>
                <Menu isActive={isMenuActive} />
            </section>
            <Footer />
        </div>
    )
}
