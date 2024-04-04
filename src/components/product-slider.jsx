import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProductSlider({ images }) {
  return (
    <div className="relative bg-gray-100">
      <Swiper
        modules={[Navigation]}
        loop={true}
        navigation={{
          lockClasses: true,
          enabled: true,
        }}
      >
        {images?.map((image) => (
          <SwiperSlide
            key={image}
            className="flex justify-center items-center aspect-video"
          >
            <InnerImageZoom
              hasSpacer
              zoomScale={2}
              src={image}
              zoomType={"hover"}
              className="absolute top-0 left-0 w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
