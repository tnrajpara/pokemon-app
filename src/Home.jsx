import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = React.useState([]);
  const [next, setNext] = React.useState();
  const [plus, setPlus] = React.useState(20);
  const [minus, setMinus] = React.useState(20);
  const [previous, setPrevious] = React.useState();
  const [individualData, setIndividualData] = React.useState([
    {
      name: "",
      abilities: "",
      hp: "",
      attack: "",
      type: "",
      defence: "",
      img: "",
    },
  ]);

  const [searchInput, setSearchInput] = React.useState("");
  const [filterdData, setFilterdData] = React.useState([]);

  const nextData = () => {
    const temp = `https://pokeapi.co/api/v2/pokemon/?offset=${plus}&limit=40`;
    setPlus((plus) => plus + 40);
    setNext(temp);
    console.log(next);
  };

  useEffect(() => {
    const fetchdata = async () => {
      if (next === undefined) {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const json = await data.json();
        setData(json.results);
      }
      if (next !== undefined) {
        const data = await fetch(next);
        const json = await data.json();
        setData(json.results);
      }
    };
    fetchdata();
  }, [next]);

  useEffect(() => {
    const fetchdata = async () => {
      if (previous === undefined) {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const json = await data.json();
        setData(json.results);
      }
      if (previous !== undefined) {
        const data = await fetch(previous);
        const json = await data.json();
        setData(json.results);
      }
    };
    fetchdata();
  }, [previous]);

  const previousData = () => {
    const temp = `https://pokeapi.co/api/v2/pokemon/?offset=${minus}&limit=20`;
    setMinus((minus) => minus - 20);
    setPrevious(temp);
    console.log(previous);
  };

  const fetchInvidualData = async () => {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput}`
    );
    const json = await data.json();
    console.log("individual data", json.types[0].type.name);
    setIndividualData({
      name: searchInput,
      species: json.species.name,
      abilities: json.abilities.map((item) => item.ability.name),
      hp: json.stats[0].base_stat,
      attack: json.stats[1].base_stat,
      type: json.types[0].type.name,
      defence: json.stats[2].base_stat,
      img: json.sprites.front_default,
    });
  };

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilterdData([]);
    }
    const filterData = data.filter((item) => {
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilterdData(filterData);
    console.log(individualData.type);
    console.log(individualData.name);
  }, [searchInput]);

  return (
    <>
      <div className="bg-[#222831]">
        <div className="flex justify-center justify-items-center space-x-3 items-center px-4 ">
          <input
            type="text"
            className="px-4 py-2  w-4/5 outline-none mt-10 bg-[#31363F]   text-gray-100"
            value={searchInput}
            placeholder="Search pokemon "
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="px-4 py-2 border border-black bg-[#76ABAE] text-[#222831] text-xl mt-10 "
            onClick={() => {
              fetchInvidualData();
            }}
          >
            Search
          </button>
        </div>

        {/* filter pokemon from input  */}

        <div className="flex flex-col mt-5 space-y-3">
          {searchInput !== ""
            ? filterdData.map((item, index) => {
                return (
                  <Link
                    className="bg-[#31363F] py-2 text-gray-400 p-10   flex text-center justify-between w-4/5 justify-items-center mx-auto items-center "
                    key={index}
                    to={`/${item.name}`}
                  >
                    <button
                      className=" text-gray-200 px-2 py-2 rounded-md"
                      onClick={() => {
                        setSearchInput(item.name);
                        fetchInvidualData();
                      }}
                    >
                      {item.name}
                    </button>
                    <svg
                      className="svg-icon search-icon h-5 w-5"
                      aria-labelledby="title desc"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19.9 19.7"
                    >
                      <title id="title">Search Icon</title>
                      <desc id="desc">A magnifying glass icon.</desc>
                      <g className="search-path" fill="none" stroke="#848F91">
                        <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                        <circle cx="8" cy="8" r="7" />
                      </g>
                    </svg>
                  </Link>
                );
              })
            : null}
        </div>

        {/* <div
          className={`flex justify-center items-center mt-5 bg-gray-900
      `}
        >
          {!individualData.name ? (
            <h1 className="text-2xl mt-6"></h1>
          ) : (
            <div
              className={`border p-4 border-black inline-block rounded-md text-white bg-gray-900
              ${individualData.type === "fire" ? "bg-red-500" : ""} 
              ${individualData.type === "water" ? "bg-blue-500" : ""}
              ${individualData.type === "grass" ? "bg-green-500" : ""}
              ${individualData.type === "electric" ? "bg-yellow-500" : ""}
              ${individualData.type === "poison" ? "bg-purple-500" : ""}
              ${individualData.type === "normal" ? "bg-gray-500" : ""}
              ${individualData.type === "flying" ? "bg-gray-500" : ""}`}
            >
              <img src={individualData.img} alt="" width={200} height={200} />
              <h1 className="text-xl mt-2">Name: {individualData.name}</h1>
              <h1 className="text-xl mt-2">Stats: {individualData.stats}</h1>
              <h1 className="text-xl mt-2">
                Abilities: {individualData.abilities}
              </h1>
              <h1 className="text-xl mt-2">HP: {individualData.hp}</h1>
              <h1 className="text-xl mt-2">Attacks: {individualData.attack}</h1>
              <h1 className="text-xl mt-2">Type: {individualData.type}</h1>
              <h1 className="text-xl mt-2">
                Defence: {individualData.defence}
              </h1>
            </div>
          )}
        </div> */}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 grid-cols-2  bg-[#222831] items-center text-center justify-items-center justify-center">
          {data.map((item, index) => {
            return (
              <div className="text-white p-4 text-center" key={index}>
                <Link
                  to={`/${item.name}`}
                  className="border border-black hover:text-gray-100 text-center px-4 py-3 flex justify-center items-center text-xl bg-[#76ABAE] text-[#EEEEEE] rounded-3xl"
                  onClick={() => {
                    setSearchInput(item.name);
                    fetchInvidualData();
                  }}
                >
                  <h1 className="text-center capitalize text-[#222831] ">
                    {item.name}
                  </h1>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-5">
          <button
            className="text-white bg-[#31363F] px-5 py-3 my-4 text-center "
            onClick={() => {
              previousData();
            }}
          >
            Previous
          </button>
          <button
            className="text-white bg-[#31363F] px-5 py-3 my-4 text-center "
            onClick={() => {
              nextData();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
