import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300, // 300 seconds = 300,000 milliseconds
    responsive: [
      {
        breakpoint: 1024,//the point at which the layout of a web page changes to accommodate the different screen size.
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const images = [
    'https://marketplace.canva.com/EAE_sV2u6-0/1/0/1131w/canva-black-and-white-modern-magician-mystery-movie-poster-15G2JYI_Mbo.jpg',

    'https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg',
    'https://marketplace.canva.com/EAFCdhQWOyk/1/0/1131w/canva-grey-black-simple-darkness-documentary-movie-poster-a0nRx2-3Ib4.jpg',
    'https://marketplace.canva.com/EAF6rXn3p44/1/0/1131w/canva-white-and-blue-planets-picture-poster-ee1qFKNlw-Q.jpg',
    'https://marketplace.canva.com/EAFpwUz1kDY/1/0/1131w/canva-black-and-red-modern-horror-movie-poster-LENoCXzWQw4.jpg',
    'https://marketplace.canva.com/EAFUGx45UNM/1/0/1131w/canva-blue-and-black-fantasy-movie-poster-7gz5VggFlBU.jpg',
    'https://marketplace.canva.com/EAFUo9zqasY/1/0/1131w/canva-brown-mystery-movie-poster-0OZ8QXub3I8.jpg',
    'https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg',
    
  ];

  return (
    <div>
      <h2>Latest Movies</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;

