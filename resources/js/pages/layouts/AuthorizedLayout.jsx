import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {Outlet, useLocation} from "react-router-dom";
import {Sidebar} from "../../components/Sidebar";
import {Container} from "../../components/Container";
import {Menu} from "../../components/Menu";
import useMenuStore from "../../store/useMenuStore";
import {Title} from "../../components/UI/Title";
import useContentStore from "../../store/useContentStore";
import {useEffect} from "react";

export const AuthorizedLayout = () => {
    const isMenuActive = useMenuStore(store => store.isMenuActive)
    const pageImage = useContentStore(store => store.pageImage)
    const pageTitle = useContentStore(store => store.pageTitle)

    return (
        <div className='page page-authenticated'>
            <Header />
            <section className='content'>
                <Container>
                    {pageImage ? <img className={'content__image'} src={pageImage} alt=""/> : ''}
                    <Title className={'content__title'}>{pageTitle}</Title>
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
