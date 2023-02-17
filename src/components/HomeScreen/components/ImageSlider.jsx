import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function ImageBanner({ banners }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {banners?.map((banner) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            background: "#000",
          }}>
          <img
            style={{ objectFit: "contain", width: "100%", height: "100vh" }}
            height={"100%"}
            width='100%'
            src={banner.url}
          />
        </div>
      ))}
    </Slider>
  );
}

export default ImageBanner;
