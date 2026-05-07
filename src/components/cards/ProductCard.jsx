"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, discount, ratings, reviews, sold } =
    product;

  // Calculate discounted price
  const finalPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="w-full max-w-[380px] rounded-2xl bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Product Image */}
      <figure className="relative w-full h-[260px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            -{discount}%
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-2 min-h-[56px]">
          {title}
        </h2>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mt-2 text-sm">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 font-medium">{ratings}</span>
          </div>

          <span className="text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Sold */}
        <p className="text-sm text-gray-500 mt-1">{sold} sold</p>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-primary">৳{finalPrice}</span>

          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          {/* Add to Cart */}
          <button className="btn btn-primary flex-1 flex items-center gap-2">
            <FaShoppingCart />
            Add to Cart
          </button>

          {/* View Details */}
          <Link
            href={`/products/${_id}`}
            className="btn btn-outline btn-primary flex-1"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
