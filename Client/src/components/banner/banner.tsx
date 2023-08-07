import React from 'react';
import Slider from 'react-slick';
import './banner.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://permia-store-demo.myshopify.com/cdn/shop/files/slideshowV2-bg1.jpg?v=1675500796',
  'https://permia-store-demo.myshopify.com/cdn/shop/files/slideshowV2-bg2.jpg?v=1675500796',
  'https://keva-store-demo.myshopify.com/cdn/shop/files/bn2.1.png?v=1631085133'
];

const showNowTexts = ['Perfume Collection', 'Oriflame Perfume', 'Grace Elegant'];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className='banner'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className='image-container'>
              <div className="banner-img">
              <img src={image} alt={`Image ${index + 1}`} />

              </div>
              <div className="text-container">
              <h3>Style Destination</h3>
                <h1>{showNowTexts[index]}</h1>
              
                <h3>We always bring the best products</h3>
              <button className='show-now-button'>SHOW NOW</button>

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;