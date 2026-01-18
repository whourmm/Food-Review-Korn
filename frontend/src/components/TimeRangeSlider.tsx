"use client";

import * as Slider from "@radix-ui/react-slider";

export default function TimeRangeSlider({
  value,
  onChange,
}: {
  value: [number, number]; // minutes
  onChange: (v: [number, number]) => void;
}) {
  return (
    <div className="w-full px-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none h-5"
        value={value}
        min={0}
        max={1440}
        step={30}
        minStepsBetweenThumbs={1}
        onValueChange={(v) => onChange(v as [number, number])}
      >
        <Slider.Track className="bg-slate-200 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full shadow" />
        <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full shadow" />
      </Slider.Root>

      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>{label(value[0])}</span>
        <span>{label(value[1])}</span>
      </div>
    </div>
  );
}

function label(m: number) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(min).padStart(2, "0")} ${period}`;
}
