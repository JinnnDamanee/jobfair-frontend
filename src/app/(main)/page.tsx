import Banner from "@/components/Banner";
import SearchCompanySection from "@/components/SearchCompanySection";

// const mockCompany: Company[] = [
//   {
//     id: "1",
//     name: "TMBThanachart Bank Public Company Limited",
//     position: "UX Research",
//     image: "/ttb.png",
//     jd: "UX Research",
//     location: "Bangkok",
//     tel: "0621432614",
//   },
//   {
//     id: "2",
//     name: "TMBThanachart Bank Public Company Limited",
//     position: "Frontend Developer",
//     image: "/ttb.png",
//     jd: "Do Frontend",
//     location: "Bangkok",
//     tel: "0621432614",
//   },
// ];

const Home = () => {
  return (
    <>
      <Banner />
      <SearchCompanySection />
    </>
  );
};

export default Home;
