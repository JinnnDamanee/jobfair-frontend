import Banner from "@/components/Banner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <>
      <Banner />
      <div id="search" className="container flex flex-col gap-4 p-10">
        <Input placeholder="Search Company..." />
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
