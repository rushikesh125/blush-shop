
import React from "react";
import CategoryArea from "@/components/CategoryArea";
import ProductInfoCard from "@/components/ProductInfoCard";
import { getProduct, getProductsByCategoriesName } from "@/utils/firebase/products/read_server";
import ProductCard from "@/components/ProductCard";

const ProductPage = async ({ params }) => {
  const {id} = await params;
  const productData = await getProduct(id);
  // console.log('productdAta:',productData);
  const relatedProducts = await getProductsByCategoriesName({catArray:productData?.category})
  // console.log('relatedProducts:',relatedProducts);
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
      <div className="my-10"> 
        <h1 className="text-center font-semibold">Products with Similar Category</h1>
        <div className="flex flex-wrap justify-evenly py-5  gap-y-2 md:gap-x-2 md:gap-y-6">
            {relatedProducts?.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
      </div>
    </>
  );
};

export default ProductPage;
