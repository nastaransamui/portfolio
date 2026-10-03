/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { src: 'img/projects/project-8.jpg', alt: 'Project interface screenshot 1' },
    { src: 'img/projects/project-7.jpg', alt: 'Project interface screenshot 2' },
    { src: 'img/projects/project-5.jpg', alt: 'Project interface screenshot 3' },
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
      <button
        type="button"
        className="carousel-control-prev"
        aria-label="Previous project image"
        onClick={() => {
          setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }}
      >
        <span className="fa fa-chevron-left carousel-controls" />
      </button>
      <button
        type="button"
        className="carousel-control-next"
        aria-label="Next project image"
        onClick={() => {
          setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }}
      >
        <span className="fa fa-chevron-right carousel-controls" />
      </button>
    </div>
  );
}

export default Slider;
