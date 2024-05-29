"use client";

import { useState } from "react";
import Image from "next/image";
import Artist from "~~/components/assets/artist.jpg";
import Pagination from "~~/components/layout/Pagination";
import ProductCard from "~~/components/ui/artpageProductCard";
import { Button } from "~~/components/ui/button";

const products = [
  {
    artistName: "Takashi Murakami",
    artName: "Flowers Blooming",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A vibrant floral artwork by Takashi Murakami",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Beeple",
    artName: "Everydays: The First 5000 Days",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A digital collage artwork by Beeple",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Banksy",
    artName: "Girl with Balloon",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A street art piece of a girl releasing a heart-shaped balloon by Banksy",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Yayoi Kusama",
    artName: "Infinity Nets",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Yayoi Kusama",
    artName: "Infinity Nets",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
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
            <ProductCard
              key={products[0].artName}
              href={`/${products[0].artName}`}
              imgSrc={products[0].imgSrc}
              imgAlt={products[0].imgAlt}
              tags={products[0].tags}
              isAI={true}
              isFavourite={false}
              description={products[0].description}
            />
          </div>
          <div className="flex flex-col items-start space-y-2 md:space-y-4">
            <div className="relative flex">
              <Image src={Artist} alt="artist profile picture" className="w-[86px] h-[83px]" />
              <div className="ml-4 ">
                <p className="text-3xl font-milonga m-0">Artist Name</p>
                <p className="text-4xl font-oswald">Title of Artwork</p>
              </div>
            </div>

            {/* transparent div for vertical margin */}
            <div className="h-[140px]"></div>

            {/* cost of art */}
            <div>
              <span className="text-xs ml-10">Cost</span>
              <p className="ml-10 m-0">{products[0].amount}</p>
            </div>

            {/* button */}
            <div className="ml-10 w-[400px]">
              <Button variant="default" size={"lg"} className="w-full text-2xl">
                Buy This Artwork
              </Button>
              <Button variant="outline" size={"lg"} className="w-full text-2xl mt-5">
                Commission This Artist
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {/* more items */}
          <div className="flex-1">
            <h1 className="font-milonga text-4xl my-8">More by Artist Name</h1>
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
