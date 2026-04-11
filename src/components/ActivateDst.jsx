import React, { useState, useEffect } from "react";

export const ActivateDst = ({ onOffsetChange, onActiveChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  // Notify parent whenever isActive changes
  useEffect(() => {
    if (onActiveChange) {
      onActiveChange(isActive);
    }
  }, [isActive, onActiveChange]);

  useEffect(() => {
    // If not active or no date selected, default to 11.5 hours (Standard CST offset)
    if (!isActive || !selectedDate) {
      onOffsetChange(11.5);
      setShowWarning(false);
      return;
    }

    // Check if the selected date falls within Daylight Saving Time
    try {
      const dateParts = selectedDate.split("-");
      // Create a date object in local time to avoid timezone shift anomalies in UTC dates
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

      const tzString = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        timeZoneName: "short",
      }).format(date);

      // If the formatter returns CDT, the date is in Daylight Saving Time
      if (tzString.includes("CDT")) {
        onOffsetChange(10.5);
        setShowWarning(false);
      } else {
        onOffsetChange(11.5); // Winter / Standard time (CST)
        setShowWarning(true);
      }
    } catch {
      // In case of any date parsing issues, fall back to safe default
      onOffsetChange(11.5);
      setShowWarning(false);
    }
  }, [isActive, selectedDate, onOffsetChange]);

  return (
    <div className="flex flex-col gap-2 w-full mt-2 bg-white/10 p-3 rounded-lg border border-white/20 shadow-sm">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="dst-checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-purple-500"
        />
        <label
          htmlFor="dst-checkbox"
          className="text-white text-sm font-bold cursor-pointer"
        >
          Activate DST Check
        </label>
      </div>

      {isActive && (
        <div className="flex flex-col gap-1 mt-2 transition-all">
          <label
            htmlFor="dst-date"
            className="text-white text-xs font-semibold ps-1"
          >
            Date to converting for:
          </label>
          <input
            type="date"
            id="dst-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-full bg-white px-3 py-1 text-sm text-gray-800 w-full outline-hidden"
          />
          {showWarning && (
            <div className="text-red-200 bg-red-900/50 p-2 rounded-lg text-xs mt-1 border border-red-500/50">
              CDT only generates if the date falls in between Spring and the
              Fall season.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
