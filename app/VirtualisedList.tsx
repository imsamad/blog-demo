'use client';
import { cloudinaryUrl, placeholderImage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const VirtualisedList = ({ dimensions }: { dimensions: any }) => {
  const [stories, setStories] = useState([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const fetchRef = useRef({
    nextPage: 2,
    isFetching: false,
  });

  const [containerHeight, setContainerHeight] = useState(0);
  const [hasNoMore, setHasNoMore] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const { height } = containerRef.current.getBoundingClientRect();
    setContainerHeight(height);
  }, []);

  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / dimensions.mobile.blogCardHeight);

  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / dimensions.mobile.blogCardHeight),
    stories.length
  );

  const limit =
    Math.ceil(containerHeight / dimensions.mobile.blogCardHeight) * 2;

  const visibleItems = stories.slice(startIndex, endIndex);

  useEffect(() => {
    if (!limit) return;
    (async () => {
      try {
        await getStories(1, limit, (data: any) => {
          // @ts-ignore
          setStories((p) => [...p, ...data.stories]);
          fetchRef.current.nextPage = data.pagination.next;
        });
      } catch (err) {}
    })();
  }, [limit]);

  const handleScroll = (event: any) => {
    setScrollTop(event.target.scrollTop);
    if (hasNoMore) return;
    const triggerHeight =
      // @ts-ignore
      containerRef.current.scrollTop + containerRef.current.offsetHeight;

    if (
      // @ts-ignore
      !fetchRef.current.isFetching &&
      // @ts-ignore
      triggerHeight >= containerRef.current.scrollHeight
    ) {
      fetchRef.current.isFetching = true;
      getStories(fetchRef.current.nextPage, limit, (data: any) => {
        // @ts-ignore
        setStories((p) => [...p, ...data.stories]);
        if (!data.pagination.next) setHasNoMore(true);
        fetchRef.current.nextPage = data.pagination.next;
        fetchRef.current.isFetching = false;
      });
    }
  };

  return (
    <div
      className='p-2 flex-1 overflow-y-auto  max-w-screen-sm   mx-auto'
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${stories.length * dimensions.blogCardHeight}px`,
          width: `100%`,
        }}
      >
        <div
          style={{
            position: 'relative',
            height: `${visibleItems.length * dimensions.blogCardHeight + 60}px`,
            top: `${startIndex * dimensions.blogCardHeight}px`,
          }}
        >
          {stories.map((story: any) => (
            <Link href={`/stories/${story.slug}`} key={story._id}>
              <button
                className={`flex w-full mb-4 shadow-md rounded-lg duration-200 transition-shadow overflow-hidden focus:shadow-lg focus:outline focus:outline-offset-2 focus:outline-1`}
                style={{
                  height: dimensions.mobile.blogCardHeight,
                  maxHeight: dimensions.mobile.blogCardHeight,
                }}
              >
                <Image
                  src={cloudinaryUrl({
                    src: story.titleImage,
                    width: dimensions.mobile.blogCardImage.width,
                    height: dimensions.mobile.blogCardImage.height,
                  })}
                  alt={story.title}
                  width={dimensions.mobile.blogCardImage.width}
                  height={dimensions.mobile.blogCardImage.height}
                  // @ts-ignore
                  placeholder={placeholderImage(
                    dimensions.mobile.blogCardImage.width,
                    dimensions.mobile.blogCardImage.height
                  )}
                />
                <div className='flex-1 flex flex-col px-2 line-clamp-2'>
                  <h1 className='font-semibold text-left text-sm text-ellipsis text-zinc-700'>
                    {story.title}
                  </h1>
                  <h2 className='font-light text-left text-sm text-ellipsis text-zinc-700   overflow-hidden line-clamp-2'>
                    {story.subtitle}
                  </h2>
                </div>
              </button>
            </Link>
          ))}

          <small className='text-center italic block'>
            {hasNoMore ? 'The End' : 'Loading...'}
          </small>
        </div>
      </div>
    </div>
  );
};

export default VirtualisedList;

const API = process.env.NEXT_PUBLIC_API_URL;

async function getStories(pageNo: number, limit: number, cb: any) {
  try {
    const res = await fetch(`${API}/stories?page=${pageNo}&limit=${limit}`);
    const data = await res.json();
    cb(data);
  } catch (err) {
    return {};
  }
}
