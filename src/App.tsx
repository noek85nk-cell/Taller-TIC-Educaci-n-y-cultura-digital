import { useState, useEffect, useCallback, useTransition } from 'react';
import { Investigation, SAMPLE_INVESTIGATION } from './types/investigation';
import {
  getStoredInvestigations,
  saveCurrentInvestigation,
  createNewInvestigation,
  deleteStoredInvestigation,
  duplicateStoredInvestigation,
  getActiveInvestigationId,
  setActiveInvestigationId,
} from './services/storage';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { Step1ThemeContext } from './components/Step1ThemeContext';
import { Step2Problem } from './components/Step2Problem';
import { Step3Objectives } from './components/Step3Objectives';
import { Step4Summary } from './components/Step4Summary';
import { HomeView } from './components/HomeView';
import { MethodologyModal } from './components/MethodologyModal';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation | null>(null);
  const [view, setView] = useState<'home' | 'wizard'>('home');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedMessage, setLastSavedMessage] = useState<string>('');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Load from local storage on mount
  useEffect(() => {
    const list = getStoredInvestigations();
    setInvestigations(list);

    const activeId = getActiveInvestigationId();
    if (activeId) {
      const found = list.find((item) => item.id === activeId);
      if (found) {
        setActiveInvestigation(found);
      }
    }
  }, []);

  // Save changes to active investigation with auto-save
  const handleUpdateInvestigation = useCallback((updates: Partial<Investigation>) => {
    setActiveInvestigation((prev) => {
      if (!prev) return null;
      const updated: Investigation = {
        ...prev,
        ...updates,
        updatedAt: Date.now(),
      };
      // Perform storage save
      saveCurrentInvestigation(updated);
      setIsSaving(true);
      setLastSavedMessage('Guardado');
      setTimeout(() => {
        setIsSaving(false);
      }, 600);

      // Keep investigations list updated
      setInvestigations((currentList) => {
        const idx = currentList.findIndex((item) => item.id === updated.id);
        if (idx >= 0) {
          const next = [...currentList];
          next[idx] = updated;
          return next;
        }
        return [updated, ...currentList];
      });

      return updated;
    });
  }, []);

  const handleManualSave = useCallback(() => {
    if (activeInvestigation) {
      setIsSaving(true);
      saveCurrentInvestigation(activeInvestigation);
      setLastSavedMessage('Guardado en este navegador');
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    }
  }, [activeInvestigation]);

  // Handle Project Creation
  const handleNewProject = useCallback(() => {
    startTransition(() => {
      const created = createNewInvestigation();
      setActiveInvestigation(created);
      setInvestigations(getStoredInvestigations());
      setView('wizard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  // Handle Loading Sample
  const handleLoadSample = useCallback(() => {
    startTransition(() => {
      const sample = {
        ...SAMPLE_INVESTIGATION,
        updatedAt: Date.now(),
      };
      saveCurrentInvestigation(sample);
      setActiveInvestigationId(sample.id);
      setActiveInvestigation(sample);
      setInvestigations(getStoredInvestigations());
      setView('wizard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  // Handle Opening an existing project
  const handleOpenProject = useCallback((id: string) => {
    startTransition(() => {
      const found = investigations.find((item) => item.id === id);
      if (found) {
        setActiveInvestigationId(found.id);
        setActiveInvestigation(found);
        setView('wizard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, [investigations]);

  // Handle Deleting a project
  const handleDeleteProject = useCallback((id: string) => {
    const toDelete = investigations.find((item) => item.id === id);
    const title = toDelete?.title || 'esta investigación';
    if (window.confirm(`¿Estás seguro de que querés eliminar "${title}"?`)) {
      const updated = deleteStoredInvestigation(id);
      setInvestigations(updated);
      if (activeInvestigation?.id === id) {
        setActiveInvestigation(null);
        setView('home');
      }
    }
  }, [investigations, activeInvestigation]);

  // Handle Duplicating a project
  const handleDuplicateProject = useCallback((id: string) => {
    const duplicated = duplicateStoredInvestigation(id);
    if (duplicated) {
      setInvestigations(getStoredInvestigations());
      setActiveInvestigation(duplicated);
      setView('wizard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Step transitions
  const handleStepChange = useCallback((stepNumber: number) => {
    if (activeInvestigation) {
      handleUpdateInvestigation({ currentStep: stepNumber });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeInvestigation, handleUpdateInvestigation]);

  const currentStep = activeInvestigation ? activeInvestigation.currentStep || 1 : 1;

  // Completed steps calculation for visual checkmarks
  const completedSteps: number[] = [];
  if (activeInvestigation) {
    if (activeInvestigation.schoolOrPlace && activeInvestigation.theme) completedSteps.push(1);
    if (activeInvestigation.researchQuestion && activeInvestigation.observedSituation) completedSteps.push(2);
    if (activeInvestigation.generalObjective) completedSteps.push(3);
    if (completedSteps.includes(1) && completedSteps.includes(2) && completedSteps.includes(3)) completedSteps.push(4);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2922]">
      {/* Header */}
      <Header
        onGoHome={() => setView('home')}
        onNewInvestigation={handleNewProject}
        onOpenMyProjects={() => {
          setView('home');
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }}
        onOpenMethodologyGuide={() => setIsGuideOpen(true)}
        isEditing={view === 'wizard'}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-6 md:py-10">
        {view === 'home' || !activeInvestigation ? (
          <HomeView
            investigations={investigations}
            onNewInvestigation={handleNewProject}
            onLoadSample={handleLoadSample}
            onOpenInvestigation={handleOpenProject}
            onDuplicateInvestigation={handleDuplicateProject}
            onDeleteInvestigation={handleDeleteProject}
            onOpenMethodologyGuide={() => setIsGuideOpen(true)}
          />
        ) : (
          <div className="space-y-6">
            {/* Top Workspace Bar */}
            <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E2D5]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setView('home')}
                  className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#4A5D52] hover:text-[#1E3D2F] transition-colors py-1 px-2 rounded-lg hover:bg-[#F0EBE1]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver al menú de proyectos</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#6B7E72]">
                {lastSavedMessage && (
                  <span className="inline-flex items-center gap-1 text-[#2D5A43] font-medium bg-[#EBF4EE] px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                    <span>{lastSavedMessage}</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-[#2D5A43] hover:underline font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ver consejos de redacción</span>
                </button>
              </div>
            </div>

            {/* Stepper (1 to 4) */}
            <Stepper
              currentStep={currentStep}
              onSelectStep={handleStepChange}
              completedSteps={completedSteps}
            />

            {/* Step Content */}
            <div className="pt-2">
              {currentStep === 1 && (
                <Step1ThemeContext
                  investigation={activeInvestigation}
                  onChange={handleUpdateInvestigation}
                  onNext={() => handleStepChange(2)}
                  onSaveManual={handleManualSave}
                  isSaving={isSaving}
                />
              )}

              {currentStep === 2 && (
                <Step2Problem
                  investigation={activeInvestigation}
                  onChange={handleUpdateInvestigation}
                  onNext={() => handleStepChange(3)}
                  onPrev={() => handleStepChange(1)}
                  onSaveManual={handleManualSave}
                  isSaving={isSaving}
                />
              )}

              {currentStep === 3 && (
                <Step3Objectives
                  investigation={activeInvestigation}
                  onChange={handleUpdateInvestigation}
                  onNext={() => handleStepChange(4)}
                  onPrev={() => handleStepChange(2)}
                  onSaveManual={handleManualSave}
                  isSaving={isSaving}
                />
              )}

              {currentStep === 4 && (
                <Step4Summary
                  investigation={activeInvestigation}
                  onGoToStep={handleStepChange}
                  onNewInvestigation={handleNewProject}
                  onGoHome={() => setView('home')}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-[#E8E2D5] bg-[#FAF8F5] py-8 px-4 text-center text-xs text-[#6B7E72] space-y-2">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1E3D2F]">Aula Viva</span>
            <span aria-hidden="true">·</span>
            <span>Investigación pedagógica en el aula</span>
          </div>
          <div className="flex items-center gap-4 text-[#5A6E61]">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-[#1E3D2F] transition-colors"
            >
              Guía Metodológica
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleLoadSample}
              className="hover:text-[#1E3D2F] transition-colors"
            >
              Cargar Ejemplo
            </button>
            <span aria-hidden="true">·</span>
            <span>Almacenamiento 100% local</span>
          </div>
        </div>
      </footer>

      {/* Methodology Guide Modal */}
      <MethodologyModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
