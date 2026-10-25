import React from 'react';
import { X, BookOpen, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D5] shadow-xl p-6 md:p-8 space-y-6">
        <div className="flex items-start justify-between pb-4 border-b border-[#F0EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-xl font-bold font-serif-academic text-[#1E3D2F]">
                Guía Metodológica para Formación Docente
              </h3>
              <p className="text-xs text-[#6B7E72]">
                Orientaciones pedagógicas para tus prácticas y residencias
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar guía"
            className="p-1.5 rounded-lg text-[#7A8C81] hover:text-[#1E3D2F] hover:bg-[#F4EFE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[#1E3D2F] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#2D5A43]" />
            <span>1. ¿Cómo elegir el Tema y el Lugar?</span>
          </h4>
          <p className="text-xs md:text-sm text-[#465B4E] leading-relaxed">
            La investigación en la formación docente no busca teorías universales abstractas, sino comprender y enriquecer la propia práctica de enseñanza.
            Elegí una escuela, curso y contenido específico donde estés realizando observaciones o prácticas.
          </p>
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE4D7] text-xs text-[#3E5246]">
            <strong>Fórmula recomendada:</strong> [Estrategia o contenido didáctico] + [Grupo de estudiantes] + [Institución o contexto].
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[#1E3D2F] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#B56728]" />
            <span>2. No confundir "Queja" con "Problema de Investigación"</span>
          </h4>
          <p className="text-xs md:text-sm text-[#465B4E] leading-relaxed">
            Una queja es: <em>"Los alumnos no leen en sus casas"</em>.
            Un problema de investigación pedagógica se pregunta: <em>"¿Qué estrategias de lectura compartida en el aula favorecen el acercamiento autónomo a los textos literarios?"</em>.
          </p>
          <p className="text-xs md:text-sm text-[#465B4E] leading-relaxed">
            Formulá siempre preguntas abiertas con <strong>¿Cómo...?</strong>, <strong>¿De qué manera...?</strong> o <strong>¿Cuáles son los efectos de...?</strong>.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[#1E3D2F] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
            <span>3. La regla de oro de los Objetivos</span>
          </h4>
          <ul className="text-xs md:text-sm text-[#465B4E] space-y-2 list-disc pl-5">
            <li>
              <strong>Siempre en infinitivo:</strong> <em>Analizar, Identificar, Evaluar, Diseñar, Explorar</em>.
            </li>
            <li>
              <strong>Coherencia directa:</strong> Si tu pregunta es <em>"¿De qué manera incide X en Y?"</em>, tu objetivo general debe ser <em>"Analizar la incidencia de X en Y"</em>.
            </li>
            <li>
              <strong>No confundir con tareas de clase:</strong> Preparar una fotocopia, armar carteleras o corregir cuadernos son actividades docentes, no objetivos de indagación.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[#1E3D2F]">
            4. ¿Dónde se guardan mis avances?
          </h4>
          <p className="text-xs text-[#465B4E] leading-relaxed">
            Aula Viva guarda automáticamente todo en la memoria de este navegador (LocalStorage). Podés cerrar la pestaña y volver cuando quieras.
            Además, en el Paso 4 tenés las opciones de <strong>Copiar para Word</strong>, <strong>Imprimir / Guardar en PDF</strong> y <strong>Descargar archivo de respaldo</strong>.
          </p>
        </div>

        <div className="pt-4 border-t border-[#F0EBE1] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-white text-sm font-semibold transition-colors"
          >
            Entendido, volver a mi trabajo
          </button>
        </div>
      </div>
    </div>
  );
};
