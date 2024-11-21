import { useState } from "react"
import "./OnboardingList.css"

function OnboardingCell() {

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

      Reach out to Brock to get picture taken for the blue nucleus website.
    </td>
  );
}

function OnboardingList() {
  return (
    <>
      <h1> Onboarding List </h1>
      <div className="onboarding-section">
        <h2> House Cleaning </h2>
        <table>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
        </table>
      </div>

      <div className="onboarding-section">
        <h2> Technical Learning </h2>
        <table>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
        </table>
      </div>

      <div className="onboarding-section">
        <h2> Code Changes </h2>
        <table>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
          <tr> <OnboardingCell /> </tr>
        </table>
      </div>
    </>
  );
}

export default OnboardingList;
