import React from 'react';
const API = process.env.API_URL;

export async function generateStaticParams() {
  const res = await fetch(`${API}/stories?page=1`);
  const data = await res.json();

  return data.stories.map(({ slug }) => ({ slug }));
}

const getStory = async (slug) => {
  const res = await fetch(`${API}/stories?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

export default async function SingleStory({ params }) {
  const data = await getStory(params.slug);

  const story = data.stories[0];
  return (
    <div className='text-zinc-700 p-4'>
      <h1>{story?.title}</h1>
      <h3>{story?.subtitle}</h3>
    </div>
  );
}
