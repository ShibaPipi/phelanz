'use client';

import { Introduction } from '@/lib/models';
import Image from 'next/image';
import Link from 'next/link';

interface IntroductionsClientProps {
  item: Introduction;
  index: number;
}

const isUrlAbsolute = (url: string) =>
  url.indexOf('://') > 0 || url.indexOf('//') === 0;

export default function IntroductionsClient({
  item,
  index,
}: IntroductionsClientProps) {
  return (
    <div
      key={index}
      className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-16 md:py-8 items-center"
    >
      <div className="md:w-6/12 flex-shrink-0 relative">
        <Image
          width="600"
          height="600"
          alt={item.title}
          className="rounded-lg object-cover object-center"
          src={item.image_src}
        />
      </div>
      <div
        className={`md:w-6/12 mt-16 md:mt-0 ${
          index % 2 === 1
            ? `md:ml-12 lg:ml-16 md:order-last`
            : `md:mr-12 lg:mr-16 md:order-first`
        }`}
      >
        <div className="g:py-8 text-center md:text-left">
          {item.tag && (
            <div className="font-bold text-gray-500 text-sm text-center md:text-left uppercase py-1">
              {item.tag}
            </div>
          )}
          <h2 className="font-display text-4xl font-black text-secondary-500 md:text-3xl lg:text-5xl tracking-wide text-center mt-4 lg:leading-tight md:text-left">
            {item.title}
          </h2>
          <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
            {item.description}
          </p>
          {item.button &&
            (isUrlAbsolute(item.buttonHref!) ? (
              <a
                className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:shadow-outline-black active:bg-gray-700 transition ease-in-out duration-150"
                title={item.buttonText}
                target={item.buttonTarget}
                href={item.buttonHref}
              >
                {item.buttonText}
              </a>
            ) : (
              <Link
                className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:shadow-outline-black active:bg-gray-700 transition ease-in-out duration-150"
                title={item.buttonText}
                target={item.buttonTarget}
                href={item.buttonHref!}
              >
                {item.buttonText}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
