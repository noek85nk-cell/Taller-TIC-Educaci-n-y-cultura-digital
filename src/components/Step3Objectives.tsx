import React, { useState } from 'react';
import { Investigation, METHODOLOGICAL_VERBS } from '../types/investigation';
import {
  Target,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface Step3Props {
  investigation: Investigation;
  onChange: (updated: Partial<Investigation>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSaveManual: () => void;
  isSaving: boolean;
}

export const Step3Objectives: React.FC<Step3Props> = ({
  investigation,
  onChange,
  onNext,
  onPrev,
  onSaveManual,
  isSaving,
}) => {
  const [activeVerbCategory, setActiveVerbCategory] = useState<number>(0);

  const specificObjectives =
    investigation.specificObjectives && investigation.specificObjectives.length > 0
      ? investigation.specificObjectives
      : ['', '', ''];

  const handleSpecificChange = (index: number, value: string) => {
    const updated = [...specificObjectives];
    updated[index] = value;
    onChange({ specificObjectives: updated });
  };

  const addSpecificObjective = () => {
    onChange({ specificObjectives: [...specificObjectives, ''] });
  };

  const removeSpecificObjective = (index: number) => {
    if (specificObjectives.length <= 1) {
      onChange({ specificObjectives: [''] });
      return;
    }
    const updated = specificObjectives.filter((_, i) => i !== index);
    onChange({ specificObjectives: updated });
  };

  // Insert a selected verb into the general objective or the last focused specific objective
  const insertVerbIntoGeneral = (verb: string) => {
    const current = (investigation.generalObjective || '').trim();
    if (!current) {
      onChange({ generalObjective: `${verb} ` });
    } else {
      // replace first word if already an infinitive or prepend
      const words = current.split(' ');
      if (/(ar|er|ir)$/i.test(words[0])) {
        words[0] = verb;
        onChange({ generalObjective: words.join(' ') });
      } else {
        onChange({ generalObjective: `${verb} ${current}` });
      }
    }
  };

  // Live validator for general objective
  const generalTrimmed = (investigation.generalObjective || '').trim();
  const startsWithInfinitive = /^[A-ZÁÉÍÓÚa-záéíóú]+(ar|er|ir)\b/i.test(generalTrimmed);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A43] uppercase tracking-wider mb-2">
            <span>Paso 03</span>
            <span aria-hidden="true">·</span>
            <span>Metas de Indagación</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1E3D2F] font-serif-academic mb-3">
            Objetivo General y Objetivos Específicos
          </h2>
          <p className="text-sm md:text-base text-[#4A5D52] leading-relaxed">
            Los objetivos expresan <strong>qué te proponés conocer o transformar</strong> a lo largo de tu investigación.
            Deben comenzar siempre con un <strong>verbo en infinitivo</strong> (terminados en <em>-ar, -er, -ir</em>) y guardar coherencia directa con la pregunta problema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Inputs (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Objetivo General */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs space-y-5">
            <h3 className="text-lg font-semibold text-[#1E3D2F] pb-3 border-b border-[#F0EBE1] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#2D5A43]" />
                <span>1. Objetivo General</span>
              </span>
              <span className="text-xs font-normal text-[#6B7E72]">
                Responde directamente a tu pregunta
              </span>
            </h3>

            {/* Reference to the question formulated in Step 2 */}
            {investigation.researchQuestion && (
              <div className="p-3.5 rounded-xl bg-[#F4EFE6] border border-[#E5DFD4] text-xs">
                <span className="block font-semibold text-[#2D5A43] mb-1">
                  Tu Pregunta Problema formulada en el Paso 2:
                </span>
                <p className="text-[#3E5246] italic">
                  "{investigation.researchQuestion}"
                </p>
              </div>
            )}

            <div>
              <label htmlFor="inv-general-obj" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Redactá el Objetivo General <span className="text-[#A24838]">*</span>
              </label>
              <textarea
                id="inv-general-obj"
                rows={3}
                value={investigation.generalObjective}
                onChange={(e) => onChange({ generalObjective: e.target.value })}
                placeholder="Ej: Analizar el impacto de una secuencia didáctica mediada por juegos de dados y cartas en el cálculo mental en estudiantes de 2° grado..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base font-medium leading-relaxed transition-colors"
              />

              {/* Feedback validation */}
              {generalTrimmed.length > 3 && (
                <div className="mt-3 text-xs">
                  {startsWithInfinitive ? (
                    <div className="flex items-center gap-2 text-[#245D39] bg-[#EEF7F1] p-2.5 rounded-lg border border-[#CCE8D5]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        ¡Muy bien! Comienza con un verbo en infinitivo adecuado para un objetivo de investigación.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-[#9A5B00] bg-[#FFF8EB] p-2.5 rounded-lg border border-[#FBE3B5]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        Atención: Los objetivos deben comenzar con un verbo en infinitivo (ej: <em>Analizar, Caracterizar, Evaluar, Diseñar</em>). Podés usar el banco de verbos de la derecha.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Card: Objetivos Específicos */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <h3 className="text-lg font-semibold text-[#1E3D2F] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#2D5A43]" />
                <span>2. Objetivos Específicos</span>
              </h3>
              <button
                type="button"
                onClick={addSpecificObjective}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D5A43] hover:text-[#1E3D2F] py-1 px-2.5 rounded-lg hover:bg-[#F4EFE6] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar objetivo</span>
              </button>
            </div>

            <p className="text-xs md:text-sm text-[#4A5D52] leading-relaxed">
              Son los pasos progresivos que te permitirán alcanzar el objetivo general.
              Te recomendamos formular entre <strong>2 y 4 objetivos específicos</strong> bien diferenciados.
            </p>

            <div className="space-y-4">
              {specificObjectives.map((obj, idx) => {
                const isInf = /^[A-ZÁÉÍÓÚa-záéíóú]+(ar|er|ir)\b/i.test(obj.trim());
                return (
                  <div key={idx} className="space-y-1.5 p-3.5 rounded-xl border border-[#EAE4D7] bg-[#FAF8F5]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#2D5A43]">
                        Objetivo Específico 0{idx + 1}
                      </span>
                      {specificObjectives.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecificObjective(idx)}
                          className="p-1 text-[#8A9C91] hover:text-[#A24838] transition-colors"
                          title="Eliminar este objetivo"
                          aria-label={`Eliminar objetivo específico ${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={obj}
                      onChange={(e) => handleSpecificChange(idx, e.target.value)}
                      placeholder={`Ej: ${
                        idx === 0
                          ? 'Identificar las ideas previas que manifiestan los estudiantes...'
                          : idx === 1
                          ? 'Diseñar una secuencia de actividades lúdicas orientadas a...'
                          : 'Evaluar los logros observados en las puestas en común...'
                      }`}
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CEC0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
                    />
                    {obj.trim().length > 3 && !isInf && (
                      <span className="block text-[11px] text-[#9A5B00]">
                        Recordá iniciar con un verbo en infinitivo (-ar, -er, -ir).
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lateral Verbs Tool & Pedagogical Distinction (1 col) */}
        <div className="space-y-6">
          {/* Verbs Assistant */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] shadow-xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1E3D2F] mb-3">
              <Sparkles className="w-4 h-4 text-[#2D5A43]" />
              <span>Banco de Verbos Metodológicos</span>
            </div>
            <p className="text-xs text-[#6B7E72] mb-3">
              Hacé clic en cualquier categoría y seleccioná un verbo para agregarlo a tu Objetivo General:
            </p>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-[#F4EFE6] rounded-xl mb-4">
              {METHODOLOGICAL_VERBS.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveVerbCategory(idx)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    activeVerbCategory === idx
                      ? 'bg-[#2D5A43] text-white shadow-xs'
                      : 'text-[#465B4E] hover:text-[#1E3D2F]'
                  }`}
                >
                  {cat.category.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active category verbs */}
            <div className="space-y-3">
              <span className="block text-[11px] text-[#55695C] italic">
                {METHODOLOGICAL_VERBS[activeVerbCategory].description}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {METHODOLOGICAL_VERBS[activeVerbCategory].verbs.map((verb) => (
                  <button
                    key={verb}
                    type="button"
                    onClick={() => insertVerbIntoGeneral(verb)}
                    title={`Hacé clic para usar "${verb}" en el Objetivo General`}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[#D5CEC0] bg-[#FAF8F5] text-[#1E3D2F] hover:bg-[#2D5A43] hover:text-white hover:border-[#2D5A43] transition-all"
                  >
                    + {verb}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Teacher training distinction callout */}
          <div className="bg-[#F4EFE6] rounded-2xl p-6 border border-[#E2DBD0] shadow-xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1E3D2F] mb-2.5">
              <HelpCircle className="w-4 h-4 text-[#2D5A43]" />
              <span>Diferencia fundamental</span>
            </div>
            <p className="text-xs text-[#3E5246] leading-relaxed mb-3">
              En las mesas de examen de formación docente se suele corregir este error clásico:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E0D8CB]">
                <strong className="text-[#A24838] block mb-0.5">Actividad de aula (No es un objetivo):</strong>
                <em>"Realizar fotocopias y hacer jugar al bingo de palabras."</em>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E0D8CB]">
                <strong className="text-[#2D5A43] block mb-0.5">Objetivo de investigación (Correcto):</strong>
                <em>"Indagar cómo la mediación con el bingo de palabras contribuye a la diferenciación de grafemas."</em>
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
          <span>Volver al Paso 2</span>
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
            <span>Ver Ficha y Síntesis Final</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
