export default function EnvironmentForRace({ myEnvironment, setMyEnvironment }) {
  return (
    <div>
      <h3 className="text-3xl">Select which space you would enjoy the most!</h3>
      <div className="flex flex-col mt-8 text-xl space-y-8 > * + *">
        <div>
          <input
            type="radio"
            value="Elf"
            id="Elf"
            checked={myEnvironment === "Elf"}
            onChange={e => {
              const selectedOption = e.target.value;
              setMyEnvironment(selectedOption);
              console.log(selectedOption);
            }}
            className="hidden"
          />
          <label
            htmlFor="Elf"
            className={`cursor-pointer p-2 rounded-md ${
              myEnvironment === "Elf" ? "border-4 border-solid border-yellow-500 p-2" : ""
            }`}
          >
            Forests
          </label>
        </div>

        <div>
          <input
            type="radio"
            value="Dwarf"
            id="Dwarf"
            checked={myEnvironment === "Dwarf"}
            onChange={e => {
              const selectedOption = e.target.value;
              setMyEnvironment(selectedOption);
              console.log(selectedOption);
            }}
            className="hidden"
          />
          <label
            htmlFor="Dwarf"
            className={`cursor-pointer p-2 rounded-md ${
              myEnvironment === "Dwarf" ? "border-4 border-solid border-yellow-500 p-2" : ""
            }`}
          >
            Mountains
          </label>
        </div>

        <div>
          <input
            type="radio"
            value="Humans"
            id="Humans"
            checked={myEnvironment === "Humans"}
            onChange={e => {
              const selectedOption = e.target.value;
              setMyEnvironment(selectedOption);
              console.log(selectedOption);
            }}
            className="hidden"
          />
          <label
            htmlFor="Humans"
            className={`cursor-pointer p-2 rounded-md ${
              myEnvironment === "Humans" ? "border-4 border-solid border-yellow-500 p-2" : ""
            }`}
          >
            Cities
          </label>
        </div>

        <div>
          <input
            type="radio"
            value="Halfling"
            id="Halfling"
            checked={myEnvironment === "Halfling"}
            onChange={e => {
              const selectedOption = e.target.value;
              setMyEnvironment(selectedOption);
              console.log(selectedOption);
            }}
            className="hidden"
          />
          <label
            htmlFor="Halfling"
            className={`cursor-pointer p-2 rounded-md ${
              myEnvironment === "Halfling" ? "border-4 border-solid border-yellow-500 p-2" : ""
            }`}
          >
            Farmland
          </label>
        </div>
      </div>
    </div>
  );
}
