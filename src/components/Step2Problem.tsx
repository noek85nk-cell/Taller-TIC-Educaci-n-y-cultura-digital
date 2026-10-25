import React from 'react';
import { Investigation } from '../types/investigation';
import {
  HelpCircle,
  Eye,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

interface Step2Props {
  investigation: Investigation;
  onChange: (updated: Partial<Investigation>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSaveManual: () => void;
  isSaving: boolean;
}

export const Step2Problem: React.FC<Step2Props> = ({
  investigation,
  onChange,
  onNext,
  onPrev,
  onSaveManual,
  isSaving,
}) => {
  const subQuestions = investigation.subQuestions && investigation.subQuestions.length > 0
    ? investigation.subQuestions
    : [''];

  const handleSubQuestionChange = (index: number, value: string) => {
    const updated = [...subQuestions];
    updated[index] = value;
    onChange({ subQuestions: updated });
  };

  const addSubQuestion = () => {
    onChange({ subQuestions: [...subQuestions, ''] });
  };

  const removeSubQuestion = (index: number) => {
    if (subQuestions.length <= 1) {
      onChange({ subQuestions: [''] });
      return;
    }
    const updated = subQuestions.filter((_, i) => i !== index);
    onChange({ subQuestions: updated });
  };

  // Coherence / Quality inspection for the research question
  const questionTrimmed = (investigation.researchQuestion || '').trim();
  const hasQuestionMarks = questionTrimmed.includes('?') || questionTrimmed.includes('¿');
  const startsWithYesNoWord = /^(¿?\s*(es|son|sirve|funciona|ayuda|existe|hay|puede|pueden)\b)/i.test(questionTrimmed);
  const startsWithOpenInquiry = /^(¿?\s*(de qué manera|cómo|cuáles|en qué medida|qué características|de qué modo)\b)/i.test(questionTrimmed);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A43] uppercase tracking-wider mb-2">
            <span>Paso 02</span>
            <span aria-hidden="true">·</span>
            <span>Problematización</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1E3D2F] font-serif-academic mb-3">
            Formulación del Problema de Investigación
          </h2>
          <p className="text-sm md:text-base text-[#4A5D52] leading-relaxed">
            Un problema de investigación en formación docente no es una queja ni una carencia; es una
            <strong> pregunta que abre el diálogo entre la teoría pedagógica y la práctica cotidiana en el aula</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Inputs (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Situación Observada */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs space-y-5">
            <h3 className="text-lg font-semibold text-[#1E3D2F] pb-3 border-b border-[#F0EBE1] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#2D5A43]" />
              <span>1. La Situación Observada en el Aula</span>
            </h3>

            <div>
              <label htmlFor="inv-obs" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                ¿Qué observaste en las clases o prácticas que te llamó la atención? <span className="text-[#A24838]">*</span>
              </label>
              <textarea
                id="inv-obs"
                rows={4}
                value={investigation.observedSituation}
                onChange={(e) => onChange({ observedSituation: e.target.value })}
                placeholder="Relatá el hecho concreto: qué hacían los estudiantes, cómo respondían a una consigna, qué dificultades surgieron o qué oportunidad de mejora notaste..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base leading-relaxed transition-colors"
              />
              <p className="mt-1.5 text-xs text-[#6B7E72]">
                Tip docente: Usá registros de tus notas de campo o anécdotas pedagógicas vividas.
              </p>
            </div>

            <div>
              <label htmlFor="inv-axis" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Eje pedagógico o área formativa
              </label>
              <input
                id="inv-axis"
                type="text"
                value={investigation.pedagogicalAxis}
                onChange={(e) => onChange({ pedagogicalAxis: e.target.value })}
                placeholder="Ej: Didáctica de la Lengua / Inclusión y Diversidad / Evaluación Formativa"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
              />
            </div>
          </div>

          {/* Card: Pregunta Central */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-[#1E3D2F] pb-3 border-b border-[#F0EBE1] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2D5A43]" />
              <span>2. La Pregunta Problema Central</span>
            </h3>

            <div>
              <label htmlFor="inv-question" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Pregunta principal de investigación <span className="text-[#A24838]">*</span>
              </label>
              <textarea
                id="inv-question"
                rows={3}
                value={investigation.researchQuestion}
                onChange={(e) => onChange({ researchQuestion: e.target.value })}
                placeholder="¿De qué manera la implementación de secuencias con juegos reglados favorece el cálculo mental en 2° grado?"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base font-medium leading-relaxed transition-colors"
              />

              {/* Dynamic Pedagogy Coherence Feedback */}
              {questionTrimmed.length > 8 && (
                <div className="mt-3 p-3.5 rounded-xl text-xs space-y-1.5 border transition-all">
                  {!hasQuestionMarks ? (
                    <div className="flex items-start gap-2 text-[#A24838] bg-[#FDF3F1] p-2.5 rounded-lg border border-[#F5D5CE]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        Recordá colocar los signos de interrogación <strong>¿ ?</strong> para formular una verdadera pregunta.
                      </span>
                    </div>
                  ) : startsWithYesNoWord ? (
                    <div className="flex items-start gap-2 text-[#9A5B00] bg-[#FFF8EB] p-2.5 rounded-lg border border-[#FBE3B5]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        Ojo pedagógico: Las preguntas que empiezan con <em>"¿Es...?", "¿Sirve...?" o "¿Ayuda...?"</em> se responden con un simple <strong>Sí o No</strong>.
                        Conviene reformularla con: <em>¿Cómo...?</em>, <em>¿De qué manera...?</em> o <em>¿Cuáles son los efectos de...?</em> para abrir indagación.
                      </span>
                    </div>
                  ) : startsWithOpenInquiry ? (
                    <div className="flex items-start gap-2 text-[#245D39] bg-[#EEF7F1] p-2.5 rounded-lg border border-[#CCE8D5]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        ¡Excelente formulación! Empieza con una fórmula de apertura investigativa propicia para la docencia.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-[#465B4E] bg-[#F4EFE6] p-2.5 rounded-lg border border-[#E5DFD4]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#2D5A43]" />
                      <span>
                        Pregunta registrada. Asegurate de que guíe de forma coherente tus futuros objetivos de enseñanza.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sub-preguntas */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="block text-sm font-semibold text-[#243B2D]">
                  Preguntas orientadoras o específicas (opcionales)
                </span>
                <button
                  type="button"
                  onClick={addSubQuestion}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5A43] hover:text-[#1E3D2F] py-1 px-2 rounded-md hover:bg-[#F4EFE6] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar sub-pregunta</span>
                </button>
              </div>
              <p className="text-xs text-[#6B7E72] mb-3">
                Desglosan la pregunta principal en aspectos más pequeños (ej. saberes previos, rol de la intervención docente, evaluación de logros).
              </p>

              <div className="space-y-3">
                {subQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#7A8C81] w-5 text-right shrink-0">
                      2.{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => handleSubQuestionChange(idx, e.target.value)}
                      placeholder={`¿Qué aspectos específicos...?`}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubQuestion(idx)}
                      title="Eliminar esta pregunta"
                      aria-label="Eliminar pregunta"
                      className="p-2 text-[#8A9C91] hover:text-[#A24838] hover:bg-[#FBEBE8] rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Justificación */}
            <div className="pt-4 border-t border-[#F0EBE1]">
              <label htmlFor="inv-just" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Justificación pedagógica de la investigación
              </label>
              <textarea
                id="inv-just"
                rows={3}
                value={investigation.justification}
                onChange={(e) => onChange({ justification: e.target.value })}
                placeholder="¿Por qué es valioso investigar este problema? ¿Qué aporta a tu rol docente y qué beneficio trae para los estudiantes de la escuela?"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base leading-relaxed transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Lateral Advice (1 col) */}
        <div className="space-y-6">
          <div className="bg-[#F4EFE6] rounded-2xl p-6 border border-[#E2DBD0] shadow-xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1E3D2F] mb-3">
              <Lightbulb className="w-4 h-4 text-[#2D5A43]" />
              <span>Estructura de una buena pregunta</span>
            </div>
            <p className="text-xs md:text-sm text-[#465B4E] leading-relaxed mb-3">
              Una pregunta de investigación docente sólida suele contener 4 componentes:
            </p>
            <ul className="text-xs text-[#3E5246] space-y-2 list-disc pl-4">
              <li>
                <strong>Término interrogativo:</strong> ¿Cómo...?, ¿De qué modo...?, ¿Cuáles son...?
              </li>
              <li>
                <strong>Variable didáctica / Estrategia:</strong> Las rondas de diálogo, los juegos reglados, los mapas conceptuales.
              </li>
              <li>
                <strong>Fenómeno a observar:</strong> La resolución de problemas, el clima de convivencia, la autonomía lectora.
              </li>
              <li>
                <strong>Sujetos y contexto:</strong> En estudiantes de 2° grado de la Escuela N° 14.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] shadow-xs">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#6B7E72] mb-2">
              Auto-revisión rápida
            </span>
            <div className="space-y-2.5 text-xs text-[#4A5D52]">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${investigation.observedSituation ? 'bg-[#2D5A43]' : 'bg-[#D5CEC0]'}`} />
                <span>Situación de partida descripta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${hasQuestionMarks ? 'bg-[#2D5A43]' : 'bg-[#D5CEC0]'}`} />
                <span>Pregunta formulada con signos ¿ ?</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${investigation.justification ? 'bg-[#2D5A43]' : 'bg-[#D5CEC0]'}`} />
                <span>Relevancia pedagógica justificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#E8E2D5] flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5CEC0] hover:bg-[#FAF8F5] text-[#3E5246] text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Paso 1</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSaveManual}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D5CEC0] hover:bg-[#FAF8F5] text-[#2D5A43] text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Guardar borrador'}</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] active:bg-[#1A3628] text-white text-sm font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43]"
          >
            <span>Continuar al Paso 3: Objetivos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
