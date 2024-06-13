export interface Banner {
  id: number;
  title: string | null;
  image: string;
  image_src: string;
  description: string | null;
  status: boolean;
  url: string | null;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Introduction {
  title: string;
  description: string;
  tag?: string;
  image_src: string;
  button: boolean;
  buttonText?: string;
  buttonTarget?: string;
  buttonHref?: string;
}

export const contents = [
  {
    id: 0,
    title: 'Virtual Tours - Ways to Travel From Home',
    content:
      'Virtual tours can open up amazing and awe-inspiring locations around the world that may otherwise be inaccessible to you. You can experience the majesty of the Sistine Chapel, the wonder of the Great Wall of China, or the beauty of Hawaii from the comfort of your own home.',
    createdAt: 'MAR. 31, 2021',
    image_src:
      'https://cdn.aglty.io/blog-starter-2021-template/posts/virtual-tour_20210331171226_0.jpg?format=auto&w=800',
  },
  {
    id: 1,
    title: 'Learn How to Pre-render Pages Using Static Generation with Next.js',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.',
    createdAt: 'March 16, 2020',
    image_src:
      'https://next-blog-starter.vercel.app/_next/image?url=%2Fassets%2Fblog%2Fhello-world%2Fcover.jpg&w=3840&q=75',
  },
  {
    id: 2,
    title: 'Preview Mode for Static Generation',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.',
    createdAt: 'March 16, 2020',
    image_src:
      'https://next-blog-starter.vercel.app/_next/image?url=%2Fassets%2Fblog%2Fpreview%2Fcover.jpg&w=3840&q=75',
  },
];
