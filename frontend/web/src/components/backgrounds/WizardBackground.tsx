"use client";

type Props = {
  accent: string;
};

export default function WizardBackground({ accent }: Props) {
  return (
    <>
      <style>{`
        @keyframes wizard-show {
          0%   { opacity: 0.15; }
          50%  { opacity: 0.22; }
          100% { opacity: 0.15; }
        }
        @keyframes wizard-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="wizard-cache">
            <rect width="100%" height="100%" />
          </clipPath>
        </defs>

        <g clipPath="url(#wizard-cache)">
          {/* Círculo teal grande — breathing */}
          <circle
            cx="8%"
            cy="110%"
            r="300"
            fill="none"
            stroke="#06A1C4"
            strokeWidth="12"
            strokeMiterlimit="10"
            style={{
              opacity: 0.15,
              animation: "wizard-show 4s ease-in-out infinite forwards",
              animationDelay: "1s",
            }}
          />

          {/* Círculo teal fino con dash — draw animation */}
          <circle
            cx="50%"
            cy="50%"
            r="420"
            fill="none"
            stroke="#06A1C4"
            strokeWidth="6"
            strokeMiterlimit="10"
            strokeDasharray="200"
            strokeDashoffset="800"
            style={{
              opacity: 0.12,
              animation: "wizard-draw 4s ease-in-out infinite forwards",
              animationDelay: "0.5s",
            }}
          />
        </g>
      </svg>
    </>
  );
}
