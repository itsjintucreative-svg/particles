export enum ParticleType {
  QUARK = 'Quark',
  LEPTON = 'Lepton',
  GAUGE_BOSON = 'Gauge Boson',
  SCALAR_BOSON = 'Scalar Boson',
}

export enum Generation {
  FIRST = 'I',
  SECOND = 'II',
  THIRD = 'III',
  NONE = '-',
}

export interface Particle {
  id: string;
  name: string;
  symbol: string;
  type: ParticleType;
  mass: string;
  charge: string;
  spin: string;
  generation: Generation;
  description: string;
  discovered: string;
  interactions: string[]; // List of forces it interacts with
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
