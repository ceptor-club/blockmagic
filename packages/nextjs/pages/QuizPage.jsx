import Quiz from "../components/Quiz";

export default function QuizPage() {
  //   const [conditionalRender, setConditionalRender] = useState("");
  //   const { character, setCharacter } = useContext(CharacterContext);

  return (
    <>
      {/* <Meta />
      <NavbarMdUp />
      <NavbarSmUp /> */}
      {/* <div className='fixed top-0 h-screen w-screen'>
                <Image
                    src='/images/CREATE-midpage/midPageImage.png'
                    width={1000}
                    height={1000}
                    alt='midPage'
                    className='object-cover w-full h-full -z-10'
                />
            </div> */}
      <div className="flex flex-col justify-center items-center">
        {/* <p className="z-10">Version 0.8.01*</p>
        <p className="z-10">*Now with Quiz - A Character quiz to help generate a character!</p> */}

        {/* <Logo setConditionalRender={setConditionalRender} /> */}

        <div className="z-10 flex w-full justify-center">
          {/* <div className="w-1/6 h-screen bg-slate-300">
            <p className="">SIDEBAR</p>
          </div> */}

          <div className="">
            <Quiz />
          </div>
        </div>
      </div>
    </>
  );
}
