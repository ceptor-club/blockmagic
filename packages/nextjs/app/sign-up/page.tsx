"use client";

import * as React from "react";
import BackButton from "~~/components/signup-component/BackButton";
import Button from "~~/components/signup-component/Button";
import Circle from "~~/components/signup-component/CircularSignUp";
import ModalRequestJoin from "~~/components/signup-component/modal-signup/ModalRequestJoin";
import ContactMethodSignUp from "~~/components/signup-component/pages/ContactMethodSignUp";
import EmailSignUp from "~~/components/signup-component/pages/EmailSignUp";
import IDSignUp from "~~/components/signup-component/pages/IDSignUp";
import InDiscordSignUp from "~~/components/signup-component/pages/InDiscordSignUp";
import InitiativeSignUp from "~~/components/signup-component/pages/InitiativeSignUp";
import JoinWithUs from "~~/components/signup-component/pages/JoinWithUs";
import NameSignUp from "~~/components/signup-component/pages/NameSignUp";
import ProjectSignUp from "~~/components/signup-component/pages/ProjectSignUp";
import RoleSignUp from "~~/components/signup-component/pages/RoleSignUp";

const SignUp: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [inputName, setInputName] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  const [inputRole, setInputRole] = React.useState("");
  const [inputProject, setInputProject] = React.useState("");
  const [inputInitiative, setInputInitiative] = React.useState("");
  const [inputContactMethod, setInputContactMethod] = React.useState("");
  const [inputInDiscord, setInputInDiscord] = React.useState("");
  const [circlesData, setCirclesData] = React.useState(Array.from({ length: 8 }, (_, i) => ({ isFilled: i === 0 })));

  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleNextStep = (backward?: boolean) => {
    if (backward && tab === 0) window.history.back();

    const nextTab = Math.max(Math.min(backward ? tab - 1 : tab + 1, circlesData.length), 0);
    const newCirclesData = circlesData.map((circle, index) => ({
      isFilled: index < nextTab,
    }));
    setCirclesData(newCirclesData);
    setTab(nextTab);
  };

  const handleCircleClick = (index: number) => {
    const newCirclesData = circlesData.map((circle, i) => ({
      isFilled: i <= index,
    }));
    setCirclesData(newCirclesData);
    setTab(index + 1);
  };

  const stepLabels = ["ID", "Name", "Email", "Role", "Project", "Initiative", "Contact Method", "In Discord"];

  return (
    <main
      className="flex flex-col items-center pt-5 pr-20 pb-10 pl-5
      bg-black max-md:pr-5 h-screen"
    >
      <BackButton onClick={() => handleNextStep(true)} />
      {tab !== 0 && (
        // Inside SignUp component
        <section className="flex flex-col px-5 max-w-[520px]">
          {tab !== 0 && (
            <>
              <div className="flex gap-5 max-md:flex-wrap">
                {circlesData.map(({ isFilled }, index) => (
                  <Circle
                    key={index}
                    tooltip={stepLabels[index]}
                    isFilled={isFilled}
                    onClick={() => handleCircleClick(index)}
                  />
                ))}
              </div>
              <p className="self-center mt-7 text-lg leading-7 text-center text-white">
                Step {tab} of {circlesData.length}: User {stepLabels[tab - 1]}
              </p>
            </>
          )}
        </section>
      )}

      {tab === 0 && <JoinWithUs setTab={setTab} />}
      {tab === 1 && <IDSignUp inputValue={inputValue} setInputValue={setInputValue} />}
      {tab === 2 && <NameSignUp inputName={inputName} setInputName={setInputName} />}
      {tab === 3 && <EmailSignUp inputEmail={inputEmail} setInputEmail={setInputEmail} />}
      {tab === 4 && <RoleSignUp inputRole={inputRole} setInputRole={setInputRole} />}
      {tab === 5 && <ProjectSignUp inputProject={inputProject} setInputProject={setInputProject} />}
      {tab === 6 && <InitiativeSignUp inputInitiative={inputInitiative} setInputInitiative={setInputInitiative} />}
      {tab === 7 && (
        <ContactMethodSignUp inputContactMethod={inputContactMethod} setInputContactMethod={setInputContactMethod} />
      )}
      {tab === 8 && <InDiscordSignUp inputInDiscord={inputInDiscord} setInputInDiscord={setInputInDiscord} />}

      {/* Add other components for subsequent tabs here */}
      <section
        className="grid grid-cols-1 
      lg:grid-cols-2 gap-4 w-full text-center 
      lg:w-[824px]"
      >
        {tab === 0 ? (
          <Button variant="fill" onClick={() => handleNextStep()}>
            Sign Up
          </Button>
        ) : tab === circlesData.length ? (
          <Button variant="fill" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="fill" onClick={() => handleNextStep()}>
            Next
          </Button>
        )}
        <Button variant="outline" onClick={() => handleNextStep(true)}>
          Back
        </Button>
      </section>
      {showModal && <ModalRequestJoin />}
    </main>
  );
};

export default SignUp;