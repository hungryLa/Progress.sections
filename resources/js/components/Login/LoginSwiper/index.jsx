import {Autoplay, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import './LoginSwiper.scss'

const swiperItems = [
    {
        title: 'Интеллектуальные секции',
        text: 'Каталог кружков, секций и курсов для детей и подростков.',
        img: '/images/swiper-1.svg',
    },
    {
        title: 'Спортивные секции',
        text: 'Каталог кружков, секций и курсов для детей и подростков.',
        img: '/images/swiper-2.svg',
    },
    {
        title: 'Творческие секции',
        text: 'Каталог кружков, секций и курсов для детей и подростков.',
        img: '/images/swiper-3.svg',
    },
]

export const LoginSwiper = () => {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            speed={500}
            loop={true}
            touchRatio={1.5}
            effect={'slide'}
            pagination={{clickable: true}}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false
            // }}
            className={'login__swiper'}
        >
            {swiperItems.map(item => (
                <SwiperSlide key={item.title} className={'login__slide'}>
                    <img src={item.img} alt={item.title}/>
                    <h5>{item.title}</h5>
                    <p>{item.text}</p>
                </SwiperSlide>))}
        </Swiper>
    )
}
