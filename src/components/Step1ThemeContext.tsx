import React from 'react';
import { Investigation, EducationLevel } from '../types/investigation';
import { School, Users, MapPin, Sparkles, ArrowRight, Save, Info } from 'lucide-react';

interface Step1Props {
  investigation: Investigation;
  onChange: (updated: Partial<Investigation>) => void;
  onNext: () => void;
  onSaveManual: () => void;
  isSaving: boolean;
}

export const Step1ThemeContext: React.FC<Step1Props> = ({
  investigation,
  onChange,
  onNext,
  onSaveManual,
  isSaving,
}) => {
  const levels: { id: EducationLevel; label: string }[] = [
    { id: 'inicial', label: 'Nivel Inicial (Jardín)' },
    { id: 'primario', label: 'Nivel Primario' },
    { id: 'secundario', label: 'Nivel Secundario' },
    { id: 'superior', label: 'Nivel Superior / IFD' },
    { id: 'otro', label: 'Educación Especial / No formal' },
  ];

  const themeSuggestions = [
    {
      title: 'Alfabetización en 1° grado',
      theme: 'Estrategias de lectura en voz alta para favorecer la conciencia fonológica y el disfrute literario en primer ciclo.',
    },
    {
      title: 'Matemática y juegos en primaria',
      theme: 'El uso de juegos reglados como andamiaje para la construcción del cálculo mental reflexivo.',
    },
    {
      title: 'Convivencia y mediación de conflictos',
      theme: 'Estrategias participativas en rondas de diálogo escolar para el fortalecimiento del clima áulico.',
    },
    {
      title: 'Ciencias Naturales por indagación',
      theme: 'La formulación de hipótesis y el registro gráfico en experiencias de laboratorio escolar.',
    },
  ];

  const applySuggestion = (text: string) => {
    onChange({ theme: text });
    if (!investigation.title) {
      onChange({ title: text.split('.')[0] });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A43] uppercase tracking-wider mb-2">
            <span>Paso 01</span>
            <span aria-hidden="true">·</span>
            <span>Delimitación Inicial</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1E3D2F] font-serif-academic mb-3">
            Tema y Lugar de la Investigación
          </h2>
          <p className="text-sm md:text-base text-[#4A5D52] leading-relaxed">
            Toda investigación educativa nace de una inquietud sobre la realidad escolar.
            En este primer paso definís <strong>qué vas a estudiar</strong> y <strong>dónde y con quiénes</strong> vas a llevar adelante tu indagación.
          </p>
        </div>
      </div>

      {/* Main Form Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form fields (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Datos Generales */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-[#1E3D2F] pb-3 border-b border-[#F0EBE1]">
              1. Identificación del Proyecto
            </h3>

            <div>
              <label htmlFor="inv-title" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Título preliminar de la investigación
              </label>
              <input
                id="inv-title"
                type="text"
                value={investigation.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="Ej: Estrategias de lectura compartida en 3er grado de Primaria"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base transition-colors"
              />
              <p className="mt-1.5 text-xs text-[#6B7E72]">
                Un título claro y descriptivo. Podrás ajustarlo a medida que avances.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inv-author" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                  Autor / Estudiantes en formación
                </label>
                <input
                  id="inv-author"
                  type="text"
                  value={investigation.authorName}
                  onChange={(e) => onChange({ authorName: e.target.value })}
                  placeholder="Tu nombre o el de tu equipo"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inv-course" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                  Materia, Taller o Residencia
                </label>
                <input
                  id="inv-course"
                  type="text"
                  value={investigation.courseOrSubject}
                  onChange={(e) => onChange({ courseOrSubject: e.target.value })}
                  placeholder="Ej: Práctica Docente III / Ateneo"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inv-theme" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Tema central de indagación pedagógica <span className="text-[#A24838]">*</span>
              </label>
              <textarea
                id="inv-theme"
                rows={3}
                value={investigation.theme}
                onChange={(e) => onChange({ theme: e.target.value })}
                placeholder="¿Sobre qué aspecto de la enseñanza o del aprendizaje querés investigar? Describilo en 2 o 3 oraciones..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base leading-relaxed transition-colors"
              />
              <p className="mt-1.5 text-xs text-[#6B7E72]">
                Recomendación: delimitá un tema específico y abordable para no dispersarte durante el período de prácticas.
              </p>
            </div>
          </div>

          {/* Card: El Lugar y la Comunidad */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-[#1E3D2F] pb-3 border-b border-[#F0EBE1] flex items-center gap-2">
              <School className="w-5 h-5 text-[#2D5A43]" />
              <span>2. Institución y Espacio de Práctica</span>
            </h3>

            <div>
              <label htmlFor="inv-school" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                Nombre de la Escuela o Institución <span className="text-[#A24838]">*</span>
              </label>
              <div className="relative">
                <input
                  id="inv-school"
                  type="text"
                  value={investigation.schoolOrPlace}
                  onChange={(e) => onChange({ schoolOrPlace: e.target.value })}
                  placeholder="Ej: Escuela Primaria N° 12 'Domingo F. Sarmiento'"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm md:text-base transition-colors"
                />
                <MapPin className="w-4 h-4 text-[#7A8C81] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-[#243B2D] mb-2">
                Nivel educativo
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => onChange({ educationLevel: lvl.id })}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all ${
                      investigation.educationLevel === lvl.id
                        ? 'bg-[#2D5A43] text-white border-[#2D5A43] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#3E5246] border-[#D5CEC0] hover:bg-[#F0EBE1]'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inv-target" className="block text-sm font-semibold text-[#243B2D] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#2D5A43]" />
                  <span>Grupo o curso destinatario</span>
                </label>
                <input
                  id="inv-target"
                  type="text"
                  value={investigation.targetGroup}
                  onChange={(e) => onChange({ targetGroup: e.target.value })}
                  placeholder="Ej: 3° grado 'A', 25 estudiantes"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="inv-context" className="block text-sm font-semibold text-[#243B2D] mb-1.5">
                  Contexto socio-institucional
                </label>
                <input
                  id="inv-context"
                  type="text"
                  value={investigation.socioContext}
                  onChange={(e) => onChange({ socioContext: e.target.value })}
                  placeholder="Ej: Escuela pública urbana, doble jornada"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEC0] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A43] focus:border-transparent text-[#1E3D2F] text-sm transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lateral Guide Column (1 col) */}
        <div className="space-y-6">
          {/* Pedagogical Advice Card */}
          <div className="bg-[#F4EFE6] rounded-2xl p-6 border border-[#E2DBD0] shadow-xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1E3D2F] mb-3">
              <Info className="w-4 h-4 text-[#2D5A43]" />
              <span>Consejo de Formación Docente</span>
            </div>
            <p className="text-xs md:text-sm text-[#465B4E] leading-relaxed mb-4">
              En tu rol de practicante o residente, evitá temas demasiado amplios como <em>"La educación en el siglo XXI"</em>.
              Concentrate en una <strong>situación concreta de aula</strong> que puedas observar, registrar en tus cuadernos de campo e intervenir didácticamente.
            </p>
            <div className="text-xs text-[#5C7364] pt-3 border-t border-[#E5DFD4]">
              ¿Sabías que delimitar bien el lugar y los sujetos te ahorra el 80% de las correcciones metodológicas?
            </div>
          </div>

          {/* Inspiration Prompts */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] shadow-xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1E3D2F] mb-3">
              <Sparkles className="w-4 h-4 text-[#2D5A43]" />
              <span>Ejemplos para inspirarte</span>
            </div>
            <p className="text-xs text-[#6B7E72] mb-3">
              Hacé clic en cualquiera para cargar una redacción de referencia en tu tema:
            </p>
            <div className="space-y-2.5">
              {themeSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applySuggestion(item.theme)}
                  className="w-full text-left p-3 rounded-xl border border-[#EAE4D7] bg-[#FAF8F5] hover:bg-[#F3EFE7] hover:border-[#D5CEC0] transition-colors"
                >
                  <span className="block text-xs font-semibold text-[#1E3D2F] mb-0.5">
                    {item.title}
                  </span>
                  <span className="block text-[11px] text-[#55695C] line-clamp-2">
                    {item.theme}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#E8E2D5] flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#5F7366]">
          <button
            type="button"
            onClick={onSaveManual}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D5CEC0] hover:bg-[#FAF8F5] text-[#2D5A43] font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Guardar borrador'}</span>
          </button>
          <span className="hidden sm:inline">Tus cambios se guardan automáticamente en este navegador.</span>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] active:bg-[#1A3628] text-white text-sm font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43]"
        >
          <span>Continuar al Paso 2: El Problema</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
