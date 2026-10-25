import React from 'react';
import { Investigation } from '../types/investigation';
import {
  BookOpen,
  Plus,
  Sparkles,
  School,
  Target,
  HelpCircle,
  FileText,
  Clock,
  ArrowRight,
  Copy,
  Trash2,
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface HomeViewProps {
  investigations: Investigation[];
  onNewInvestigation: () => void;
  onLoadSample: () => void;
  onOpenInvestigation: (id: string) => void;
  onDuplicateInvestigation: (id: string) => void;
  onDeleteInvestigation: (id: string) => void;
  onOpenMethodologyGuide: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  investigations,
  onNewInvestigation,
  onLoadSample,
  onOpenInvestigation,
  onDuplicateInvestigation,
  onDeleteInvestigation,
  onOpenMethodologyGuide,
}) => {
  const stepsInfo = [
    {
      num: '01',
      title: 'Tema y Lugar',
      desc: 'Registrá la escuela, el nivel educativo, el grupo escolar y delimitá el eje formativo.',
      icon: School,
    },
    {
      num: '02',
      title: 'El Problema',
      desc: 'Partí de una situación observada en el aula y construí tu pregunta problema central.',
      icon: HelpCircle,
    },
    {
      num: '03',
      title: 'Objetivos',
      desc: 'Formulá objetivos generales y específicos con la ayuda del banco interactivo de verbos.',
      icon: Target,
    },
    {
      num: '04',
      title: 'Ficha y Síntesis',
      desc: 'Generá una ficha académica ordenada para imprimir en PDF, guardar o copiar a Word.',
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl border border-[#E8E2D5] shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A43] uppercase tracking-wider mb-3">
              <span>Formación Docente</span>
              <span aria-hidden="true">·</span>
              <span>Investigación Pedagógica en el Aula</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-academic text-[#1E3D2F] leading-[1.15] mb-4 text-balance">
              Desarrollá tu investigación educativa paso a paso.
            </h1>

            <p className="text-base sm:text-lg text-[#4A5D52] leading-relaxed mb-8 max-w-xl">
              Bienvenido a <strong>Aula Viva</strong>. Una herramienta sencilla y guiada para estudiantes de profesorado: delimitá tu tema, contextualizá tu escuela de prácticas, formulá el problema y redactá objetivos con coherencia pedagógica.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onNewInvestigation}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] active:bg-[#1A3628] text-white text-sm sm:text-base font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43]"
              >
                <Plus className="w-5 h-5" />
                <span>Comenzar Nueva Investigación</span>
              </button>

              <button
                type="button"
                onClick={onLoadSample}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] hover:bg-[#F3EFE7] text-[#1E3D2F] text-sm sm:text-base font-semibold transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#2D5A43]" />
                <span>Cargar Ejemplo Guiado</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="mt-8 pt-6 border-t border-[#F0EBE1] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6B7E72]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                <span>100% Gratuito y sin registro</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                <span>Guardado automático en tu navegador</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                <span>Exportable a Word y PDF</span>
              </span>
            </div>
          </div>

          {/* Right Image Zone */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-[#F4EFE6]">
            <img
              src="/src/assets/images/aula_viva_hero_1792936010634.jpg"
              alt="Estudiantes de formación docente investigando en la biblioteca del profesorado"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Steps Educational Roadmap */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A43] block">
              El Proceso Pedagógico
            </span>
            <h2 className="text-2xl font-bold font-serif-academic text-[#1E3D2F]">
              Las 4 Estaciones de tu Investigación
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenMethodologyGuide}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2D5A43] hover:underline"
          >
            <Compass className="w-4 h-4" />
            <span>Leer recomendaciones para el aula</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stepsInfo.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C7BDAD] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#2D5A43] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8A9C91]">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#1E3D2F] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#526659] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Saved Investigations List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A43] block">
              Almacenamiento Local
            </span>
            <h2 className="text-2xl font-bold font-serif-academic text-[#1E3D2F]">
              Tus Investigaciones Guardadas
            </h2>
          </div>
          <span className="text-xs text-[#6B7E72] bg-[#F4EFE6] px-3 py-1 rounded-full">
            {investigations.length} {investigations.length === 1 ? 'proyecto' : 'proyectos'} en este navegador
          </span>
        </div>

        {investigations.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#E8E2D5] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] text-[#2D5A43] flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-base font-semibold text-[#1E3D2F] mb-1">
                Aún no creaste ninguna investigación
              </h3>
              <p className="text-xs text-[#6B7E72] mb-4">
                Podés crear tu primer borrador desde cero o cargar nuestro ejemplo guiado para ver cómo se redacta.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onNewInvestigation}
                  className="px-4 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#234735]"
                >
                  + Nueva investigación
                </button>
                <button
                  type="button"
                  onClick={onLoadSample}
                  className="px-4 py-2 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] text-[#1E3D2F] text-xs font-semibold hover:bg-[#F3EFE7]"
                >
                  Cargar ejemplo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investigations.map((item) => {
              const hasProblem = Boolean(item.researchQuestion?.trim());
              const hasObjectives = Boolean(item.generalObjective?.trim());
              const isSample = item.id === 'ejemplo-modelo-aula-viva';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-[#E8E2D5] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#2D5A43]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#6B7E72]">
                        {isSample && (
                          <span className="font-semibold text-[#2D5A43] bg-[#E8F2EC] px-2 py-0.5 rounded text-[10px]">
                            Ejemplo modelo
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onDuplicateInvestigation(item.id)}
                          title="Duplicar investigación"
                          aria-label="Duplicar investigación"
                          className="p-1.5 text-[#7A8C81] hover:text-[#1E3D2F] hover:bg-[#F4EFE6] rounded-lg transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteInvestigation(item.id)}
                          title="Eliminar investigación"
                          aria-label="Eliminar investigación"
                          className="p-1.5 text-[#7A8C81] hover:text-[#A24838] hover:bg-[#FDF3F1] rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#1E3D2F] font-serif-academic line-clamp-2 mb-2">
                      {item.title || 'Investigación sin título'}
                    </h3>

                    <p className="text-xs text-[#526659] line-clamp-2 mb-3">
                      {item.theme || 'Sin tema detallado todavía.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7E72] pt-2 border-t border-[#F0EBE1]">
                      {item.schoolOrPlace && (
                        <span className="flex items-center gap-1">
                          <School className="w-3 h-3 text-[#2D5A43]" />
                          <span className="truncate max-w-[180px]">{item.schoolOrPlace}</span>
                        </span>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>
                        {hasObjectives
                          ? 'Objetivos listos'
                          : hasProblem
                          ? 'Problema formulado'
                          : 'Paso inicial'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenInvestigation(item.id)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#2D5A43] hover:text-white text-[#1E3D2F] text-xs font-semibold border border-[#D5CEC0] hover:border-[#2D5A43] transition-all"
                    >
                      <span>Abrir y Continuar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
