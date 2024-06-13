'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { contents } from '@/lib/models';

export default function Page() {
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(contents);

  const fetchData = () => {
    setItems((prev) => [...prev, ...contents]);
    setHasMore(false);
  };

  return (
    <div>
      <div className="relative px-8">
        <div className="max-w-screen-xl mx-auto my-12 md:mt-18 lg:mt-20">
          <h1 className="font-display text-secondary-500 text-4xl font-black tracking-wide">
            Contents
          </h1>
        </div>
      </div>
      <div className="relative px-8 mb-8">
        <div className="flex flex-col sm:flex-row max-w-screen-xl mx-auto pt-8 group">
          <div className="sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg relative">
            <Link href={`/contents/1`}>
              <div className="h-64 sm:h-96 relative w-full">
                <Image
                  alt={contents[0].title}
                  width="800"
                  height="600"
                  src={contents[0].image_src}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200 visible absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full rounded-lg"
                />
              </div>
            </Link>
          </div>
          <div className="sm:w-1/2 lg:w-1/3 bg-gray-100 p-8 border-2 border-t-0 rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0 relative">
            <Link href={`/contents/1`}>
              <div className="font-display uppercase text-gray-500 text-xs font-bold tracking-widest leading-loose after:content">
                Travel Guide
              </div>
              <div className="border-b-2 border-gray-500 w-8"></div>
              <div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
                Mar. 31, 2021
              </div>
              <h2 className="font-display text-secondary-500 mt-1 font-black text-2xl group-hover:text-gray-500 transition duration-300">
                Virtual Tours - Ways to Travel From Home
              </h2>
              <p className="text-sm mt-3 leading-loose text-gray-600 font-medium line-clamp-4">
                Virtual tours can open up amazing and awe-inspiring locations
                around the world that may otherwise be inaccessible to you. You
                can experience the majesty of the Sistine Chapel, the wonder of
                the Great ...
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative px-8 mb-12">
        <div className="max-w-screen-xl mx-auto">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore} // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more contents!</p>}
            className="grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map(({ id, title, content, image_src, createdAt }) => (
              <Link href={`/contents/${id}`} key={id}>
                <div className="flex-col group mb-8 md:mb-0">
                  <div className="relative h-64 w-full overflow-clip">
                    <Image
                      width="400"
                      height="250"
                      alt={title}
                      src={image_src}
                      className="h-64 object-cover object-center rounded-t-lg w-full"
                    />
                  </div>
                  <div className="bg-gray-100 p-8 border-2 border-t-0 rounded-b-lg">
                    <div className="uppercase text-gray-500 text-xs font-bold tracking-widest leading-loose">
                      CONTENT CATEGORY
                    </div>
                    <div className="border-b-2 border-gray-500 w-8"></div>
                    <div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
                      {createdAt}
                    </div>
                    <h2 className="text-secondary-500 mt-1 font-black text-2xl group-hover:text-gray-500 transition duration-300 overflow-ellipsis-2">
                      {title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
