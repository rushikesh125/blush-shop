// import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";
import Link from "next/link";
const fetchProducts = async (url)=>{
  const response = await fetch(url);
  const productsData = response.json();
  return productsData;
}
export default async function Home() {
  const products = await fetchProducts("https://fakestoreapi.com/products");
  // console.log(products);

  return (
    <>
      {/* <div className="text-center">Hello World</div> */}
      <div className="flex flex-wrap box-border justify-evenly p-3 ">
        {products &&
          products.map((item) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="w-full z-10 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden m-1 p-4 transform transition duration-300 hover:scale-105"
            >
              <div className="w-full  mb-4">
                <img
                  className="w-44 h-44 object-cover mx-auto"
                  alt="product-img"
                  src={item.image}
                />
              </div>
              <div className="">
                <h1 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h1>

                <div className="flex items-center mt-2 mb-5 text-center">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.floor(item.rating.rate) }).map(
                      (_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      )
                    )}
                    {item.rating.rate < 5 && (
                      <svg
                        className="w-4 h-4 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    )}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                    {item.rating.rate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <AddToCartBtn itemId={item.id}/>
                </div>
              </div>
            </Link>
          ))}
      </div>

      
    </>
  );
}
