"use client";

import { useState } from "react";
import Image from "next/image";
import Artist from "../../components/assets/artist.jpg";
import Pagination from "../../components/layout/Pagination";
import ProductCard from "../../components/ui/product-card";
import { Heart } from "lucide-react";
import { Button } from "~~/components/ui/button";

const products = [
  {
    artistName: "Takashi Murakami",
    artName: "Flowers Blooming",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A vibrant floral artwork by Takashi Murakami",
  },
  {
    artistName: "Beeple",
    artName: "Everydays: The First 5000 Days",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A digital collage artwork by Beeple",
  },
  {
    artistName: "Banksy",
    artName: "Girl with Balloon",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A street art piece of a girl releasing a heart-shaped balloon by Banksy",
  },
  {
    artistName: "Yayoi Kusama",
    artName: "Infinity Nets",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  },
  {
    artistName: "Yayoi Kusama",
    artName: "Infinity Nets",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  },
];

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main>
      <div className="mx-32">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-20">
          <div className="flex-shrink-0">
            <Image
              alt="artist image"
              className="object-cover h-full w-full md:w-auto md:h-[400px] group-hover:opacity-50 transition-opacity"
              src={Artist}
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col items-start space-y-2 md:space-y-4">
            <h1 className="text-5xl font-bold font-milonga ml-10">Artist Name</h1>
            <p className="text-base text-white ml-10 w-[630px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales porta semper. Vivamus dapibus lorem
              posuere dui semper, et malesuada dui lacinia.
            </p>
            <div className="ml-10 flex">
              <Heart className="fill-white mr-2.5" />
              <span>Follow This Artist</span>
            </div>
            {/* transparent div for vertical margin */}
            <div className="h-[168px]"></div>
            {/* button */}
            <div className="ml-10 w-[400px]">
              <Button variant="default" size={"lg"} className="w-full text-2xl">
                Commission This Artist
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {/* Featured */}
          <div className="flex-1">
            <h1 className="font-milonga text-5xl my-8">Gallery</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10">
              {currentProducts.map(product => (
                <ProductCard
                  key={product.artName}
                  href={`/${product.artName}`}
                  imgSrc={product.imgSrc}
                  imgAlt={product.imgAlt}
                  artist={product.artistName}
                  title={product.artName}
                  price={product.amount}
                  tags={product.tags}
                  isAI={true}
                  isFavourite={false}
                />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </main>
  );
}
