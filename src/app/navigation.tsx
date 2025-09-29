"use client";
import { useEffect, useState, useRef, ChangeEvent, use } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { Phonesearch } from "@/components/mycomponents/phonesearch";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/mycomponents/input";
import { MdSunny } from "react-icons/md";
import { Searchmovie } from "@/components/mycomponents/searchmovie";
import { useMode } from "./modecontext";
import { axiosInstance } from "@/lib/utils";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Searchmoviephone } from "@/components/mycomponents/searchmoviephone";
export const Navigation = () => {
  const { mode, toggleMode } = useMode();
  type MovieData = {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
  type Genre = {
    id: number;
    name: string;
  };
  type OptionType = {
    id: number;
    name: string;
  };
  const [genre, setGenre] = useState<Genre[]>([]);
  const [data, setData] = useState<MovieData[]>([]);
  const [inputvalue, setInputvalue] = useState("");
  const [buttonsearch, setButtonsearch] = useState(false);
  const [down, setDown] = useState(false);

  const debouncedInputvalue = useDebounce(inputvalue, 200);
  const handleonchange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputvalue(event.target.value);
  };
  console.log("rerendering", debouncedInputvalue);

  useEffect(() => {
    axiosInstance
      .get(`search/movie?query=${debouncedInputvalue}&language=en-US&page=1`)
      .then((res) => setData(res.data.results));
  }, [debouncedInputvalue]);
  console.log(data, "hi");

  useEffect(() => {
    axiosInstance
      .get(`genre/movie/list?language=en`)
      .then((res) => setGenre(res.data.genres));
  }, []);
  const router = useRouter();
  const handletosearchresults = (id: string) => {
    router.push(`/searchresults/${id}`);
    setInputvalue("");
  };

  const handletodetail = (id: string) => {
    router.push(`/detail/${id}`);
    setInputvalue("");
  };
  const handletomore = (id: string) => {
    router.push(`/morelikethis/${id}`);
    setInputvalue("");
  };
  const handletosearchfilter = (id: string) => {
    router.push(`/searchfilter/${id}?genres=${id}`);
    setInputvalue("");
  };

  const handleSelect = (option: OptionType) => {
    console.log("Selected Option ID:", option.id);
    handletosearchfilter(option.id.toString());
  };
  const handlebutton = () => {
    setButtonsearch(!buttonsearch);
    setInputvalue("");
  };
  const handledown = () => {
    setDown(!down);
    setInputvalue("");
  };
  console.log(down, "down");
  console.log(mode, "mode");

  return (
    <div
      className={`flex w-[100%] h-[59px] py-6 px-[20px] sm:px-[80px] justify-between items-center ${
        mode ? "bg-white text-red" : "bg-black text-white"
      } relative`}>
      <a
        href={process.env.NEXT_PUBLIC_FRONT_URL}
        className="flex items-center gap-2 w-[92px] h-[20px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none">
          <path
            d="M5.83366 2.1665V18.8332M14.167 2.1665V18.8332M1.66699 10.4998H18.3337M1.66699 6.33317H5.83366M1.66699 14.6665H5.83366M14.167 14.6665H18.3337M14.167 6.33317H18.3337M3.48366 2.1665H16.517C17.5203 2.1665 18.3337 2.97985 18.3337 3.98317V17.0165C18.3337 18.0198 17.5203 18.8332 16.517 18.8332H3.48366C2.48034 18.8332 1.66699 18.0198 1.66699 17.0165V3.98317C1.66699 2.97985 2.48034 2.1665 3.48366 2.1665Z"
            stroke="#4338CA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-4 w-[92px] text-[#4338CA] font-extrabold font-italic">
          Movie Z
        </p>
      </a>
      <div
        className={`absolute left-0 sm:left-[25%] px-5 transition-all duration-300 ease-in-out transform ${
          buttonsearch
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } z-30`}>
        <Phonesearch
          down={handledown}
          change={handleonchange}
          mode={mode}
          buttonsearch={handlebutton}
        />
        <div
          className={`${
            mode ? "bg-white text-black " : "bg-black text-white"
          } w-[330px] border-[1px] sm:w-[577px] p-5 flex-col items-start gap-0 rounded-[8px] absolute top-[100px]${
            mode ? "bg-white text-[#09090B]" : "bg-black text-white"
          } ${down ? "flex" : "hidden"}`}>
          <div className="flex w-[213px] flex-col items-start gap-1">
            <p className="self-stretch text-6 font-semibold">Genres</p>
            <p className="self-stretch text-4 font-normal">
              See lists of movies by genre
            </p>
          </div>
          <div className="flex w-auto py-4 flex-col items-start gap-[10px] self-stretch">
            <div className="h-[1px] self-stretch border-[1px] solid border-[#E4E4E7]"></div>
          </div>
          <div className="flex items-start content-start gap-4 self-stretch flex-wrap">
            <Autocomplete
              options={genre}
              mode={mode}
              selectedOptions={null}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex sm:hidden w-[335px] p-3 h-fit gap-100px flex-col items-start gap-0 rounded-lg border-[1px] solid border-[#E4E4E7] absolute left-[8vw] top-[8vh] z-30 ${
          mode ? "bg-white" : "bg-black"
        } ${inputvalue !== "" ? "flex" : "hidden"}`}>
        {data?.slice(0, 5).map((value) => {
          return (
            <Searchmoviephone
              onclick={() => {
                handletodetail(value.id);
              }}
              seemore={() => {
                handletomore(value.id);
              }}
              mode={mode}
              key={value}
              title={value.title}
              src={`https://image.tmdb.org/t/p/original${value.poster_path}`}
              rate={(Math.round(value.vote_average * 10) / 10).toFixed(1)}
              date={value.release_date.slice(0, 4)}
            />
          );
        })}
        <button
          onClick={() => {
            handletosearchresults(debouncedInputvalue);
          }}
          className={`${
            data.length == 0 ? "hidden" : "flex"
          } cursor-pointer w-full h-10 px-4 py-2 justify-start items-center gap-2 rounded-md active:underline`}>
          <p className="text-[14px] font-medium">
            See all results for "{debouncedInputvalue}"
          </p>
        </button>
        <div
          className={`${
            data.length == 0 ? "flex" : "hidden"
          } w-full h-[95px] pt-6 pb-4 px-5 rounded-lg `}>
          <div className="flex w-full h-full justify-center items-center">
            <p className="text-[14px] font-medium">No results found.</p>
          </div>
        </div>
      </div>
      <div className={`hidden md:flex w-[488px] items-center gap-3`}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`${
                  mode ? "bg-white text-red" : "bg-black text-white"
                }`}>
                Genre
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={`${
                  mode ? "bg-white text-black" : "bg-black text-white"
                } flex w-[577px] p-5 flex-col items-start gap-0 rounded-[8px]${
                  mode ? "bg-white text-[#09090B]" : "bg-black text-white"
                }`}>
                <div className="flex w-[213px] flex-col items-start gap-1">
                  <p className="self-stretch text-6 font-semibold">Genres</p>
                  <p className="self-stretch text-4 font-normal">
                    See lists of movies by genre
                  </p>
                </div>
                <div className="flex w-[550px] py-4 flex-col items-start gap-[10px] self-stretch">
                  <div className="h-[1px] self-stretch border-[1px] solid border-[#E4E4E7]"></div>
                </div>
                <div className="flex items-start content-start gap-4 self-stretch flex-wrap">
                  <Autocomplete
                    options={genre}
                    mode={mode}
                    selectedOptions={null}
                    onSelect={handleSelect}
                  />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Input value={inputvalue} mode={mode} change={handleonchange}></Input>
        <div
          className={`flex w-[577px] p-3 h-fit gap-100px flex-col items-start gap-0 rounded-lg border-[1px] solid border-[#E4E4E7] absolute left-[34vw] top-[10vh] z-30 ${
            mode ? "bg-white" : "bg-black"
          } ${inputvalue !== "" ? "flex" : "hidden"}`}>
          {data?.slice(0, 5).map((value) => {
            return (
              <Searchmovie
                onclick={() => {
                  handletodetail(value.id);
                }}
                seemore={() => {
                  handletomore(value.id);
                }}
                mode={mode}
                key={value}
                title={value.title}
                src={`https://image.tmdb.org/t/p/original${value.poster_path}`}
                rate={(Math.round(value.vote_average * 10) / 10).toFixed(1)}
                date={value.release_date}
              />
            );
          })}
          <button
            onClick={() => {
              handletosearchresults(debouncedInputvalue);
            }}
            className={`${
              data.length == 0 ? "hidden" : "flex"
            } cursor-pointer w-full h-10 px-4 py-2 justify-start items-center gap-2 rounded-md hover:underline`}>
            <p className="text-[14px] font-medium">
              See all results for "{debouncedInputvalue}"
            </p>
          </button>
          <div
            className={`${
              data.length == 0 ? "flex" : "hidden"
            } w-[577px] h-[95px] pt-6 pb-4 px-5 rounded-lg `}>
            <div className="flex w-full h-full justify-center items-center">
              <p className="text-[14px] font-medium">No results found.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end items-center">
        <button
          onClick={handlebutton}
          className={`flex md:hidden justify-center items-center size-[36px] rounded-md border-[1px] solid border-[#E4E4E7] ${
            mode ? "bg-white" : "bg-black"
          } shadow-sm`}>
          <CiSearch className={`${mode ? "text-black" : "text-white"}`} />
        </button>
        <button
          onClick={toggleMode}
          className={`cursor-pointer flex justify-center items-center size-[36px] rounded-md border-[1px] solid border-[#E4E4E7] ${
            mode ? "bg-white" : "bg-black"
          } shadow-sm`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            className={`${mode ? "flex" : "hidden"}`}>
            <path
              d="M8 2.5C7.20435 3.29565 6.75736 4.37478 6.75736 5.5C6.75736 6.62522 7.20435 7.70435 8 8.5C8.79565 9.29565 9.87478 9.74264 11 9.74264C12.1252 9.74264 13.2044 9.29565 14 8.5C14 9.68669 13.6481 10.8467 12.9888 11.8334C12.3295 12.8201 11.3925 13.5892 10.2961 14.0433C9.19975 14.4974 7.99335 14.6162 6.82946 14.3847C5.66558 14.1532 4.59648 13.5818 3.75736 12.7426C2.91825 11.9035 2.3468 10.8344 2.11529 9.67054C1.88378 8.50666 2.0026 7.30026 2.45673 6.2039C2.91085 5.10754 3.67989 4.17047 4.66658 3.51118C5.65328 2.85189 6.81331 2.5 8 2.5Z"
              stroke="#18181B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <MdSunny
            className={`${mode ? "hidden text-black" : "flex text-white"}`}
          />
        </button>
      </div>
    </div>
  );
};
