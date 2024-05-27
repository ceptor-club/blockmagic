"use client";

import { useState } from "react";
import Filter from "../components/ui/filter";
import ProductCard from "../components/ui/product-card";
import Search from "../components/ui/search";
import Sort from "../components/ui/sort";
import Pagination from "~~/components/layout/Pagination";

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
    <main className="min-h-screen">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="flex justify-end py-5 md:py-5 space-x-6">
          <Search placeholder="Search Artwork" className="w-[610px]" />
          <Sort />
        </div>
        <div className="flex flex-col md:flex-row items-start">
          <Filter />
          {/* Featured */}
          <div className="flex-1">
            <h1 className="font-milonga text-5xl my-8">Featured</h1>
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
        {/* Recommended Section */}
        <div className="flex-1 ml-52">
          <h1 className="font-milonga text-5xl my-8">Recommended</h1>
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
    </main>
  );
}
