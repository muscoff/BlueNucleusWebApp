import { useState } from "react";
import "./OnboardingList.css";
import ProgressWheel from "./ProgressWheel.jsx";

function OnboardingCell({ text }) {

  const [isComplete, setIsComplete] = useState(false)

  const handleButtonClick = () => {
    setIsComplete((prev) => !prev);
  }

  return (
    <td>
      <button
        className={`circle-checkbox ${isComplete ? "complete" : ""}`}
        onClick={handleButtonClick}
      >
        {isComplete ? "✔" : ""}
      </button>
      <span>{text}</span>
    </td>
  );
}

function OnboardingList() {

  const todos = [
    "Verify your information is correct on the profile page",
    "Schedule a time to get your picture taken with Brock",
    "Schedule 1 on 1 meeting with Jonathan",
  ];

  const todos1 = [
    "Complete Git course & upload certificate below.",
    "Read internal CI/CD documentation & answers the following questions...",
  ];

  const todos2 = [
    "Merge a Pull Request that resolves one of this WebApp's Github Issues",
  ];

  return (
    <>
      <h1> Onboarding List </h1>
      <div className="onboarding-section-title">
        <h2> House Cleaning </h2>
        <table>
          {todos.map((todo, index) => (
            <tr key={index}>
              <OnboardingCell text={todo} />
            </tr>
          ))}
        </table>
      </div>

      <div className="onboarding-section-title">
        <h2> Technical Learning </h2>
        <table>
          {todos1.map((todo, index) => (
            <tr key={index}>
              <OnboardingCell text={todo} />
            </tr>
          ))}
        </table>
      </div>

      <div className="onboarding-section-title">
        <h2> Code Changes </h2>
        <table>
          {todos2.map((todo, index) => (
            <tr key={index}>
              <OnboardingCell text={todo} />
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default OnboardingList;
