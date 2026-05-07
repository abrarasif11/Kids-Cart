import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import React from "react";
import { FaCartPlus, FaStar, FaBolt, FaShieldAlt } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return {
    title: product.title,
    description:
      product.description.slice(0, 160) ||
      "Educational toy designed to help kids learn through play.",

    openGraph: {
      title: product.title,
      description:
        "Fun and educational learning toy for kids. Safe, colorful, and engaging.",
      images: [
        {
          url: product.image || "https://i.ibb.co.com/Ld7J2ZYq/image.png",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: "Fun and educational learning toy for kids.",
      images: [product.image || "https://i.ibb.co.com/Ld7J2ZYq/image.png"],
    },
  };
}

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  const {
    title,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="sticky top-24">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl group">
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-5 left-5 z-20 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {discount}% OFF
                </div>
              )}

              <Image
                width={700}
                height={700}
                src={image}
                alt={title}
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <p className="uppercase tracking-widest text-sm text-primary font-semibold mb-2">
                Premium Collection
              </p>

              <h1 className="text-4xl font-extrabold leading-tight text-base-content">
                {title}
              </h1>
            </div>

            {/* Ratings */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < Math.round(ratings) ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-500">
                <span className="font-semibold text-base-content">
                  {ratings}
                </span>{" "}
                ({reviews} reviews)
              </p>

              <div className="badge badge-success badge-outline px-3 py-3">
                {sold}+ Sold
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <h2 className="text-5xl font-black text-primary">
                ৳{discountedPrice}
              </h2>

              {discount > 0 && (
                <span className="text-2xl line-through text-gray-400">
                  ৳{price}
                </span>
              )}
            </div>

            {/* Short Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200">
                <FaBolt className="text-primary text-xl" />
                <div>
                  <p className="font-semibold">Fast Delivery</p>
                  <p className="text-sm text-gray-500">
                    Delivery within 2-4 days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200">
                <FaShieldAlt className="text-primary text-xl" />
                <div>
                  <p className="font-semibold">Secure Quality</p>
                  <p className="text-sm text-gray-500">100% trusted product</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="btn btn-primary flex-1 h-14 text-lg rounded-2xl">
                <FaCartPlus className="text-xl" />
                Add To Cart
              </button>
            </div>

            {/* Key Features */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-5">Key Features</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {info?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-base-200 rounded-2xl p-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>

                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-20">
          <div className="bg-base-200 rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl font-bold mb-8">Product Description</h2>

            <div className="space-y-6 text-gray-700 leading-8 text-lg">
              {description?.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Q&A Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Questions & Answers</h2>

          <div className="space-y-5">
            {qna?.map((item, i) => (
              <div
                key={i}
                className="bg-base-200 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition"
              >
                <p className="font-bold text-lg">Q: {item.question}</p>

                <p className="text-gray-600 mt-3 leading-7">A: {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
