import React from 'react';

const ImageSection = ({ src }: { src: string }) => (
  <div className="pt-8">
    <img
      className="rounded-3xl overflow-hidden"
      src={src}
      alt="Section Banner"
    />
  </div>
);

export default ImageSection;
