import Image from "next/image";
import defaultImage from "../public/images/default.jpg";

function Card({ recipe, index, openRecipe }) {
  const { name, timeToCook, imageUrl } = recipe;
  return (
    <div
      key={index}
      className="w-full xs:w-[49%] md:w-[32%] shrink-0 rounded-md cursor-pointer overflow-hidden shadow-lg"
      onClick={() => openRecipe(name)}
    >
      <div className="relative h-60 max-h-[50vh] w-full overflow-hidden">
        <Image
          src={imageUrl || defaultImage}
          alt={name}
          fill={true}
          className="object-cover transition-all duration-500 ease-in-out hover:scale-[1.15]"
        />
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-medium capitalize">{name}</h2>
        <p>{timeToCook} min</p>
      </div>
    </div>
  );
}

export default Card;
