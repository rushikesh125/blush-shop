"use client"
import ProductCard from "@/components/ProductCard";
import { useProduct } from "@/utils/firebase/products/read";
import { useUser } from "@/utils/firebase/user/read";
import React from "react";
import { useSelector } from "react-redux";


const FavoritesPage = () => {
    const user = useSelector(state=>state.user);
    console.log('user:',user);
    const {data,isLoading} = useUser({uid:user?.uid})
    if(isLoading){
      return <div className="w-screen h-screen flex justify-center items-center">loading...</div>
    }
  return (
    <>
      <div className="px-5 py-5 md:px-10 lg:px-20">
        <h3 className="text-center text-2xl text-accent-color"> Favorite Products</h3>
        <div className="flex flex-wrap justify-evenly py-5  gap-y-2 md:gap-x-2 md:gap-y-6">
            {data?.favorites?.length >=1 ? data?.favorites?.map((item) => (
              <ProductItem key={item} productId={item}/>
            )):<div className="text-accent-color text-xl">No Favorite Items</div>}
          </div>
      </div>
    </>
  );
};

export default FavoritesPage;

const ProductItem = ({productId})=>{
    const {data:product} = useProduct({productId:productId})
    // console.log('ProductiTem:',product);
    return <ProductCard {...product}/>
}