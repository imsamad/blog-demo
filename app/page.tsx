import Link from 'next/link';
import VirtualisedList from './VirtualisedList';
import Navbar from '@/app/components/Navbar';
const dimensions = {
  mobile: {
    navbarHeight: 80,
    blogCardImage: {
      width: 120,
      height: 100,
    },
    blogCardHeight: 100,
  },
};

const HomePage = () => {
  return (
    <main className='flex flex-col h-screen max-h-screen overflow-hidden'>
      <Navbar height={dimensions.mobile.navbarHeight} />
      <VirtualisedList dimensions={dimensions} />
    </main>
  );
};

export default HomePage;
