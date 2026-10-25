import { Investigation, EMPTY_INVESTIGATION, SAMPLE_INVESTIGATION } from '../types/investigation';

const STORAGE_KEY = 'aula_viva_investigations_v1';
const ACTIVE_ID_KEY = 'aula_viva_active_id_v1';

export function getStoredInvestigations(): Investigation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample example for first time so user can explore immediately
      const initial = [SAMPLE_INVESTIGATION];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [SAMPLE_INVESTIGATION];
  } catch (e) {
    console.error('Error loading investigations from storage', e);
    return [SAMPLE_INVESTIGATION];
  }
}

export function saveStoredInvestigations(items: Investigation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving investigations to storage', e);
  }
}

export function getActiveInvestigationId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_ID_KEY);
  } catch {
    return null;
  }
}

export function setActiveInvestigationId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_ID_KEY);
    }
  } catch {
    // ignore
  }
}

export function createNewInvestigation(): Investigation {
  const newProject: Investigation = {
    ...EMPTY_INVESTIGATION,
    id: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: 'Nueva investigación pedagógica',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    currentStep: 1,
  };

  const current = getStoredInvestigations();
  const updated = [newProject, ...current];
  saveStoredInvestigations(updated);
  setActiveInvestigationId(newProject.id);
  return newProject;
}

export function saveCurrentInvestigation(investigation: Investigation): void {
  const current = getStoredInvestigations();
  const index = current.findIndex((item) => item.id === investigation.id);
  const updatedInvestigation: Investigation = {
    ...investigation,
    updatedAt: Date.now(),
    // Keep title in sync with theme if title is empty or placeholder
    title: investigation.title.trim() || investigation.theme.trim() || 'Investigación sin título',
  };

  let updatedList: Investigation[];
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = updatedInvestigation;
  } else {
    updatedList = [updatedInvestigation, ...current];
  }
  saveStoredInvestigations(updatedList);
}

export function deleteStoredInvestigation(id: string): Investigation[] {
  const current = getStoredInvestigations();
  const updated = current.filter((item) => item.id !== id);
  saveStoredInvestigations(updated);
  if (getActiveInvestigationId() === id) {
    setActiveInvestigationId(null);
  }
  return updated;
}

export function duplicateStoredInvestigation(id: string): Investigation | null {
  const current = getStoredInvestigations();
  const existing = current.find((item) => item.id === id);
  if (!existing) return null;

  const clone: Investigation = {
    ...existing,
    id: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: `${existing.title} (Copia)`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const updated = [clone, ...current];
  saveStoredInvestigations(updated);
  setActiveInvestigationId(clone.id);
  return clone;
}

export function exportInvestigationAsJSON(investigation: Investigation): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(investigation, null, 2));
  const downloadAnchor = document.createElement('a');
  const safeName = (investigation.title || 'investigacion_aula_viva')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .substring(0, 30);
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${safeName}_aula_viva.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
