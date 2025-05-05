import { useState } from "react";

interface TipCardProps {
  category: string;
  items: string[];
}

function TipCard({ category, items }: TipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 cursor-pointer perspective"
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-white border border-gray-200 rounded-xl shadow-md p-4 flex items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-lg font-semibold text-primary">{category}</h3>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-blue-50 border border-blue-200 rounded-xl shadow-md p-4 overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h4 className="text-md font-semibold text-blue-700 mb-2">{category}</h4>
          <ul className="list-disc pl-4 space-y-1 text-sm text-neutral-700">
            {items.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ParentingTips() {
  const tips = [
    {
      category: "Nutrition & Health",
      items: [
        "Maintain a balanced diet rich in folic acid, iron, and calcium",
        "Stay hydrated - aim for 8-10 glasses of water daily",
        "Take prescribed prenatal vitamins regularly",
        "Get regular moderate exercise as approved by your doctor",
        "Keep all prenatal appointments and screenings",
      ],
    },
    {
      category: "Mental Wellbeing",
      items: [
        "Practice relaxation techniques and prenatal yoga",
        "Join pregnancy support groups or online communities",
        "Keep a pregnancy journal to track emotions and milestones",
        "Share feelings and concerns with your partner",
        "Consider prenatal meditation or mindfulness exercises",
      ],
    },
    {
      category: "Baby Preparation",
      items: [
        "Start baby-proofing your home early",
        "Research and choose pediatricians in advance",
        "Create a birth plan with your healthcare provider",
        "Pack your hospital bag by week 35",
        "Set up the nursery with essential items",
      ],
    },
    {
      category: "Physical Comfort",
      items: [
        "Use pregnancy pillows for better sleep",
        "Wear comfortable, breathable clothing",
        "Practice good posture to prevent back pain",
        "Do Kegel exercises regularly",
        "Take frequent breaks when sitting for long periods",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {tips.map((tip, index) => (
        <TipCard key={index} category={tip.category} items={tip.items} />
      ))}
    </div>
  );
}
