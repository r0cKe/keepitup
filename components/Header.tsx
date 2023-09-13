"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
// import fetchSuggestion from "@/utils/fetchSuggestions";
import formatTodosForAI from "@/utils/formatTodosForAI";

const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    // const fetchSuggestionFunc = async () => {
    //   const suggestion = await fetchSuggestion(board);
    //   setSuggestion(suggestion);
    //   setLoading(false);
    // };
    // fetchSuggestionFunc();

    const formatedTodos = formatTodosForAI(board);
    let res = "";
    for (let key in formatedTodos) {
      let string = "";
      switch (key) {
        case "todo":
          string = `There ${formatedTodos[key] > 1 ? "are" : "is"} ${
            formatedTodos[key]
          } ${formatedTodos[key] > 1 ? "tasks" : "task"} to be completed, `;

          break;
        case "inProgress":
          string = `${formatedTodos[key]} ${
            formatedTodos[key] > 1 ? "tasks" : "task"
          }  in progress, `;
          break;

        case "done":
          string = `and ${formatedTodos[key]} ${
            formatedTodos[key] > 1 ? "tasks already" : "task"
          } done.`;
          break;

        default:
          break;
      }
      res += string;
    }

    setSuggestion(`Hi User🙋‍♂️. Welcome to your Todo App!
    ${res} Have a productive day :)`);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        {/* Gradient */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] opacity-50 blur-3xl -z-50" />

        {/* Logo */}
        <Image
          // src="https://links.papareact.com/c2cdd5"
          src="/assets/images/logo.png"
          alt="KeepItUp logo"
          width={300}
          height={100}
          className="w-64 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-censter space-x-5 flex-1 justify-end w-full">
          {/* Search */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden></button>
          </form>

          {/* Avatar */}
          {/* <Avatar name="Ritik Sabhrwal" round size="50" color="#0055D1" /> */}
        </div>
      </div>

      {/* GPT */}
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
        </p>
      </div>
    </header>
  );
};

export default Header;
