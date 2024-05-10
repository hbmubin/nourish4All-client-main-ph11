import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="hero min-h-[70vh]"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/Yptj7JJ/food-donation-00bd0c5f6d864b6780f8bb8f5491167e.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Help Us Fight Hunger
                </h1>
                <p className="mb-5">
                  Together, we can make a difference by providing meals to those
                  in need. Every contribution counts towards ensuring that no
                  one goes to bed hungry.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-[70vh]"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/881vLWq/how-to-donate-food-in-emergency-2.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Join Our Food Donation Drive
                </h1>
                <p className="mb-5">
                  Your support enables us to distribute nutritious meals to
                  families and individuals facing food insecurity. Let's work
                  together to create a hunger-free community.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-[70vh]"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/0MnbxtT/images-q-tbn-ANd9-Gc-R7an-SFn-Kib2njaav9-BLSk-CKr-XKVH8a9s-Ly-UA-usqp-CAU.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Together, Let's End Hunger
                </h1>
                <p className="mb-5">
                  By donating to our cause, you are supporting efforts to
                  eradicate hunger and provide essential food supplies to those
                  who need it most. Make a difference today.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
