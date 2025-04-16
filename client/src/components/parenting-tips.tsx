import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

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
      ]
    },
    {
      category: "Mental Wellbeing",
      items: [
        "Practice relaxation techniques and prenatal yoga",
        "Join pregnancy support groups or online communities",
        "Keep a pregnancy journal to track emotions and milestones",
        "Share feelings and concerns with your partner",
        "Consider prenatal meditation or mindfulness exercises",
      ]
    },
    {
      category: "Baby Preparation",
      items: [
        "Start baby-proofing your home early",
        "Research and choose pediatricians in advance",
        "Create a birth plan with your healthcare provider",
        "Pack your hospital bag by week 35",
        "Set up the nursery with essential items",
      ]
    },
    {
      category: "Physical Comfort",
      items: [
        "Use pregnancy pillows for better sleep",
        "Wear comfortable, breathable clothing",
        "Practice good posture to prevent back pain",
        "Do Kegel exercises regularly",
        "Take frequent breaks when sitting for long periods",
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tips.map((section, index) => (
        <Card key={index} className="h-full">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-primary mb-4">{section.category}</h3>
            <div className="space-y-3">
              {section.items.map((tip, tipIndex) => (
                <div key={tipIndex}>
                  <p className="text-sm text-neutral-600">{tip}</p>
                  {tipIndex < section.items.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}