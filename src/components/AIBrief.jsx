import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

const tips = [
  "Stay consistent with your daily learning goals.",
  "Small progress every day creates big results.",
  "Focus on one task at a time for maximum productivity.",
  "Discipline beats motivation in the long run.",
  "Keep building projects to improve your skills.",
  "Your future is created by what you do today.",
  "Consistency is the key to mastery.",
  "Deep work produces better outcomes than multitasking.",
  "Learning never stops in tech.",
  "Every bug solved makes you a better developer.",
];

export default function AIBrief() {
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);

  function generateBrief() {
    setLoading(true);

    setTimeout(() => {
      const randomTip =
        tips[
          Math.floor(
            Math.random() * tips.length
          )
        ];

      setBrief(randomTip);
      setLoading(false);
    }, 600);
  }

  useEffect(() => {
    generateBrief();
  }, []);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-widest text-white/30">
          AI Daily Brief
        </p>

        <button
          onClick={generateBrief}
          disabled={loading}
          className="text-white/20 hover:text-white/50"
        >
          <RefreshCw
            size={12}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />
        </button>
      </div>

      <p className="text-sm text-white/70 leading-relaxed">
        {loading
          ? "Generating insight..."
          : brief}
      </p>
    </div>
  );
}