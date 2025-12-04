import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-[90%] md:w-[500px] h-[600px]">
      <div className="w-full h-[500px] flex items-center justify-center">
        {images[currentIndex] ? (
          <img
            src={images[currentIndex]}
            alt={`slide-${currentIndex}`}
            className="w-full h-full object-cover rounded-3xl"
          />
        ) : (
          <div className="text-white">No image</div>
        )}
      </div>

      <div className="w-full h-[100px] flex justify-center items-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumb-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={
              "w-[90px] h-[90px] m-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-accent " +
              (index === currentIndex ? "border-accent border-4" : "")
            }
          />
        ))}
      </div>
    </div>
  );
}