import React from 'react';
import { BookOpen, Plus, FolderKanban, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  onNewInvestigation: () => void;
  onOpenMyProjects: () => void;
  onOpenMethodologyGuide: () => void;
  isEditing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onNewInvestigation,
  onOpenMyProjects,
  onOpenMethodologyGuide,
}) => {
  return (
    <header className="no-print bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#E8E2D5] px-4 md:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A43] rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2D5A43] flex items-center justify-center text-white shrink-0 group-hover:bg-[#234735] transition-colors shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1E3D2F] whitespace-nowrap shrink-0">
            Aula Viva
          </span>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A5D52]">
          <button
            onClick={onGoHome}
            className="hover:text-[#1E3D2F] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Inicio
          </button>
          <button
            onClick={onOpenMyProjects}
            className="hover:text-[#1E3D2F] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Mis Investigaciones</span>
          </button>
          <button
            onClick={onOpenMethodologyGuide}
            className="hover:text-[#1E3D2F] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Guía Docente</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNewInvestigation}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-medium text-white bg-[#2D5A43] hover:bg-[#234735] active:bg-[#1A3628] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D5A43]"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Investigación</span>
          </button>
        </div>
      </div>
    </header>
  );
};
