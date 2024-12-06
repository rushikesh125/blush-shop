// import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";
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
      <div className="Category-options  gap-x-8 hidden md:flex justify-center mt-5 py-5">
        <Link href={`/`} className="hover:text-pink-400">All Products</Link>
        <Link href={`/`} className="hover:text-pink-400">Top</Link>
        <Link href={`/`} className="hover:text-pink-400">Pant</Link>
        <Link href={`/`} className="hover:text-pink-400">Dress</Link>
        <Link href={`/`} className="hover:text-pink-400">Coord set</Link>
        <Link href={`/`} className="hover:text-pink-400">Bundles</Link>
        <Link href={`/`} className="hover:text-pink-400">Under ₹499</Link>
      </div>
      <div className="px-5 md:px-10 lg:px-20 pb-10">
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
