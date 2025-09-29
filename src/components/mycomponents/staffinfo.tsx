"use client";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Staffinfo = ({ id, mode }: any) => {
  type Data = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  };

  const [data, setData] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data[]>([]);

  useEffect(() => {
    axiosInstance.get(`movie/${id}/credits?language=en-US`).then((res) => {
      setData(res.data.crew || []);
      setData2(res.data.cast || []);
    });
  }, [id]);
  console.log(data);

  return (
    <div className={`w-full ${mode ? "" : "text-[#FFF]"}`}>
      <div className="flex w-full flex-col items-start gap-1 self-stretch">
        <div className="flex w-fit flex-row items-center gap-[53px] self-stretch text-4">
          <div className="w-[64px] h-[28px]">
            <p className="font-bold ">Director</p>
          </div>
          <div className="gap-2 flex flex-row">
            <div className="flex flex-wrap">
              {data
                .filter((a) => a.job === "Director")
                .slice(0, 3)
                .map((a) => (
                  <p key={a.id} className="flex font-normal w-fit self-stretch">
                    {a.name} ·
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="flex p-1 flex-col items-start gap-[10px] self-stretch">
          <div className="h-[1px] self-stretch border-[1px] solid text-[#E4E4E7]" />
        </div>
      </div>

      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="flex items-center gap-[53px] self-stretch text-4">
          <div className="w-[64px] h-[28px] flex">
            <p className="font-bold ">Writers</p>
            <p className="invisible">jjjjjkk</p>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-wrap">
              {data
                .filter(
                  (a) =>
                    a.department === "Writing" &&
                    a.known_for_department === "Writing"
                )
                .slice(0, 3)
                .map((a) => (
                  <p key={a.id} className="font-normal">
                    {a.name} ·
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="flex p-1 flex-col items-start gap-[10px] self-stretch">
          <div className="h-[1px] self-stretch border-[1px] solid text-[#E4E4E7]" />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-1 self-stretch">
        <div className="flex items-center gap-[53px] self-stretch text-4">
          <div className="w-[64px] h-[28px] flex">
            <p className="font-bold w-full">Stars</p>
            <p className="invisible">jjjjjkk</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-wrap">
              {data2.slice(0, 5).map((a) => (
                <p key={a.id} className="font-normal">
                  {a.name} ·
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex p-1 flex-col items-start gap-[10px] self-stretch">
          <div className="h-[1px] self-stretch border-[1px] solid text-[#E4E4E7]" />
        </div>
      </div>
    </div>
  );
};
