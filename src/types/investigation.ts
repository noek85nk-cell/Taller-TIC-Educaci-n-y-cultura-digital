export type EducationLevel = 'inicial' | 'primario' | 'secundario' | 'superior' | 'otro';

export interface Investigation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;

  // Paso 1: Tema y Contexto
  authorName: string;
  courseOrSubject: string;
  theme: string;
  schoolOrPlace: string;
  educationLevel: EducationLevel;
  targetGroup: string;
  socioContext: string;

  // Paso 2: El Problema
  observedSituation: string;
  researchQuestion: string;
  subQuestions: string[];
  justification: string;
  pedagogicalAxis: string;

  // Paso 3: Los Objetivos
  generalObjective: string;
  specificObjectives: string[];

  // Estado del flujo
  currentStep: number; // 1 | 2 | 3 | 4
}

export const EMPTY_INVESTIGATION: Omit<Investigation, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  authorName: '',
  courseOrSubject: '',
  theme: '',
  schoolOrPlace: '',
  educationLevel: 'primario',
  targetGroup: '',
  socioContext: '',
  observedSituation: '',
  researchQuestion: '',
  subQuestions: [''],
  justification: '',
  pedagogicalAxis: '',
  generalObjective: '',
  specificObjectives: ['', '', ''],
  currentStep: 1,
};

export const SAMPLE_INVESTIGATION: Investigation = {
  id: 'ejemplo-modelo-aula-viva',
  title: 'El juego reglado como facilitador del cálculo mental en 2° grado',
  createdAt: 1729840000000,
  updatedAt: Date.now(),
  authorName: 'Camila Rossi y Lucas Peralta',
  courseOrSubject: 'Taller de Práctica Docente III - Residencia',
  theme: 'El desarrollo de estrategias de cálculo mental a través de secuencias de juegos de mesa reglados en la enseñanza de la matemática escolar.',
  schoolOrPlace: 'Escuela Primaria N° 14 "Mariano Moreno"',
  educationLevel: 'primario',
  targetGroup: 'Estudiantes de 2º grado "B" (22 niños y niñas de entre 7 y 8 años)',
  socioContext: 'Escuela de gestión pública de jornada simple ubicada en una zona urbana céntrica. La comunidad escolar muestra alto interés y participación en talleres familiares.',
  observedSituation: 'Durante las semanas de observación diagnóstica en el área de Matemática, se detectó una fuerte dependencia del conteo mecánico uno a uno con los dedos o marcas en la hoja para sumas y restas sencillas (hasta el 20), sin recurrir a relaciones numéricas memorizadas o descomposiciones aditivas.',
  researchQuestion: '¿De qué manera la implementación de secuencias didácticas basadas en juegos reglados de dados y cartas favorece la construcción de estrategias de cálculo mental reflexivo en alumnos de 2° grado?',
  subQuestions: [
    '¿Qué repertorios de cálculo (sumas de dobles, complementos al 10) dominan inicialmente los estudiantes?',
    '¿Cómo incide el momento de puesta en común y debate posterior al juego en la explicitación y circulación de estrategias entre pares?'
  ],
  justification: 'Indagar en esta problemática permite desnaturalizar la enseñanza algorítmica tradicional del cálculo y poner a prueba propuestas lúdicas con sentido formativo. Para nuestra formación docente, representa una oportunidad de sistematizar el rol de la intervención docente en el pasaje del juego espontáneo a la reflexión matemática.',
  pedagogicalAxis: 'Didáctica de la Matemática en el Primer Ciclo',
  generalObjective: 'Analizar el impacto de una secuencia didáctica mediada por juegos de dados y cartas en el desarrollo de estrategias reflexivas de cálculo mental en estudiantes de 2° grado.',
  specificObjectives: [
    'Identificar las estrategias y concepciones iniciales de cálculo que utilizan los estudiantes al resolver situaciones aditivas básicas.',
    'Diseñar e implementar una secuencia didáctica articulada con juegos reglados que promueva el uso de dobles y complementos.',
    'Evaluar los avances y reflexiones comunicadas por los alumnos durante los momentos de debate y registro grupal.'
  ],
  currentStep: 4,
};

export interface VerbCategory {
  category: string;
  description: string;
  verbs: string[];
}

export const METHODOLOGICAL_VERBS: VerbCategory[] = [
  {
    category: 'Exploración y Diagnóstico',
    description: 'Para conocer el estado inicial, describir realidades o identificar aspectos del aula.',
    verbs: ['Identificar', 'Describir', 'Explorar', 'Reconocer', 'Caracterizar', 'Registrar', 'Detectar']
  },
  {
    category: 'Análisis y Comprensión',
    description: 'Para profundizar en relaciones pedagógicas, comparar o interpretar datos observados.',
    verbs: ['Analizar', 'Comparar', 'Examinar', 'Interpretar', 'Relacionar', 'Comprender', 'Distinguir']
  },
  {
    category: 'Diseño e Intervención',
    description: 'Para planificar secuencias, dispositivos de enseñanza o recursos formativos.',
    verbs: ['Diseñar', 'Implementar', 'Elaborar', 'Proponer', 'Construir', 'Organizar', 'Desarrollar']
  },
  {
    category: 'Evaluación y Valoración',
    description: 'Para estimar resultados, reflexionar sobre la práctica o contrastar logros.',
    verbs: ['Evaluar', 'Valorar', 'Reflexionar', 'Determinar', 'Estimar', 'Verificar', 'Sistematizar']
  }
];
