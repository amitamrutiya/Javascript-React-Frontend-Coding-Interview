import { MAX, MIN } from "../utils/constants";

export default function ProgressBar({ value = 0 }) {


  return (
    <div className="progress">
      <span
        style={{
          color: value > 49 ? "white" : "black"
        }}
      >
        {value.toFixed()}%
      </span>
      <div
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${value / MAX})`,
          transformOrigin: "left"
        }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={value}
        role="progressbar"
      />
    </div>
  );
}
