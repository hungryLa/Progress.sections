<div class="row justify-content-center">
    <div class="col gallery mt-3">
        {{--            Если не будет работать убрать--}}
        <div class="row swiper swiper-slider">
            <div class="swiper-wrapper">
                @foreach($images as $image)
                    <img class="swiper-slide" src="{{asset("storage/".$image->path)}}" alt="Swiper">
                @endforeach
            </div>
            <span class="swiper-pagination"></span>
            <span class="swiper-button-prev"></span>
            <span class="swiper-button-next"></span>
        </div>
    </div>
</div>

<style>
    .gallery {
        /*padding: 0 calc(100% / 16);*/
    }
    .swiper {
        width: 100%;
        height: auto;
        max-height: 675px;
        max-width: 1200px;
        /*min-width: 234px;*/
        min-height: 117px;
        aspect-ratio: 16/9;
    }

    .swiper-wrapper {
        padding: 0;
        height: 100%;
    }

    .swiper-slide {
        width: 100%;
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .gallery-title {
        color: rgb(136, 191, 114);
        @if(Request::route()->getName() === 'website.aboutFund')
              color: #ec1b24;
    @endif
}

    .swiper-button-next, .swiper-button-prev {
        color: rgb(136, 191, 114);
        @if(Request::route()->getName() === 'website.aboutFund')
              color: #ec1b24;
    @endif
}

    .swiper-pagination-bullet-active {
        background: rgb(136, 191, 114);
        @if(Request::route()->getName() === 'website.aboutFund')
              background: #ec1b24;
    @endif
}

    @media screen and (max-width: 1520px) {
        .gallery {
            padding: 0 60px;
        }
    }

    @media screen and (max-width: 991px) {
        .gallery {
            padding: 0;
        }
    }

    @media screen and (max-width: 860px) {
        .gallery {
            padding: 0 20px;
        }
    }

    @media screen and (max-width: 769px) {
        .gallery {
            padding: 0 40px;
        }
    }
</style>

<script>
    const swiper = new Swiper(".swiper-slider", {
        // Optional parameters
        // centeredSlides: true,
        grabCursor: true,
        freeMode: false,
        loop: true,
        mousewheel: false,
        keyboard: {
            enabled: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: false,
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        slidesPerView: '1',
    });

</script>
