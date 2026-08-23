import { Clock3, CalendarClock } from "lucide-react";

function ScheduleType({ value, onChange }) {
  const options = [
    {
      value: "Duration",
      title: "Duration",
      description: "Each student gets their own timer after starting the quiz.",
      icon: Clock3,
    },
    {
      value: "Scheduled",
      title: "Scheduled",
      description:
        "Quiz is available only between the selected start and end time.",
      icon: CalendarClock,
    },
  ];

  return (
    <div className="w-full">
      <label className="mb-4 block text-sm font-semibold text-slate-700">
        Quiz Timing Type
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((item) => {
          const Icon = item.icon;
          const selected = value === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={`relative rounded-2xl border p-5 text-left transition-all duration-200 ${
                selected
                  ? "border-blue-600 bg-blue-50 shadow-lg"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {/* Selected Badge */}
              {selected && (
                <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                  Selected
                </span>
              )}

              {/* Icon */}
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon size={24} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              {/* Radio */}
              <div className="mt-6 flex items-center justify-end">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                    selected ? "border-blue-600" : "border-slate-300"
                  }`}
                >
                  {selected && (
                    <div className="h-3 w-3 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleType;