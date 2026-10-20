"use client";

import { useState } from "react";
import { FormSection } from "@/components/Shops/CreateShop/FormLayout";

const DAYS_OF_WEEK = [
  { label: "Mon", value: "MONDAY" },
  { label: "Tue", value: "TUESDAY" },
  { label: "Wed", value: "WEDNESDAY" },
  { label: "Thu", value: "THURSDAY" },
  { label: "Fri", value: "FRIDAY" },
  { label: "Sat", value: "SATURDAY" },
  { label: "Sun", value: "SUNDAY" },
];

type ScheduleBlock = {
  id: string;
  openTime: string;
  closeTime: string;
  days: string[];
};

export const SettingsSection = () => {
  const [is247, setIs247] = useState(false);
  const [offerDelivery, setOfferDelivery] = useState(false);

  // Manages multiple schedule blocks (Primary + Added odd/weekend hours)
  const [schedules, setSchedules] = useState<ScheduleBlock[]>([
    { id: "1", openTime: "09:00", closeTime: "21:00", days: [] },
  ]);

  // Collect all days currently selected across *other* schedules to prevent duplicates
  const getDisabledDays = (currentScheduleId: string) => {
    const selectedDays = new Set<string>();
    schedules.forEach((sch) => {
      if (sch.id !== currentScheduleId) {
        sch.days.forEach((d) => selectedDays.add(d));
      }
    });
    return selectedDays;
  };

  const handleTimeChange = (id: string, field: "openTime" | "closeTime", value: string) => {
    setSchedules((prev) =>
      prev.map((sch) => (sch.id === id ? { ...sch, [field]: value } : sch))
    );
  };

  const toggleDay = (scheduleId: string, dayValue: string) => {
    setSchedules((prev) =>
      prev.map((sch) => {
        if (sch.id !== scheduleId) return sch;
        const exists = sch.days.includes(dayValue);
        const updatedDays = exists
          ? sch.days.filter((d) => d !== dayValue)
          : [...sch.days, dayValue];
        return { ...sch, days: updatedDays };
      })
    );
  };

  const addScheduleBlock = () => {
    setSchedules((prev) => [
      ...prev,
      { id: Date.now().toString(), openTime: "10:00", closeTime: "18:00", days: [] },
    ]);
  };

  const removeScheduleBlock = (id: string) => {
    setSchedules((prev) => prev.filter((sch) => sch.id !== id));
  };

  return (
    <FormSection title="Business Settings">
      <div className="space-y-6">
        
        {/* 24/7 vs Custom Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Open 24/7</h4>
            <p className="text-xs text-gray-500">Is your shop open round-the-clock?</p>
          </div>
          <button
            type="button"
            onClick={() => setIs247((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              is247 ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                is247 ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Dynamic Hours and Days Setup */}
        {!is247 && (
          <div className="space-y-4">
            {schedules.map((schedule, index) => {
              const disabledDays = getDisabledDays(schedule.id);

              return (
                <div
                  key={schedule.id}
                  className="p-4 border border-gray-200 rounded-2xl bg-white space-y-4 relative shadow-sm"
                >
                  {/* Row Header & Delete button for secondary blocks */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {index === 0 ? "Standard Hours" : `Additional Hours #${index}`}
                    </span>
                    {schedules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeScheduleBlock(schedule.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Time Pickers (Opening & Closing) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Opening Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={schedule.openTime}
                          onChange={(e) =>
                            handleTimeChange(schedule.id, "openTime", e.target.value)
                          }
                          className="h-12 w-full px-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600 transition text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Closing Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={schedule.closeTime}
                          onChange={(e) =>
                            handleTimeChange(schedule.id, "closeTime", e.target.value)
                          }
                          className="h-12 w-full px-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600 transition text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Day Selector Pills */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Applicable Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map((day) => {
                        const isSelected = schedule.days.includes(day.value);
                        const isDisabled = disabledDays.has(day.value);

                        return (
                          <button
                            key={day.value}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => toggleDay(schedule.id, day.value)}
                            className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-all ${
                              isDisabled
                                ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                                : isSelected
                                ? "bg-green-600 text-white border-green-600 shadow-sm"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add Odd / Weekend Hours Button */}
            <button
              type="button"
              onClick={addScheduleBlock}
              className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-sm font-medium text-gray-600 hover:border-green-600 hover:text-green-600 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Custom / Weekend Timing
            </button>
          </div>
        )}

        {/* Home Delivery Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Offer Home Delivery</h4>
            <p className="text-xs text-gray-500">Enable this if you provide delivery services</p>
          </div>
          <button
            type="button"
            onClick={() => setOfferDelivery((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              offerDelivery ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                offerDelivery ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

      </div>
    </FormSection>
  );
};