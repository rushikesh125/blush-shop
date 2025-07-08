import CategoryArea from "@/components/CategoryArea";
import ProductCard from "@/components/ProductCard";
import CaretUpIcon from "@/components/SvgIcons/CaretUpIcon";
import { bannerImg } from "@/utils/constants";
import {  getProductsByCategoryName } from "@/utils/firebase/products/read_server";
import { scrollToTop } from "@/utils/utils";
export default async function Home() {
  const docs = await getProductsByCategoryName({catName:"new Arrived"});
  // console.log(docs);
  console.log();
  
  if(!docs){
    return <div className="w-screen h-screen flex justify-center items-center">Error Occured Please Try Again</div>
  }
  return (
    <>
      {/* <div className="text-center">Hello World</div> */}
      <div className=" w-full ">
        <CategoryArea />
      </div>
      <CaretUpIcon />
      <div className="px-5 py-5 md:px-10 lg:px-20 md:pb-10">
        <div className="poster-area w-full aspect-video">
          <img
            src={bannerImg}
            alt="banner-img"
            className="w-full object-cover"
          />
        </div>
        <div className="my-10 md:my-20">
          <h1 className="text-center text-2xl">New Arrival</h1>
          <div className="flex flex-wrap justify-evenly py-5  gap-y-2 md:gap-x-2 md:gap-y-6">
            {docs?.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
