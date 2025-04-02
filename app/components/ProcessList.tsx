import { useState } from "react";

interface Process {
  title: string;
  description: string;
  stepNumber: number;
  icon: {
    asset: {
      url: string;
    };
  };
  color: string;
}

interface ProcessListProps {
  processes: Process[];
}

// Add the missing ProcessItem component
function ProcessItem({ title, description, stepNumber, icon, color }: Process) {
  return (
    <div className="process-item p-6 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-center mb-4">
        {icon?.asset?.url && (
          <img src={icon.asset.url} alt={title} className="w-8 h-8 mr-3" />
        )}
        <h3 className="text-xl font-primary font-medium">{title}</h3>
      </div>
      <p className="text-white/60 font-primary">{description}</p>
      <div className="mt-4 text-sm font-primary" style={{ color }}>
        Step {stepNumber}
      </div>
    </div>
  );
}

export default function ProcessList({ processes }: ProcessListProps) {
  // Remove unused state or use it if needed
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="process-grid grid gap-8 md:grid-cols-3">
      {processes?.map((process) => (
        <ProcessItem key={process.stepNumber} {...process} />
      ))}
    </div>
  );
}
