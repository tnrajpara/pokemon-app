import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Info = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  const [individualData, setIndividualData] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchInvidualData = async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const json = await data.json();
      console.log("individual data", json.types[0].type.name);
      setIndividualData({
        name: id,
        species: json.species.name,
        abilities: json.abilities.map((item) => item.ability.name),
        hp: json.stats[0].base_stat,
        attack: json.stats[1].base_stat,
        type: json.types[0].type.name,
        defence: json.stats[2].base_stat,
        img: json.sprites.front_default,
      });
    };
    fetchInvidualData();
  });

  return (
    <div className="h-screen bg-gray-900">
      <div className={`flex justify-center items-center`}>
        {!individualData.name ? (
          <h1 className="text-2xl mt-6"></h1>
        ) : (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-4 font-semibold rounded-lg sticky text-gray-100 mt-5 lg:w-1/4 lg:h-1/4 text-center flex justify-center items-center flex-col">
            <img src={individualData.img} alt="" width={200} height={200} />

            <h1 className="text-2xl mt-2">Name: {individualData.name}</h1>
            <div className="text-2xl mt-2">
              Stats:{" "}
              {individualData.stats ? (
                individualData.stats
              ) : (
                <span className="text-2xl">Nothing to show</span>
              )}
            </div>
            <h1 className="text-2xl mt-2">
              Abilities:{" "}
              {individualData.abilities ? (
                individualData.abilities.toString()
              ) : (
                <span className="text-2xl">Nothing to show</span>
              )}
            </h1>
            <h1 className="text-2xl mt-2">HP: {individualData.hp}</h1>
            <h1 className="text-2xl mt-2">Attacks: {individualData.attack}</h1>
            <h1 className="text-2xl mt-2">Type: {individualData.type}</h1>
            <h1 className="text-2xl mt-2">Defence: {individualData.defence}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
