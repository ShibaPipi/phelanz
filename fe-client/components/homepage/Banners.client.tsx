'use client';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Banner } from '@/lib/models';
import { useMemo, useState } from 'react';

interface BannersClientProps {
  banners: Banner[];
  settings: Settings;
}

export default function BannersClient({
  banners,
  settings,
}: BannersClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBanner = useMemo(
    () => banners.find((_, index) => index === currentIndex),
    [banners, currentIndex],
  );

  return (
    <section className="relative px-8">
      <div className="max-w-screen-xl mx-auto group">
        <div className="slider-container">
          {banners.length > 0 ? (
            <Slider {...settings} afterChange={setCurrentIndex}>
              {banners.map(({ id, title, image_src }) => (
                <div
                  key={id}
                  className="sm:h-96 lg:h-[400px] xl:h-[480px] relative w-full"
                >
                  <Image
                    alt={title || ''}
                    width="1240"
                    height="620"
                    src={image_src}
                    className="object-fill shadow-sm hover:shadow-md transition-shadow duration-200 visible absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>
      <div className="mb-8 md:mb-16 max-w-screen-xl mx-auto">
        <div className="sm:mx-0">
          <div className="block overflow-hidden relative box-border m-0"></div>
        </div>
      </div>
      <div className="min-h-36 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 max-w-screen-xl mx-auto mb-4 md:mb-0">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            {currentBanner?.title}
          </h3>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">
            {currentBanner?.description}
          </p>
        </div>
      </div>
    </section>
  );
}
