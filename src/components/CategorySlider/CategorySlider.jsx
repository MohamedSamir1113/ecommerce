import { useQuery } from "react-query";

import Slider from "react-slick";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "green" ,backgroundColor:"gray"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "green" ,backgroundColor:"gray"}}
      onClick={onClick}
    />
  );
}
function CategorySlider() {
  async function getCategories() {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    const data = await res.json();
    return data;
  }
  const { data } = useQuery("categories", getCategories);
  
  //   const settings = {
  //     dots: true,
  //     dotsClass: "slick-dots slick-thumb",
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 7,
  //     slidesToScroll: 1,
  // };

  var settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    speed: 500,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {data?.data.map((item) => (
          <div key={item._id}>
            <img
              src={item.image}
              height="300px"
              className="w-100"
              alt={item.name}
            />
            <p className="text-center">{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
