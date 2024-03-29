import { ARROW_ICON } from '@/lib/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const BannerView = ({ section, sectionData, mappingIndex }) => {
  const sliderRef = React.useRef(null);
  const arrowLeft = React.useRef(null);
  const arrowRight = React.useRef(null);
  const handleScrollListener = () => {
    if (sliderRef.current?.scrollLeft === 0 && arrowLeft.current) arrowLeft.current.style.display = 'none';
    else {
      if (arrowLeft.current) arrowLeft.current.style.display = 'block';
    };

    if (sliderRef.current && ((sliderRef.current.scrollLeft + sliderRef.current.clientWidth) >= (sliderRef.current.scrollWidth - 100))) arrowRight.current.style.display = 'none';
    else {
      if (arrowRight.current) arrowRight.current.style.display = 'block';
    }
  };

  React.useEffect(() => {
    handleScrollListener();
    if (sliderRef.current) sliderRef.current.addEventListener('scroll', handleScrollListener);
    return () => {
      if (sliderRef.current) sliderRef.current.removeEventListener('scroll', handleScrollListener);
    }
  }, []);

  const handleScrollLeft = () => {
    const leftPosition = sliderRef.current.scrollLeft;
    sliderRef.current.scrollTo({
      left: leftPosition - window.innerWidth,
      behavior: 'smooth'
    });
  };

  const handleScrollRight = () => {
    const leftPosition = sliderRef.current.scrollLeft;
    sliderRef.current.scrollTo({
      left: leftPosition + window.innerWidth,
      behavior: 'smooth'
    });
  };
  if (!sectionData || !sectionData?.playlist?.length) return null;
  return (
    <div className="section__layout position-relative">
      <Image ref={arrowLeft} onClick={handleScrollLeft} src={ARROW_ICON} unoptimized width={30} height={30} alt="Previous" className="previous__icon center__y__absolute p-1 bg-white rounded-circle" />
      <Image ref={arrowRight} onClick={handleScrollRight} src={ARROW_ICON} unoptimized width={30} height={30} alt="Previous" className="next__icon center__y__absolute p-1 bg-white rounded-circle" />

      {section.enableText && <h2 className="section__title">
        {section.title}
      </h2>}
      <div ref={sliderRef} className="d-flex w-100 section__gallery scroll__bar__hide">
        {sectionData?.playlist?.map((movie, bannerIndex) => (
          <div className="banner__layout position-relative" key={movie.feedid}>
            <Link className="w-100 h-100" href={`/m/${movie.mediaid}/${movie.title.replace(/ /g, '-')}`}>
              <span className="banner__title">{movie.title}</span>
              <Image priority={mappingIndex === 0 && bannerIndex === 0} alt={movie.title} objectFit="cover" src={movie.image} layout="fill" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}


export default BannerView;