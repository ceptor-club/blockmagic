import { Button } from "./button";
import { Checkbox } from "./checkbox";
// import { Input } from "./input";
import { Label } from "./label";
import Search from "./search";

export default function Filter() {
  return (
    <div className="rounded-lg p-6 mr-5 w-auto">
      <div className="grid gap-4">
        {/* browse */}
        <div>
          <h3 className="text-lg font-bold mb-2 font-milonga">Browse</h3>
          <div className="grid gap-4  text-sm leading-5">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="featured" className="mr-5 my-2.5" />
              Featured
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="recommended" className="mr-5 my-2.5" />
              Recommended
            </Label>

            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="commission" className="mr-2 my-2.5" />
              Open For Commissions
            </Label>
          </div>
        </div>
        {/* game */}
        <div>
          <h3 className="text-lg font-extrabold mb-2 font-milonga">Game</h3>
          <div className="my-3 mb-5 w-[141px]">
            <Search placeholder="Search Game" />
          </div>
          <div className="grid gap-4">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="dungeons" className="mr-5 my-2.5" />
              Dungeons & Dragons
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="game" className="mr-5 my-2.5" />
              Game Name
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="call" className="mr-5 my-2.5" />
              Call of Cthufu
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="shadow" className="mr-5 my-2.5" />
              Shadownun
            </Label>
          </div>
        </div>
        {/* style and genre */}
        <div>
          <h3 className="text-lg font-extrabold mb-2 font-milonga">Style & Genre</h3>
          <div className="my-3 mb-5 w-[60%]">
            <Search placeholder="Search Style" className="w-[141px]" />
          </div>

          <div className="grid gap-4">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="fantasy" className="mr-5 my-2.5" />
              Fantasy
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="scifi" className="mr-5 my-2.5" />
              Sci-Fi
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="horror" className="mr-5 my-2.5" />
              Horror
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="anime" className="mr-5 my-2.5" />
              Anime
            </Label>
          </div>
        </div>
        {/* type */}
        <div>
          <h3 className="text-lg font-extrabold mb-2 font-milonga">Type</h3>
          <div className="grid gap-4">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-under50" className="mr-5 my-2.5" />
              Player Character
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-50to100" className="mr-5 my-2.5" />
              Monster
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-100to200" className="mr-5 my-2.5" />
              Weapons & Armor
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-over200" className="mr-5 my-2.5" />
              Items
            </Label>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="flex space-x-2 mt-10 flex-col md:flex-row gap-4 md:gap-0">
        <Button variant="default" size={"lg"}>
          Apply
        </Button>
        <Button variant="outline" size={"lg"}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
