'use client';

import Image from 'next/image';
import { contents } from '../page';

export default function Page({ params }: { params: { id: string } }) {
  const content = contents.find((item) => item.id === +params.id);
  if (!content) return null;
  return (
    <div className="relative px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="h-64 md:h-96  lg:h-[480px] relative overflow-hidden rounded-lg">
          <Image
            alt={content.title}
            width="1280"
            height="960"
            src={content.image_src}
            className="shadow-sm hover:shadow-md transition-shadow duration-200 visible absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full rounded-lg"
          />
          <h1>Content Detail Page for ID: {params.id}</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-4">
        <div className="uppercase text-gray-500 text-xs font-bold tracking-widest leading-loose">
          Content Category
        </div>
        <div className="border-b-2 border-gray-500 w-8"></div>
        <div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
          Mar. 31, 2021
        </div>
        <h1 className="font-display text-4xl font-bold my-6 text-gray-700">
          Virtual Tours - Ways to Travel From Home
        </h1>
        <div className="prose max-w-full mb-20">{content.content}</div>
      </div>
    </div>
  );
}
