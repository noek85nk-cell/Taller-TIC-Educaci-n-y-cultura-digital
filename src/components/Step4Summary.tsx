import React, { useState } from 'react';
import { Investigation } from '../types/investigation';
import { exportInvestigationAsJSON } from '../services/storage';
import {
  Printer,
  Copy,
  Download,
  Check,
  Edit3,
  School,
  Target,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface Step4Props {
  investigation: Investigation;
  onGoToStep: (step: number) => void;
  onNewInvestigation: () => void;
  onGoHome: () => void;
}

export const Step4Summary: React.FC<Step4Props> = ({
  investigation,
  onGoToStep,
  onNewInvestigation,
  onGoHome,
}) => {
  const [copied, setCopied] = useState(false);

  const levelLabels: Record<string, string> = {
    inicial: 'Nivel Inicial (Jardín de Infantes)',
    primario: 'Nivel Primario',
    secundario: 'Nivel Secundario',
    superior: 'Nivel Superior / IFD',
    otro: 'Educación Especial / No formal',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    const text = `
=========================================
AULA VIVA — FICHA DE INVESTIGACIÓN EDUCATIVA
=========================================

TÍTULO:
${investigation.title || 'Sin título'}

AUTOR/ES:
${investigation.authorName || 'No especificado'}

ESPACIO CURRICULAR / TALLER:
${investigation.courseOrSubject || 'No especificado'}

INSTITUCIÓN / LUGAR:
${investigation.schoolOrPlace || 'No especificado'} (${levelLabels[investigation.educationLevel] || investigation.educationLevel})

DESTINATARIOS:
${investigation.targetGroup || 'No especificado'}

CONTEXTO SOCIO-INSTITUCIONAL:
${investigation.socioContext || 'No especificado'}

-----------------------------------------
1. TEMA DE INVESTIGACIÓN:
${investigation.theme || 'No especificado'}

EJE PEDAGÓGICO:
${investigation.pedagogicalAxis || 'No especificado'}

2. SITUACIÓN OBSERVADA DE PARTIDA:
${investigation.observedSituation || 'No especificada'}

3. PREGUNTA PROBLEMA CENTRAL:
${investigation.researchQuestion || 'No especificada'}

SUB-PREGUNTAS ORIENTADORAS:
${
  investigation.subQuestions && investigation.subQuestions.filter((q) => q.trim()).length > 0
    ? investigation.subQuestions
        .filter((q) => q.trim())
        .map((q, i) => `  ${i + 1}. ${q}`)
        .join('\n')
    : '  (Ninguna registrada)'
}

4. JUSTIFICACIÓN PEDAGÓGICA:
${investigation.justification || 'No especificada'}

5. OBJETIVO GENERAL:
${investigation.generalObjective || 'No especificado'}

6. OBJETIVOS ESPECÍFICOS:
${
  investigation.specificObjectives &&
  investigation.specificObjectives.filter((o) => o.trim()).length > 0
    ? investigation.specificObjectives
        .filter((o) => o.trim())
        .map((o, i) => `  ${i + 1}. ${o}`)
        .join('\n')
    : '  (Ninguno registrado)'
}

=========================================
Generado con Aula Viva — Plataforma de Formación Docente
Fecha: ${new Date(investigation.updatedAt).toLocaleDateString()}
`;

    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Action Toolbar on Screen */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-[#E8E2D5] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D5A43] uppercase tracking-wider block">
            Paso 04 · Síntesis Completa
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E3D2F]">
            Ficha de la Investigación
          </h2>
          <p className="text-xs md:text-sm text-[#5C7364]">
            Revisá la coherencia global de tu proyecto y descargalo o imprimilo para presentarlo a tus formadores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] hover:bg-[#F3EFE7] text-[#1E3D2F] text-xs md:text-sm font-semibold transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#2D5A43]" />
                <span className="text-[#2D5A43]">¡Copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar texto para Word</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-white text-xs md:text-sm font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            type="button"
            onClick={() => exportInvestigationAsJSON(investigation)}
            title="Guardar archivo .json en tu computadora"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D5CEC0] bg-white hover:bg-[#FAF8F5] text-[#3E5246] text-xs md:text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Copia de seguridad</span>
          </button>
        </div>
      </div>

      {/* Consistency Matrix Card */}
      <div className="no-print bg-[#F4EFE6] rounded-2xl p-6 border border-[#E2DBD0] shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#2D5A43]" />
          <h3 className="text-sm font-semibold text-[#1E3D2F]">
            Matriz de Consistencia Metodológica
          </h3>
        </div>
        <p className="text-xs text-[#4A5D52] mb-4">
          Una investigación docente es sólida cuando existe correspondencia directa entre la pregunta y los objetivos:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] space-y-1.5">
            <span className="block text-xs font-semibold text-[#2D5A43] uppercase tracking-wider">
              Pregunta Problema Central
            </span>
            <p className="text-sm font-serif-academic text-[#1E3D2F] italic">
              {investigation.researchQuestion || '(Aún no formulada en el Paso 2)'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] space-y-1.5">
            <span className="block text-xs font-semibold text-[#2D5A43] uppercase tracking-wider">
              Objetivo General
            </span>
            <p className="text-sm font-serif-academic text-[#1E3D2F]">
              {investigation.generalObjective || '(Aún no formulado en el Paso 3)'}
            </p>
          </div>
        </div>
      </div>

      {/* Academic Paper / Dossier View (Printable) */}
      <div className="bg-white rounded-2xl p-6 md:p-12 border border-[#E8E2D5] shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-[#2D5A43] pb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest uppercase text-[#2D5A43]">
              Proyecto de Investigación Educativa · Formación Docente
            </span>
            <span className="text-xs text-[#7A8C81]">
              Actualizado: {new Date(investigation.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold font-serif-academic text-[#1E3D2F] leading-tight">
            {investigation.title || 'Investigación Pedagógica Sin Título'}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm text-[#465B4E] pt-2">
            <span>
              <strong>Autor(es):</strong> {investigation.authorName || 'Estudiante de profesorado'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong>Espacio:</strong> {investigation.courseOrSubject || 'Práctica Docente'}
            </span>
          </div>
        </div>

        {/* Section 1: Institución y Contexto */}
        <div className="space-y-4 print-break-inside-avoid">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
            <h2 className="text-base md:text-lg font-semibold text-[#1E3D2F] flex items-center gap-2">
              <School className="w-5 h-5 text-[#2D5A43]" />
              <span>1. Contexto y Localización de la Práctica</span>
            </h2>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="no-print inline-flex items-center gap-1 text-xs text-[#2D5A43] hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE4D7]">
              <span className="block text-xs font-semibold text-[#5A6E61] mb-1">
                Institución escolar
              </span>
              <p className="font-medium text-[#1E3D2F]">
                {investigation.schoolOrPlace || 'No consignada'}
              </p>
              <span className="text-xs text-[#7A8C81] mt-0.5 block">
                {levelLabels[investigation.educationLevel] || investigation.educationLevel}
              </span>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE4D7]">
              <span className="block text-xs font-semibold text-[#5A6E61] mb-1">
                Grupo destinatario / Sala o Curso
              </span>
              <p className="font-medium text-[#1E3D2F]">
                {investigation.targetGroup || 'No consignado'}
              </p>
            </div>
          </div>

          {investigation.socioContext && (
            <div className="text-sm">
              <span className="block text-xs font-semibold text-[#5A6E61] mb-1">
                Contexto institucional y sociocomunitario:
              </span>
              <p className="text-[#3E5246] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE4D7]">
                {investigation.socioContext}
              </p>
            </div>
          )}

          <div className="text-sm">
            <span className="block text-xs font-semibold text-[#5A6E61] mb-1">
              Tema central de indagación pedagógica:
            </span>
            <p className="text-[#1E3D2F] font-serif-academic text-base leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE4D7]">
              {investigation.theme || 'No consignado'}
            </p>
          </div>
        </div>

        {/* Section 2: El Problema de Investigación */}
        <div className="space-y-4 print-break-inside-avoid">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
            <h2 className="text-base md:text-lg font-semibold text-[#1E3D2F] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2D5A43]" />
              <span>2. Planteamiento del Problema</span>
            </h2>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="no-print inline-flex items-center gap-1 text-xs text-[#2D5A43] hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          </div>

          {investigation.observedSituation && (
            <div className="text-sm">
              <span className="block text-xs font-semibold text-[#5A6E61] mb-1">
                Situación observada en el aula (Punto de partida):
              </span>
              <p className="text-[#3E5246] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE4D7]">
                {investigation.observedSituation}
              </p>
            </div>
          )}

          <div className="bg-[#F4EFE6] p-4 rounded-xl border border-[#E5DFD4]">
            <span className="block text-xs font-semibold text-[#2D5A43] uppercase tracking-wider mb-1">
              Pregunta problema central de investigación
            </span>
            <p className="text-base md:text-lg font-semibold font-serif-academic text-[#1E3D2F] leading-snug">
              {investigation.researchQuestion || 'No especificada'}
            </p>
          </div>

          {investigation.subQuestions &&
            investigation.subQuestions.filter((q) => q.trim()).length > 0 && (
              <div className="text-sm space-y-2">
                <span className="block text-xs font-semibold text-[#5A6E61]">
                  Preguntas orientadoras derivadas:
                </span>
                <ol className="list-decimal pl-5 space-y-1 text-[#3E5246]">
                  {investigation.subQuestions
                    .filter((q) => q.trim())
                    .map((sq, i) => (
                      <li key={i}>{sq}</li>
                    ))}
                </ol>
              </div>
            )}

          {investigation.justification && (
            <div className="text-sm">
              <span className="block text-xs font-semibold text-[#5A6E61] mb-1">
                Justificación y relevancia formativa:
              </span>
              <p className="text-[#3E5246] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE4D7]">
                {investigation.justification}
              </p>
            </div>
          )}
        </div>

        {/* Section 3: Objetivos */}
        <div className="space-y-4 print-break-inside-avoid">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
            <h2 className="text-base md:text-lg font-semibold text-[#1E3D2F] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#2D5A43]" />
              <span>3. Objetivos de la Investigación</span>
            </h2>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="no-print inline-flex items-center gap-1 text-xs text-[#2D5A43] hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE4D7] space-y-1.5">
            <span className="block text-xs font-semibold text-[#2D5A43] uppercase tracking-wider">
              Objetivo General
            </span>
            <p className="text-base font-serif-academic text-[#1E3D2F] font-semibold leading-relaxed">
              {investigation.generalObjective || 'No redactado'}
            </p>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#5A6E61]">
              Objetivos Específicos:
            </span>
            <div className="space-y-2">
              {investigation.specificObjectives &&
              investigation.specificObjectives.filter((o) => o.trim()).length > 0 ? (
                investigation.specificObjectives
                  .filter((o) => o.trim())
                  .map((obj, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE4D7] text-sm text-[#1E3D2F] flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#2D5A43] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed">{obj}</p>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-[#7A8C81] italic">Ninguno redactado</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer print badge */}
        <div className="pt-6 border-t border-[#E8E2D5] flex items-center justify-between text-xs text-[#7A8C81]">
          <span>Aula Viva — Plataforma Educativa para la Formación Docente</span>
          <span>Investigación guardada localmente</span>
        </div>
      </div>

      {/* Screen bottom controls */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={() => onGoToStep(3)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D5CEC0] bg-white hover:bg-[#FAF8F5] text-[#3E5246] text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Objetivos</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D5CEC0] bg-white hover:bg-[#FAF8F5] text-[#1E3D2F] text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#2D5A43]" />
            <span>Volver al Inicio</span>
          </button>

          <button
            type="button"
            onClick={onNewInvestigation}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-white text-sm font-semibold shadow-xs transition-colors"
          >
            <span>+ Crear Otra Investigación</span>
          </button>
        </div>
      </div>
    </div>
  );
};
