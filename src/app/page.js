// import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";
import CategoryArea from "@/components/CategoryArea";
import ProductCard from "@/components/ProductCard";
import { bannerImg } from "@/utils/constants";
import Link from "next/link";
const fetchProducts = async (url) => {
  const response = await fetch(url);
  const productsData = response.json();
  return productsData;
};
export default async function Home() {
  const products = await fetchProducts("https://fakestoreapi.com/products");
  // console.log(products);

  return (
    <>
      {/* <div className="text-center">Hello World</div> */}
      <CategoryArea/>
      <div className="px-5 py-5 md:px-10 lg:px-20 md:pb-10">
        <div className="poster-area w-full">
          <img src={bannerImg} alt="banner-img" className="w-full object-cover" /> 
        </div>
        <div className="my-10 md:my-20">
          <h1 className="text-center text-2xl">New Arrival</h1>
          <div className="flex flex-wrap justify-evenly py-5  gap-y-2 md:gap-x-2 md:gap-y-6">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          
          
          </div>
        </div>
      </div>
    </>
  );
}
