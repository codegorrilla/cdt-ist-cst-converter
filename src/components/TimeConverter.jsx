import React, { useState } from "react";
import { ActivateDst } from "./ActivateDst";

export const TimeConverter = () => {
  const [cdtVal, setCdtVal] = useState("");
  const [istVal, setIstVal] = useState("");
  const [isCdtToIst, setIsCdtToIst] = useState(true);
  const [offset, setOffset] = useState(11.5); // Default to standard time CST
  const [isDstActive, setIsDstActive] = useState(false);

  const centralLabel = isDstActive ? "CDT" : "CST";

  //handle switch
  const handleSwitch = () => {
    setCdtVal("");
    setIstVal("");
    setIsCdtToIst(!isCdtToIst);
  };

  // handle convert
  const handleConvert = (e) => {
    e.preventDefault();

    const offsetHours = Math.floor(offset); // 10 or 11
    // offsetMinutes is always 30

    if (isCdtToIst) {
      if (!cdtVal) return;

      const [hours, minutes] = cdtVal.split(":").map(Number);

      let newMinutes = minutes + 30;
      let newHours = hours + offsetHours;

      // Handle overflow for minutes
      if (newMinutes >= 60) {
        newMinutes %= 60;
        newHours += 1;
      }

      // Handle overflow for hours
      newHours %= 24;

      const formattedHours = String(newHours).padStart(2, "0");
      const formattedMinutes = String(newMinutes).padStart(2, "0");

      setIstVal(`${formattedHours}:${formattedMinutes}`);
    } else {
      if (!istVal) return;

      const [hours, minutes] = istVal.split(":").map(Number);

      let newMinutes = minutes - 30;
      let newHours = hours - offsetHours;

      // Handle underflow for minutes
      if (newMinutes < 0) {
        newMinutes += 60;
        newHours -= 1;
      }

      // Handle negative hours
      newHours = (newHours + 24) % 24;

      const formattedHours = String(newHours).padStart(2, "0");
      const formattedMinutes = String(newMinutes).padStart(2, "0");

      setCdtVal(`${formattedHours}:${formattedMinutes}`);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full p-4" onSubmit={handleConvert}>
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          {isCdtToIst ? (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="cdt" className="text-white font-bold ps-2">
                {centralLabel}
              </label>
              <input
                type="time"
                id="cdt"
                value={cdtVal}
                onChange={(e) => setCdtVal(e.target.value)}
                className="rounded-full bg-white p-2 w-full text-center"
                required
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="ist" className="text-white font-bold ps-2">
                IST
              </label>
              <input
                type="time"
                id="ist"
                value={istVal}
                onChange={(e) => setIstVal(e.target.value)}
                className="rounded-full bg-white p-2 w-full text-center"
                required
              />
            </div>
          )}

          <div
            className="flex justify-center items-center mt-8 switch-btn"
            onClick={handleSwitch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white cursor-pointer hover:scale-110 transition-transform"
            >
              <path d="m16 3 4 4-4 4" />
              <path d="M20 7H4" />
              <path d="m8 21-4-4 4-4" />
              <path d="M4 17h16" />
            </svg>
          </div>

          {isCdtToIst ? (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="ist" className="text-white font-bold ps-2">
                IST
              </label>
              <input
                type="time"
                id="ist"
                value={istVal}
                className="rounded-full bg-gray-300 p-2 w-full text-center"
                readOnly
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="cdt" className="text-white font-bold ps-2">
                {centralLabel}
              </label>
              <input
                type="time"
                id="cdt"
                value={cdtVal}
                className="rounded-full bg-gray-300 p-2 w-full text-center"
                readOnly
              />
            </div>
          )}
        </div>

        <ActivateDst
          onOffsetChange={setOffset}
          onActiveChange={setIsDstActive}
        />

        <button
          type="submit"
          className="rounded-full bg-white font-semibold text-blue-600 p-2 w-full mt-4 hover:bg-gray-100 transition-colors"
        >
          Convert
        </button>
      </form>
    </>
  );
};
