"use client"
const AddToCartBtn = ({itemId}) => {
    const handleAddToCart = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log('item id:'+ itemId);
    }
  return (
    <button
      className="text-white bg-black font-medium rounded-lg text-sm px-4 py-2"
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  )
}

export default AddToCartBtn