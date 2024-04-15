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
    <div className="h-screen bg-[#222831]">
      <div className={`flex justify-center items-center`}>
        {!individualData.name ? (
          <h1 className="text-2xl mt-6"></h1>
        ) : (
          <div className=" px-3 py-4 bg-[#31363F] text-[#76ABAE] font-semibold rounded-lg sticky  mt-5 lg:w-1/4 lg:h-1/4 text-center flex justify-center items-center flex-col">
            <div className="bg-[#76ABAE] rounded-full">
              <img src={individualData.img} alt="" width={200} height={200} />
            </div>

            <h1 className="text-2xl mt-2 text-center capitalize">
              {" "}
              {individualData.name}
            </h1>
            {/* <div className="text-2xl mt-2">
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
            </h1> */}
            <div className="grid grid-cols-2">
              <div className="flex space-x-4">
                <div className="text-lg mt-2 text-center">
                  <p className="text-xl">HP</p> {individualData.hp}
                </div>
                <div className="text-lg mt-2 text-center">
                  <p className="text-xl">Attacks</p> {individualData.attack}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="text-lg mt-2 text-center">
                  <p className="text-xl">Type</p> {individualData.type}
                </div>
                <h1 className="text-lg mt-2 text-center">
                  <p className="text-xl">Defence</p> {individualData.defence}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
