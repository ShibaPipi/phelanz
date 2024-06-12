'use client';

import Link from 'next/link';
import Image from 'next/image';
import { contents } from './contents/page';

interface Introduction {
  title: string;
  content: string;
  tag?: string;
  image_src: string;
  button: boolean;
  buttonText?: string;
  buttonTarget?: string;
  buttonHref?: string;
}

const introductions: Introduction[] = [
  {
    title: 'From short breaks to long adventures',
    content:
      "Travel blog featuring travel tips, guides, and photography from around the world. Whether you need guidance for your first trip, or you're a seasoned traveler looking for destination inspiration, you've come to the right place!",
    tag: 'WANDER THE WORLD',
    image_src:
      'https://cdn.aglty.io/blog-starter-2021-template/posts/gaddafi-rusli-2ueUnL4CkV8-unsplash%201.jpg?format=auto&w=600',
    button: true,
    buttonText: 'View our contents',
    buttonHref: '/contents',
    buttonTarget: '_self',
  },
  {
    title: 'Adventurers and Storytellers',
    content:
      'Through our award-winning blog, we love to provide travelers with guidance and inspiration and connect them to meaningful experiences as they travel the world with curiosity!',
    tag: 'ABOUT US',
    image_src:
      'https://cdn.aglty.io/blog-starter-2021-template/posts/travel-photography_20210331143648_0.jpg?format=auto&w=800',
    button: true,
    buttonText: 'Learn about us',
    buttonHref: '/about',
    buttonTarget: '_self',
  },
];

const isUrlAbsolute = (url: string) =>
  url.indexOf('://') > 0 || url.indexOf('//') === 0;

export default function HomePage() {
  return (
    <>
      <section className="relative px-8">
        <div className="flex-col md:flex-row flex items-center md:justify-between max-w-screen-xl mx-auto my-12 md:mt-18 lg:mt-20">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            Blog.
          </h1>
          <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
            A statically generated blog example using{' '}
            <a
              href="https://nextjs.org/"
              className="underline hover:text-success duration-200 transition-colors"
            >
              Next.js
            </a>{' '}
            and Markdown.
          </h4>
        </div>
      </section>
      <section className="relative px-8">
        <div className="mb-8 md:mb-16 max-w-screen-xl mx-auto">
          <div className="sm:mx-0">
            <div className="block overflow-hidden relative box-border m-0">
              <div className="block box-border" style={{ paddingTop: '50%' }} />
              <Image
                alt=""
                width="1240"
                height="620"
                src="https://next-blog-starter.vercel.app/_next/image?url=%2Fassets%2Fblog%2Fdynamic-routing%2Fcover.jpg&w=3840&q=75"
                className="shadow-sm hover:shadow-md transition-shadow duration-200 visible absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 max-w-screen-xl mx-auto mb-4 md:mb-8">
          <div>
            <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
              <a className="hover:underline" href="/posts/dynamic-routing">
                Dynamic Routing and Static Generation
              </a>
            </h3>
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Praesent elementum facilisis leo vel fringilla est ullamcorper
              eget. At imperdiet dui accumsan sit amet nulla facilities morbi
              tempus.
            </p>
          </div>
        </div>
      </section>
      <section className="relative px-8">
        {introductions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center"
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
                  {item.content}
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
                      <div
                        className="block box-border"
                        style={{ paddingTop: '50%' }}
                      />
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
