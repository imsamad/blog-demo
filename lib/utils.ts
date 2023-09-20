export const cloudinaryUrl = ({
  src,
  height,
  width,
}: {
  src: string;
  height: number;
  width: number;
}) => {
  if (!src) return '';
  const isCloudinary =
    src.includes('cloudinary') && src.split('/upload/').length == 2;
  let dim = width ? `w_${width},` : '';
  dim += height ? `h_${height}` : dim;

  const url =
    isCloudinary && dim ? src.split('/upload/').join(`/upload/${dim}/`) : src;
  return url;
};
type numStr = number | string;
export const placeholderImage = (w: numStr, h: numStr) => {
  const shimmer = (w: numStr, h: numStr) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);
  const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
  return blurDataURL;
};
