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
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

export const AuthorizedLayout = () => {
    const isMenuActive = useMenuStore(store => store.isMenuActive)
    const pageImages = useContentStore(store => store.pageImages)
    const pageTitle = useContentStore(store => store.pageTitle)

    return (
        <div className='page page-authenticated'>
            <Header/>
            <section className='content'>
                <Container>
                    {/*{pageImages ? <img className={'content__image'} src={pageImages} alt=""/> : ''}*/}
                    {pageImages ? (
                        <Swiper
                            className={'layout-swiper'}
                            modules={[Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            speed={500}
                            loop={true}
                            touchRatio={1.5}
                            effect={'slide'}
                            pagination={{clickable: true}}>
                            {pageImages.map((image, index) => (
                                <SwiperSlide key={image} className={'layout-swiper__slide'}>
                                    <img src={image} alt={`Image ${index}`}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : ''}
                    <Title className={'content__title'}>{pageTitle}</Title>
                    <div className="content__inner">
                        <Sidebar/>
                        <main>
                            <Outlet/>
                        </main>
                    </div>
                </Container>
                <Menu isActive={isMenuActive}/>
            </section>
            <Footer/>
        </div>
    )
}
