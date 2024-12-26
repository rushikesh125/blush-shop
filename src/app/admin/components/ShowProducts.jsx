"use client";
import React, { useState } from "react";
import EditIcon from "@/components/SvgIcons/EditIcon";
import TrashIcon from "@/components/SvgIcons/TrashIcon";
import CustomBtn2 from "@/components/CustomeBtn2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProducts } from "@/utils/firebase/products/read"; // Adjust the import path as necessary
import { deleteProduct } from "@/utils/firebase/products/delete";

const ShowProducts = () => {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-400">Error Occurred</div>;
  }

  return (
    <div className="w-full bg-white p-2 rounded-md">
      {/* <div>Products</div> */}
      <div className="mt-5 overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th className="p-1 text-center border-b">Sr. No.</th>
              <th className="p-1 border-b">Product Preview</th>
              <th className="p-1 border-b">Product Name</th>
              <th className="p-1 border-b">Price</th>
              <th className="p-1 border-b">Stock</th>
              <th className="p-1 border-b">Orders</th>
              <th className="p-1 border-b">Status</th>
              <th className="p-1 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <ProductRow item={item} index={index} key={item.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowProducts;

const ProductRow = ({ item, index }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        setIsLoading(true);
        const res = await deleteProduct({ id: item?.id });
        if (res) {
          toast.success("Product deleted successfully!");
        }
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/products/editproduct?id=${item?.id}`);
  };

  return (
    <tr className="border-b">
      <td className="p-1 text-center">{index + 1}</td>
      <td className="p-1">
        <img
          src={`${item?.colors[0].url}`}
          alt="Product-img"
          className="w-14 mx-auto"
        />
      </td>
      <td className="p-1">{item?.productname}</td>
      <td className="p-1">${item?.price}</td>
      <td className="p-1">{item?.stock}</td>
      <td className="p-1">{item?.orders ?? 0}</td>
      <td className="p-1 text-center">
        {(item?.stock - item?.orders || 0) <= 0 ? (
          <div className="text-xs bg-green-200 text-green-600 font-semibold p-1 rounded-md">
            Available
          </div>
        ) : (
          <div className="text-xs bg-red-200 text-red-600 font-semibold p-1 rounded-md">
            Not Available
          </div>
        )}
      </td>
      <td className="p-1 flex justify-evenly items-center">
        <CustomBtn2
          onClick={handleUpdate}
          className="p-2 bg-slate-100 rounded-md hover:bg-slate-200 mx-1"
        >
          <EditIcon className="text-green-500 cursor-pointer" />
        </CustomBtn2>
        <CustomBtn2
          onClick={handleDelete}
          isLoading={isLoading}
          className="p-2 bg-slate-100 rounded-md hover:bg-slate-200 mx-1"
        >
          <TrashIcon className="text-red-500 cursor-pointer" />
        </CustomBtn2>
      </td>
    </tr>
  );
};
