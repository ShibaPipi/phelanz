import { FC } from 'react';

export const SiteFooter: FC = () => {
  return (
    <footer className="bg-gray-200 border-t border-gray-200">
      <div className="mx-auto px-8">
        <div className="py-28 flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto">
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js by Phelanz.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://github.com/ShibaPipi"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 rounded-md"
              target="_blank"
              rel="noopener"
            >
              Read Documentation
            </a>
            <a
              href="https://github.com/ShibaPipi"
              className="mx-3 font-bold hover:underline"
              target="_blank"
              rel="noopener"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
