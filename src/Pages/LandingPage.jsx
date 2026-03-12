import FooterSection from "../Features/Footer/FooterSection";
import { Link } from 'react-router-dom';
import { selectuser } from "../Features/Auth/authSlice";
import { useSelector } from "react-redux";


const data = [{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  "category": "beauty",
  "price": 9.99,
  "discountPercentage": 7.17,
  "rating": 4.94,
  "stock": 5,
  "tags": [
    "beauty",
    "mascara"
  ],
  "brand": "Essence",
  "sku": "RCH45Q1A",
  "weight": 2,
  "dimensions": {
    "width": 23.17,
    "height": 14.43,
    "depth": 28.01
  },
  "warrantyInformation": "1 month warranty",
  "shippingInformation": "Ships in 1 month",
  "availabilityStatus": "Low Stock",
  "reviews": [
    {
      "rating": 2,
      "comment": "Very unhappy with my purchase!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "John Doe",
      "reviewerEmail": "john.doe@x.dummyjson.com"
    },
    {
      "rating": 2,
      "comment": "Not as described!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Nolan Gonzalez",
      "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
    },
    {
      "rating": 5,
      "comment": "Very satisfied!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Scarlett Wright",
      "reviewerEmail": "scarlett.wright@x.dummyjson.com"
    }
  ],
  "returnPolicy": "30 days return policy",
  "minimumOrderQuantity": 24,
  "meta": {
    "createdAt": "2024-05-23T08:56:21.618Z",
    "updatedAt": "2024-05-23T08:56:21.618Z",
    "barcode": "9164035109868",
    "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
  },
  "images": [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
  ],
  "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
},
{
  "id": 2,
  "title": "Eyeshadow Palette with Mirror",
  "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
  "category": "beauty",
  "price": 19.99,
  "discountPercentage": 5.5,
  "rating": 3.28,
  "stock": 44,
  "tags": [
    "beauty",
    "eyeshadow"
  ],
  "brand": "Glamour Beauty",
  "sku": "MVCFH27F",
  "weight": 3,
  "dimensions": {
    "width": 12.42,
    "height": 8.63,
    "depth": 29.13
  },
  "warrantyInformation": "1 year warranty",
  "shippingInformation": "Ships in 2 weeks",
  "availabilityStatus": "In Stock",
  "reviews": [
    {
      "rating": 4,
      "comment": "Very satisfied!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Liam Garcia",
      "reviewerEmail": "liam.garcia@x.dummyjson.com"
    },
    {
      "rating": 1,
      "comment": "Very disappointed!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Nora Russell",
      "reviewerEmail": "nora.russell@x.dummyjson.com"
    },
    {
      "rating": 5,
      "comment": "Highly impressed!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Elena Baker",
      "reviewerEmail": "elena.baker@x.dummyjson.com"
    }
  ],
  "returnPolicy": "30 days return policy",
  "minimumOrderQuantity": 32,
  "meta": {
    "createdAt": "2024-05-23T08:56:21.618Z",
    "updatedAt": "2024-05-23T08:56:21.618Z",
    "barcode": "2817839095220",
    "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
  },
  "images": [
    "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
  ],
  "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
},
{
  "id": 3,
  "title": "Powder Canister",
  "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
  "category": "beauty",
  "price": 14.99,
  "discountPercentage": 18.14,
  "rating": 3.82,
  "stock": 59,
  "tags": [
    "beauty",
    "face powder"
  ],
  "brand": "Velvet Touch",
  "sku": "9EN8WLT2",
  "weight": 8,
  "dimensions": {
    "width": 24.16,
    "height": 10.7,
    "depth": 11.07
  },
  "warrantyInformation": "2 year warranty",
  "shippingInformation": "Ships in 1-2 business days",
  "availabilityStatus": "In Stock",
  "reviews": [
    {
      "rating": 5,
      "comment": "Very happy with my purchase!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Ethan Thompson",
      "reviewerEmail": "ethan.thompson@x.dummyjson.com"
    },
    {
      "rating": 4,
      "comment": "Great value for money!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Levi Hicks",
      "reviewerEmail": "levi.hicks@x.dummyjson.com"
    },
    {
      "rating": 5,
      "comment": "Highly impressed!",
      "date": "2024-05-23T08:56:21.618Z",
      "reviewertitle": "Hazel Gardner",
      "reviewerEmail": "hazel.gardner@x.dummyjson.com"
    }
  ],
  "returnPolicy": "60 days return policy",
  "minimumOrderQuantity": 25,
  "meta": {
    "createdAt": "2024-05-23T08:56:21.618Z",
    "updatedAt": "2024-05-23T08:56:21.618Z",
    "barcode": "0516267971277",
    "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
  },
  "images": [
    "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png"
  ],
  "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
},
]

const heroSectionData = {
  title: "Discover the Best Deals on Trendy Fashion & Accessories",
  description:
    "Shop the latest collections at unbeatable prices. Limited-time offers just for you!",
  backgroundImage:
    "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg",
  buttons: [
    {
      text: "Shop Now",
      style: "bg-blue-600 text-white hover:bg-blue-700",
      link: "/home",
    },
    {
      text: "Sign Up",
      style:
        "border border-white text-white hover:bg-white hover:text-black",
      link: "/auth/signup",
    },
  ],
};


export default function HeroSection() {

  const user = useSelector(selectuser);

  return (
    <>
      <section
        className="relative bg-gray-900 bg-opacity-60 py-20 px-6 flex flex-col items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroSectionData.backgroundImage}')`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative max-w-3xl text-white z-10">
          <h1 className="text-4xl font-bold md:text-5xl">
            {heroSectionData.title}
          </h1>
          <p className="mt-4 text-lg">{heroSectionData.description}</p>
          <div className="mt-6 flex justify-center gap-4">
            {heroSectionData.buttons.map((btn, idx) =>{ 
              if(user && btn.text === "Sign Up"){
                return null;
              } else 
              return (
              <Link
                key={idx}
                to={btn.link}
                className={`px-6 py-3 rounded-lg text-lg font-medium ${btn.style}`}
              >
                {btn.text}
              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Trending Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.slice(0, 3).map((product, index) => {
            const firstSentence = product.description.split(".")[0] + ".";

            return (
              <div key={index} className="bg-gray-100 p-6 rounded-lg text-center shadow-lg">
                <img
                  src={product.images[0] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600 mt-2">{firstSentence}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <FooterSection />


    </>
  );
}

