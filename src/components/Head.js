import React, { cache, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  /**
   * searchCache = {
   *     "iphone": ["iphone 11", "iphone 14"]
   * }
   * searchQuery = iphone
   */

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delay hiding to allow click events on suggestions
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };


  useEffect(() => {
    // API call
    console.log(searchQuery);

    // make an api call after every ket press
    // but if the difference between 2 APi calls is <200ms 
    // decline the API call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };

  }, [searchQuery]);


  /**     Debouncing
   * 
   * key - i
   * - render the component 
   * - useEffect();
   * - start timer => make api call after 200 ms
   * 
   * key -ip
   * - destroy the component (calls the useEffect return method also)
   * - re-render the component 
   * - useEffect();
   * - start timer => make api call after 200 ms
   * 
   * setTimeout(200) - make an API call after 200 ms
   * 
   */

  const getSearchSuggestions = async () => {
    console.log("API Call - " + searchQuery);

    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);


    // update cache
    dispatch(cacheResults({
      [searchQuery]: json[1],
    }));
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-4   h-14 shadow-lg fixed top-0 w-full z-50 bg-white">

      <div className="flex col-span-1 cursor-pointer">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-6"
          alt="menu"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png"
        />
        <a href="/">
          <img
            className="h-6 mx-2"
            alt="yt-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>

      <div className="col-span-10 px-10">
        <div className="">
          <input
            className="w-1/2 border border-gray-400 p-1 rounded-l-full"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <button className="border border-gray-400 px-5 py-1 rounded-r-full border-l-0 bg-gray-100">
            🔍
          </button>
        </div>

        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[33.25rem] border border-gray-100 rounded-lg m-1">
            <ul>
              {suggestions.map(s => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">🔍{s}
                </li>
              ))}


            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;