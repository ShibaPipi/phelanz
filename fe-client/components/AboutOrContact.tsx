import { FC } from 'react';
import Image from 'next/image';
import { ImagePlaceholder } from './ImagePlaceholder';

interface Props {
  type: 'about' | 'contact';
}

export const AboutOrContact: FC<Props> = ({ type }) => {
  const title = type === 'about' ? 'About Us' : 'Contact Us';
  return (
    <div className="relative px-8">
      <div className="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
        <div className="my-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8 md:mb-16">
            {title}
          </h1>
          <div className="sm:mx-0">
            <div className="block overflow-hidden relative box-border m-0">
              <ImagePlaceholder />
              <Image
                alt={title}
                width="800"
                height="400"
                src="https://next-blog-starter.vercel.app/_next/image?url=%2Fassets%2Fblog%2Fdynamic-routing%2Fcover.jpg&w=3840&q=75"
                className="shadow-sm hover:shadow-md transition-shadow duration-200 visible absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full rounded-lg"
              />
            </div>
          </div>
          <p>
            <span>
              We are a travel blog featuring travel tips, guides, and
              photography from around the world. Whether you need guidance for
              your first trip, or you&apos;re a seasoned traveler looking for
              destination inspiration, you&apos;ve come to the right place!
            </span>
          </p>
          <blockquote>
            <p>
              <span>Jobs fill your pockets, adventures fill your soul.</span>
            </p>
          </blockquote>
          <h3>Our Mission</h3>
          <p>
            <span>
              Through our award-winning blog, we love to provide travelers with
              guidance and inspiration and connect them to meaningful
              experiences as they travel the world with curiosity...
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
