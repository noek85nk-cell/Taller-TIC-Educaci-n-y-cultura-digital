import React from 'react';
import { MapPin, HelpCircle, Target, FileText, CheckCircle2 } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  completedSteps?: number[];
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  onSelectStep,
  completedSteps = [],
}) => {
  const steps = [
    { number: 1, label: 'Tema y Lugar', icon: MapPin },
    { number: 2, label: 'El Problema', icon: HelpCircle },
    { number: 3, label: 'Objetivos', icon: Target },
    { number: 4, label: 'Ficha Final', icon: FileText },
  ];

  return (
    <div className="w-full no-print">
      {/* Mobile Stepper Header */}
      <div className="md:hidden flex items-center justify-between pb-3 border-b border-[#E8E2D5] mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#6B7E72] font-semibold">
            Paso {currentStep} de 4
          </span>
          <h2 className="text-base font-semibold text-[#1E3D2F]">
            {steps[currentStep - 1].label}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {steps.map((s) => (
            <button
              key={s.number}
              onClick={() => onSelectStep(s.number)}
              aria-label={`Ir al paso ${s.number}: ${s.label}`}
              className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                currentStep === s.number
                  ? 'bg-[#2D5A43] text-white'
                  : completedSteps.includes(s.number)
                  ? 'bg-[#DDE8DF] text-[#1E3D2F]'
                  : 'bg-[#EAE4D7] text-[#6E7D73]'
              }`}
            >
              {completedSteps.includes(s.number) && currentStep !== s.number ? (
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
              ) : (
                s.number
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Horizontal Stepper */}
      <nav aria-label="Progreso de la investigación" className="hidden md:block">
        <ol className="grid grid-cols-4 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = completedSteps.includes(step.number);

            return (
              <li key={step.number}>
                <button
                  onClick={() => onSelectStep(step.number)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 ${
                    isActive
                      ? 'bg-white border-[#2D5A43] shadow-sm ring-1 ring-[#2D5A43]'
                      : 'bg-[#F4EFE6]/60 border-[#E8E2D5] hover:bg-[#F4EFE6] text-[#4A5D52]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#2D5A43] text-white shadow-sm'
                        : isCompleted
                        ? 'bg-[#DDE8DF] text-[#2D5A43]'
                        : 'bg-[#EAE4D7] text-[#6E7D73]'
                    }`}
                  >
                    {isCompleted && !isActive ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A8C81]">
                      Paso 0{step.number}
                    </span>
                    <span
                      className={`block text-sm font-semibold truncate ${
                        isActive ? 'text-[#1E3D2F]' : 'text-[#3E5246]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};
