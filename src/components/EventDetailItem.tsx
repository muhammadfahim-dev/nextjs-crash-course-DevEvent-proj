import Image from "next/image";
import React from "react";

function EventDetailItem({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Image src={src} alt={alt} width={17} height={17}/>
      <p>{label}</p>
    </div>
  );
}

export default EventDetailItem;
