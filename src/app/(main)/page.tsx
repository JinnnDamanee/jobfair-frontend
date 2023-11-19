"use client";

import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    ("TODO: Search");
    console.log(search);
  };

  return (
    <>
      <Banner />
      <div id="search" className="container flex flex-col gap-4 p-10">
        <form onSubmit={(e) => handleSearch(e)} className="flex gap-2">
          <Input
            placeholder="Search Company..."
            onChange={(e) => {
              if (e.target.value) {
                setSearch(e.target.value);
              }
            }}
          />
          <Button type="submit">Search</Button>
        </form>
        <MockCard />
        <MockCard />
        <MockCard />
        <MockCard />
      </div>
    </>
  );
};

const MockCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default Home;
