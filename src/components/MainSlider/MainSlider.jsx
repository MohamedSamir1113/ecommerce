import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import blog1 from "../../assets/images/blog-img-1.jpeg";
import blog2 from "../../assets/images/grocery-banner-2.jpeg";

import Slider from "react-slick";
function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <div className="container mb-5 mt-3">
      <div className="row gx-0">
        <div className="col-md-9 col-12">
          <Slider {...settings}>
            <img height={400} src={img1} className="w-100" alt="img1" />
            <img height={400} src={img2} className="w-100" alt="img2" />
            <img height={400} src={img3} className="w-100" alt="img3" />
          </Slider>
        </div>
        <div className="col-md-3 d-none d-md-block">
            <img height={200} className="w-100" src={blog1} alt="" />
            <img height={200} className="w-100" src={blog2} alt="" />
        </div>
      </div>
    </div>
  );
}

export default MainSlider;
