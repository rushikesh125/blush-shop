import ImageSlideShow from "@/components/ImageSlideshow";
import React from "react";
import { fetchProductInfo } from "@/utils/utils";
// import AddToCartBtn from "@/components/AddToCartBtn";
import CategoryArea from "@/components/CategoryArea";
import ProductInfoCard from "@/components/ProductInfoCard";

const ProductPage = async ({ params }) => {
  const {id} = await params;
  // const productInfo = await fetchProductInfo(productId);
  // console.log(productInfo);
  // if (!productInfo.success) {
  //   return <div>Error Fetching Data</div>;
  // }
  const productInfo = {
    id: 1,
    title: "Baggy Offshoulder Sweater",
    price: "1,499.00",
    color: ["red", "black"],
    image:
      "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5405-1536x1536.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident distinctio ea consectetur aut. Debitis voluptates, id deleniti consectetur eveniet cum.",
  };

  return (
    <>
      <CategoryArea />
      <ProductInfoCard {...productInfo} />
      {/* <ImageSlideShow ></ImageSlideShow> */}
    </>
  );
};

export default ProductPage;
