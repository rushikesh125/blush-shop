"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import CustomBtn3 from "./CustomBtn3";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
const Checkout = ({ productList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: 9876543210,
    address: "Flat No. 23, Sunshine Apartments, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001",
    orderNote: "Please deliver between 10 AM and 5 PM."
  });

  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  //   orderNote: "",
  // });
  
  if (!productList.length >= 1) {
    return <div>Products Not Found</div>;
  }

  console.log("ProductList:", productList);
  const totalPrice = productList.reduce((prev, curr) => {
    return prev + parseInt(curr?.quantity) * parseInt(curr?.product.price);
  }, 0);
  


//    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Form Data:", formData);
  //     // Add your form submission logic here
  //   };

  const handlePlaceOrder =async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    setIsLoading(true);
    try {
      if (!allFieldsFilled) {
        throw new Error("Please fill all details");
      }
      console.log("Form Data:", formData);

      if (totalPrice <= 0) {
        throw new Error("Price should be greater than 0");
      }

      await new Promise((res)=>setTimeout(res,2000))
      toast.success("Order Placed");
      confetti();
      router.push(`/account`)
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <main className="flex flex-col md:flex md:flex-row gap-2">
        <section className="w-full md:w-1/2 flex-1  p-1">
          <div className="text-center font-semibold">Shipping Details</div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="phone"
                id="phone"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="zip"
                id="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Enter your ZIP code"
                required
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
              />
            </div>
            <div>
              <textarea
                name="orderNote"
                id="orderNote"
                value={formData.orderNote}
                onChange={handleChange}
                placeholder="Additional instructions or notes"
                className="mt-1 block w-full p-2 border  rounded-md outline-none"
                rows="4"
              ></textarea>
            </div>
            {/* <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Proceed to Payment
              </button> */}
          </form>
        </section>
        <section className="w-full md:w-1/2 flex-1  p-1">
          <div className="w-full">
            <h1 className="text-lg font-semibold text-center">Products</h1>
            <div className="flex flex-col gap-1">
              {productList.length >= 1 ? (
                productList.map((item) => {
                  return (
                    <div key={item.id}>
                      <div className="flex items-center justify-between  my-2 border-b">
                        <div className="flex items-center">
                          <div className="w-16  ">
                            <img
                              src={`${item.color[0].url}`}
                              alt="product-img"
                              className="w-full"
                            />
                          </div>
                          <div className="justify-self-start">
                            <h2>{item.product.productname}</h2>
                            <p className="text-xs text-slate-600">
                              &#8377;{item.product.price} <span>x</span>&nbsp;
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-accent-color font-semibold p-1 ">
                          &#8377;
                          {parseInt(item.product.price) *
                            parseInt(item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No Product Found , please Select Products Properly</div>
              )}
            </div>
            <div className="w-full flex justify-between">
              <h3 className="font-semibold">Total Price</h3>
              <h3>&#8377;{totalPrice}</h3>
            </div>
          </div>
          {/* place order area  */}
          <div className="border rounded-md p-2 flex flex-col gap-2 my-5 md:my-10">
            <div className="text-lg">Payment Mode </div>
            <div className=" text-xs flex items-center ">
              <input type="checkbox" />
              &nbsp; i agree with the
              <span className="text-blue-500 font-semibold">
                &nbsp; terms & conditions
              </span>
            </div>
            <CustomBtn3
            onClick={handlePlaceOrder}
            isLoading={isLoading}
              className={`bg-black text-white px-2 py-1 rounded-lg w-full hover:bg-slate-800`}
            >
              Place Order
            </CustomBtn3>
          </div>
        </section>
      </main>
    </>
  );
};

export default Checkout;