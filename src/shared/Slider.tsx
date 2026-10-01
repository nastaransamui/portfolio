/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { src: 'img/projects/project-8.jpg', alt: 'slide 1' },
    { src: 'img/projects/project-7.jpg', alt: 'slide 2' },
    { src: 'img/projects/project-5.jpg', alt: 'slide 3' },
  ];

  return (
    <div id="slider" className="carousel slide portfolio-slider" data-ride="carousel">
      <div className="carousel-inner">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`carousel-item ${activeSlide === idx ? 'active' : ''}`}
            style={{ display: activeSlide === idx ? 'block' : 'none' }}
          >
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#slider"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }}
      >
        <span className="fa fa-chevron-left carousel-controls" />
      </a>
      <a
        className="carousel-control-next"
        href="#slider"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }}
      >
        <span className="fa fa-chevron-right carousel-controls" />
      </a>
    </div>
  );
}

export default Slider;
