import Image from "next/image";
import defaultImage from "../public/images/default.jpg";

function Card({ recipe, index, openRecipe, width = "w-full" }) {
  const { name, timeToCook } = recipe;
  return (
    <div
      key={index}
      className={`${width} xs:w-[49%] md:w-[32%] shrink-0 rounded-md cursor-pointer shadow-lg`}
      onClick={() => openRecipe(name)}
    >
      <div className="relative h-60 max-h-[50vh] w-full rounded-t-md overflow-hidden">
        <Image
          src={recipe.imageUrl || defaultImage}
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
