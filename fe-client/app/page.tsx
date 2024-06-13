// app/serverComponent.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Settings } from 'react-slick';
import { fetchBanners, fetchIntroductions } from '@/lib/dataFetcher';
import { Banner, Introduction, contents } from '@/lib/models';
import BannersClient from '@/components/homepage/Banners.client';
import IntroductionsClient from '@/components/homepage/Introductions.client';

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: undefined,
  prevArrow: undefined,
};

export default async function HomePage() {
  const banners = await fetchBanners();
  const intros = await fetchIntroductions();

  return (
    <>
      <BannersClient banners={banners} settings={settings} />
      <section className="relative px-8">
        {intros.map((item, index) => (
          <IntroductionsClient key={index} item={item} index={index} />
        ))}
      </section>
      <section className="relative px-8">
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight max-w-screen-xl mx-auto">
          More Contents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32 max-w-screen-xl mx-auto">
          {contents.map(({ id, title, content, createdAt, image_src }) => (
            <div key={id}>
              <div className="mb-5">
                <div className="sm:mx-0">
                  <Link href={`/contents/${id}`}>
                    <div className="block overflow-hidden relative box-border m-0">
                      <ImagePlaceholder />
                      <Image
                        alt={title}
                        width="800"
                        height="400"
                        src={image_src}
                        className="shadow-sm hover:shadow-md transition-shadow duration-200 visible absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full rounded-lg"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <h3 className="text-3xl mb-3 leading-snug">
                <Link className="hover:underline" href={`/contents/${id}`}>
                  {title}
                </Link>
              </h3>
              <div className="text-lg mb-4">
                <time dateTime={createdAt}>{createdAt}</time>
              </div>
              <p className="text-lg leading-relaxed mb-4">{content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
