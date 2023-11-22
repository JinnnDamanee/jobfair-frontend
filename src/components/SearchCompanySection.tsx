"use client";

import { Button } from "./ui/button";
import SearchCompanyCard from "./SearchCompanyCard";
import { Input } from "./ui/input";
import { getAllCompany } from "@/actions/company";
import { Company } from "@/types/company";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";
import { revalidatePath, revalidateTag } from "next/cache";
import { useSession } from "next-auth/react";

type SearchCompanyProps = {
  search?: string;
};

export default function SearchCompanySection() {
  const [search, setSearch] = useState<string>("");
  const [company, setCompany] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchCompany = async ({ search }: SearchCompanyProps) => {
    setIsLoading(true);
    const data = await getAllCompany(search);
    if (!data.success) {
      toast({
        title: "Error",
        description: "Failed to get companies",
      });
    }
    setCompany(data.data);
    setIsLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    searchCompany({
      search,
    });
  };

  useEffect(() => {
    searchCompany({
      search: "",
    });
  }, []);

  return (
    <div className="container max-[1150px]:p-0">
      <div id="search" className="container flex flex-col gap-4 p-10">
        <form onSubmit={(e) => handleSearch(e)} className="flex gap-2">
          <Input
            placeholder="Search Company..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button type="submit">Search</Button>
        </form>
        {isLoading ? (
          <>
            <SkeletonSearchCompanyCard />
            <SkeletonSearchCompanyCard />
          </>
        ) : (
          <>
            {company.length > 0 ? (
              <>
                {company.map((c, idx) => {
                  return <SearchCompanyCard key={idx} {...c} />;
                })}
              </>
            ) : (
              <div className="w-full p-20">
                <p className="text-center text-muted-foreground">
                  <span className=" block text-xl font-bold text-black">
                    No Company founded
                  </span>
                  <span>Try using another Job keyword</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const SkeletonSearchCompanyCard = () => {
  return (
    <div className="itme p- flex h-[170px] w-full space-x-8 px-8 py-4">
      <Skeleton className="w-[150px]" />
      <div className="w-full space-y-2">
        <Skeleton className="h-3/5" />
        <Skeleton className="h-2/5" />
      </div>
    </div>
  );
};
