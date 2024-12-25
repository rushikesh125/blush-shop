
import React from "react";
import CategoryArea from "@/components/CategoryArea";
import ProductInfoCard from "@/components/ProductInfoCard";
import { getProduct } from "@/utils/firebase/products/read_server";

const ProductPage = async ({ params }) => {
  const {id} = await params;
  const productData = await getProduct(id);
  // const productInfo = await fetchProductInfo(productId);
  // console.log(productInfo);
  // if (!productInfo.success) {
  //   return <div>Error Fetching Data</div>;
  // }
  

  return (
    <>
      <CategoryArea />
      <ProductInfoCard {...productData} />
      {/* <ImageSlideShow ></ImageSlideShow> */}
    </>
  );
};

export default ProductPage;
