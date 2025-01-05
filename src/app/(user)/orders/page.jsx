"use client";
import Loading from "@/app/loading";
import CustomBtn3 from "@/components/CustomBtn3";
import TrashIcon from "@/components/SvgIcons/TrashIcon";
import { useOrders } from "@/utils/firebase/orders/read";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const user = useSelector((state) => state.user);
  // console.log('user:',user);
  const { data: orders, error, isLoading } = useOrders({ uid: user.uid });
  console.log("orders:", orders);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="w-full px-4 my-4">
        <h3 className="text-center text-accent-color text-2xl font-semibold">
          My Orders
        </h3>
        {(!orders || orders.length === 0) && (
          <div className="my-10 w-full">
            <div className="w-full md:w-1/2 mx-auto flex justify-center items-center">
              <img src="/svg/no-orders.svg" alt="no-orders" className="w-52" />
            </div>
            <h3 className="text-xl text-center">You have no Orders</h3>
          </div>
        )}
        <div className="mx-auto w-full md:w-9/12 lg:w-7/12 my-5 flex flex-col gap-2">
          {orders.map((item, index) => (
            <div key={index} className="w-full border-y my-3 py-2">
              <div className="text-xs py-1 text-slate-500">
                {item?.createdAt.toDate().toLocaleString()}
              </div>
              <div className="flex items-center justify-start">
                <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                  {item.metaData?.paymentMode}
                </span>
                {item.metaData.isPaid ? (
                  <span className="bg-green-200 text-green-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                    Paid
                  </span>
                ) : (
                  <span className="bg-yellow-200 text-yellow-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                    Not Paid
                  </span>
                )}
                <span className="bg-purple-200 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                  {item?.metaData?.ProductStatus}
                </span>
              </div>
              

              <div>
                {item.productList.map((pro) => (
                  <div key={pro.id} className="my-4 flex items-center">
                    <div className="w-3/12 md:w-2/12 flex items-center justify-center">
                      <img
                        src={`${pro.color[0].url}`}
                        alt="product-img"
                        className="w-28"
                      />
                    </div>
                    <div className="w-9/12 md:w-10/12">
                      <Link
                        href={`/product/${pro.product.id}`}
                        className="text-lg hover:underline"
                      >
                        {pro.product.productname}
                      </Link>
                      <div className="text-sm">
                        color :{" "}
                        <span className="bg-black text-white px-2 rounded-full">
                          {pro.color[0].color}
                        </span>
                      </div>
                      <div className="text-sm">
                        size :{" "}
                        <span className="bg-accent-color text-white px-2 rounded-full">
                          {pro.size}
                        </span>
                      </div>
                      <div className="text-sm">
                        &#8377;{pro.product.price} x{pro.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-evenly gap-5 ">
                <CustomBtn3
                  className={`text-red-700 bg-red-200 px-3 rounded-md hover:bg-red-300`}
                >
                <TrashIcon/>  Cancle
                </CustomBtn3>
                <div className="text-xs text-slate-600">
                  {item.address?.address}&nbsp;
                  {item.address?.city}&nbsp;
                  {item.address.state}&nbsp;
                  {item.address.zip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
