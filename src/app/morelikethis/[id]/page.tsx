"use client";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Movie } from "@/components/mycomponents/movie";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useMode } from "@/app/modecontext";
import { axiosInstance } from "@/lib/utils";
type data = {
  adult: Boolean;
  title: string;
  release_date: string;
  runtime: string;
  vote_average: number;
  id: any;
  poster_path?: string;
};
export default function Morelike() {
  const { id }: { id?: string } = useParams();

  const { mode, toggleMode } = useMode();
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [datasimiliar, setDatasimiliar] = useState<data[]>([]);
  const [data, setData] = useState<data[]>([]);
  const [pagcount, setPagcount] = useState<number>(Number(page) || 1);
  const [totalpages, setTotalpages] = useState<number>(1);

  const router = useRouter();
  const handleonclick = (id: string) => {
    router.push(`/detail/${id}`);
  };
  useEffect(() => {
    axiosInstance
      .get(`movie/${params.id}/similar?language=en-US&page=${pagcount}`)
      .then(
        (res) => (
          setDatasimiliar(res.data.results),
          setTotalpages(res.data.total_pages > 500 ? 500 : res.data.total_pages)
        )
      );
  }, [pagcount, totalpages]);
  console.log(totalpages, "total");

  useEffect(() => {
    setPagcount(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  console.log(pagcount, "pagenumber");
  useEffect(() => {
    axiosInstance
      .get(`movie/${id}?language=en-US&page=${pagcount}`)
      .then(
        (res) => (
          setData(res.data.results),
          setTotalpages(res.data.total_pages > 500 ? 500 : res.data.total_pages)
        )
      );
  }, [pagcount]);

  console.log(totalpages, "total");

  return (
    <div className="w-screen h-fit flex flex-col mt-[52px] ">
      <div
        className={`flex px-5 sm:px-[80px] w-full flex-col items-start gap-[32px] mb-[32px] ${
          mode ? "text-[#09090B]" : "text-[#FFF]"
        }`}>
        <div className="flex justify-between items-start self-stretch">
          <p className="w-fit text-[30px] font-semibold">More Like This</p>
        </div>

        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-5 gap-8">
          {datasimiliar?.map((movie: data, index: number) => (
            <Movie
              cla={`w-[157px] sm:w-[230px] min-h-[233px] sm:min-h-[340px]`}
              na={`h-[142px] sm:h-[214px]`}
              key={index}
              onclick={() => handleonclick(movie.id)}
              className={`w-[158px] sm:w-[230px] h-[309px] sm:h-[439px] ${
                mode
                  ? "text-[#09090B] bg-[#F4F4F5]"
                  : "text-[#FFF] bg-[#222222]"
              }`}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
              name={movie.title}
            />
          ))}
        </div>

        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-5 gap-8">
          {data?.map((movie: data, index: number) => (
            <Movie
              cla={`w-[157px] sm:w-[230px] min-h-[233px] sm:min-h-[340px]`}
              na={`h-[142px] sm:h-[214px]`}
              key={index}
              onclick={() => handleonclick(movie.id)}
              className={`w-[158px] sm:w-[230px] h-[309px] sm:h-[439px] ${
                mode
                  ? "text-[#09090B] bg-[#F4F4F5]"
                  : "text-[#FFF] bg-[#222222]"
              }`}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
              name={movie.title}
            />
          ))}
        </div>
      </div>
      <div
        className={`flex w-full flex-col justify-end items-end gap-[10px] self-stretch mb-[76px] ${
          mode ? "text-[#09090B]" : "text-[#FFF]"
        }`}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${pagcount > 1 ? pagcount - 1 : pagcount}`}
              />
            </PaginationItem>
            {pagcount > 2 && (
              <PaginationItem>
                <PaginationLink href={`?page=${1}`}>{1}</PaginationLink>
              </PaginationItem>
            )}
            {pagcount > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pagcount > 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${pagcount - 1}`}>
                  {pagcount - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href={`?page=${pagcount}`}
                className={`${
                  mode
                    ? pagcount === 0
                      ? "bg-blue-500 text-white"
                      : "bg-black text-white"
                    : pagcount === 0
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                } px-4 py-2 rounded-lg transition-colors duration-300`}>
                {pagcount}
              </PaginationLink>
            </PaginationItem>

            {pagcount < totalpages && (
              <PaginationItem>
                <PaginationLink href={`?page=${pagcount + 1}`}>
                  {pagcount + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {pagcount < totalpages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {pagcount < totalpages - 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${totalpages}`}>
                  {totalpages}
                </PaginationLink>
              </PaginationItem>
            )}

            {pagcount < totalpages && (
              <PaginationItem>
                <PaginationNext
                  href={`?page=${
                    pagcount < totalpages ? pagcount + 1 : pagcount
                  }`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
