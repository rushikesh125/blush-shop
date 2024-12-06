"use client"
const AddToCartBtn = ({itemId}) => {
    const handleAddToCart = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log('item id:'+ itemId);
    }
  return (
    <button
      className=" bg-pink-500 text-white font-semibold  rounded-md text-sm px-6 py-3"
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  )
}

export default AddToCartBtn