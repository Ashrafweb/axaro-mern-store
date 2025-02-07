import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerOne from "../../assets/banner-1.jpg";
import bannerTwo from "../../assets/banner-2.jpg";
import bannerThree from "../../assets/banner-3.jpg";
import bannerFive from "../../assets/banner-5.jpg";
import Message from "../../components/Message"; // Assuming this is your message component
import Loader from "../../components/Loader";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1, // Keep it at 1 for larger screens too
        },
      },
      {
        breakpoint: 768, // Adjust breakpoint as needed
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className='product-carousel container mx-auto p-4'>
      {" "}
      {/* Added container and padding */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        {" "}
        {/* Use grid for layout */}
        {/* Banner Section (Bento Grid) */}
        <div className='lg:col-span-3 flex flex-col gap-4'>
          <img
            src={bannerOne}
            alt='Banner 1'
            className='w-full h-auto object-cover rounded-md'
            loading='lazy'
            style={{ maxHeight: "20rem" }}
          />
          <img
            src={bannerTwo}
            alt='Banner 2'
            className='w-full h-auto object-cover rounded-md'
            loading='lazy'
            style={{ maxHeight: "20rem" }}
          />
        </div>
        <div className='lg:col-span-3 flex flex-col gap-4'>
          <img
            src={bannerThree}
            alt='Banner 3'
            className='w-full h-auto object-cover rounded-md'
            loading='lazy'
            style={{ maxHeight: "20rem" }}
          />
          <img
            src={bannerFive}
            alt='Banner 5'
            className='w-full h-auto object-cover rounded-md'
            loading='lazy'
            style={{ maxHeight: "20rem" }}
          />
        </div>
        {/* Product Carousel */}
        <div className='lg:col-span-6'>
          <div className='home-carousel relative rounded-lg shadow-lg overflow-hidden'>
            {isLoading ? (
              <div className='text-center py-4'>
                {" "}
                <Loader />
              </div>
            ) : error ? (
              <Message variant='danger'>
                {error?.data?.message || error.error}
              </Message>
            ) : products ? (
              <Slider {...settings} className='carousel-slider'>
                {products.map(({ image, _id, name }) => (
                  <div key={_id}>
                    <img
                      src={image}
                      alt={name}
                      className='w-full h-auto object-contain rounded-md' // Rounded corners
                      style={{ maxHeight: "30rem" }}
                      loading='lazy'
                    />
                  </div>
                ))}
              </Slider>
            ) : null}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
