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

export default function ProcessList({ processes }: ProcessListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="process-grid grid gap-8 md:grid-cols-3">
      {processes?.map((process) => (
        <ProcessItem key={process.stepNumber} {...process} />
      ))}
    </div>
  );
}
