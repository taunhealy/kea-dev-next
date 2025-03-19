import ProcessList from "@/app/components/ProcessList";

interface ProcessStep {
  title: string;
  description: string;
  stepNumber: number;
  icon: string;
  color: string;
}

interface ProcessProps {
  processes: ProcessStep[];
}

export default function Process({ processes }: ProcessProps) {
  return (
    <section className="process-section flex min-h-[560px] w-full flex-col gap-[54px] bg-primary px-8 py-[54px]">
      <div className="section-padding w-full">
        <h4 className="text-text-secondary">Our Process</h4>
      </div>

      <div className="flex w-full justify-center">
        <ProcessList processes={processes} />
      </div>
    </section>
  );
}
