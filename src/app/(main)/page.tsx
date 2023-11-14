import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="container flex flex-col gap-4 p-10">
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
