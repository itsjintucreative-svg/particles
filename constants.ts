import { Particle, ParticleType, Generation } from './types';

export const PARTICLES: Particle[] = [
  // Fermions - Quarks
  {
    id: 'up',
    name: 'Up Quark',
    symbol: 'u',
    type: ParticleType.QUARK,
    mass: '2.2 MeV/c²',
    charge: '+2/3 e',
    spin: '1/2',
    generation: Generation.FIRST,
    discovered: '1968',
    description: 'The lightest of all quarks. Along with the down quark, it forms the protons and neutrons of atomic nuclei.',
    interactions: ['Strong', 'Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'down',
    name: 'Down Quark',
    symbol: 'd',
    type: ParticleType.QUARK,
    mass: '4.7 MeV/c²',
    charge: '-1/3 e',
    spin: '1/2',
    generation: Generation.FIRST,
    discovered: '1968',
    description: ' The second-lightest quark. It is a key component of protons and neutrons.',
    interactions: ['Strong', 'Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'charm',
    name: 'Charm Quark',
    symbol: 'c',
    type: ParticleType.QUARK,
    mass: '1.27 GeV/c²',
    charge: '+2/3 e',
    spin: '1/2',
    generation: Generation.SECOND,
    discovered: '1974',
    description: 'A heavier cousin of the up quark. Its discovery (the "November Revolution") was crucial for the Standard Model.',
    interactions: ['Strong', 'Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'strange',
    name: 'Strange Quark',
    symbol: 's',
    type: ParticleType.QUARK,
    mass: '96 MeV/c²',
    charge: '-1/3 e',
    spin: '1/2',
    generation: Generation.SECOND,
    discovered: '1968',
    description: 'Found in "strange" particles like Kaons. It has a longer lifetime than expected for its mass.',
    interactions: ['Strong', 'Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'top',
    name: 'Top Quark',
    symbol: 't',
    type: ParticleType.QUARK,
    mass: '173 GeV/c²',
    charge: '+2/3 e',
    spin: '1/2',
    generation: Generation.THIRD,
    discovered: '1995',
    description: 'The most massive elementary particle known. It decays so quickly it cannot hadronize.',
    interactions: ['Strong', 'Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'bottom',
    name: 'Bottom Quark',
    symbol: 'b',
    type: ParticleType.QUARK,
    mass: '4.18 GeV/c²',
    charge: '-1/3 e',
    spin: '1/2',
    generation: Generation.THIRD,
    discovered: '1977',
    description: 'Also known as the beauty quark. Interactions involving bottom quarks are key to studying CP violation.',
    interactions: ['Strong', 'Electromagnetic', 'Weak', 'Gravity']
  },

  // Fermions - Leptons
  {
    id: 'electron',
    name: 'Electron',
    symbol: 'e⁻',
    type: ParticleType.LEPTON,
    mass: '0.511 MeV/c²',
    charge: '-1 e',
    spin: '1/2',
    generation: Generation.FIRST,
    discovered: '1897',
    description: 'The familiar negatively charged particle orbiting the atomic nucleus. It is stable and essential for chemistry.',
    interactions: ['Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'electron_neutrino',
    name: 'Electron Neutrino',
    symbol: 'νe',
    type: ParticleType.LEPTON,
    mass: '< 1 eV/c²',
    charge: '0',
    spin: '1/2',
    generation: Generation.FIRST,
    discovered: '1956',
    description: 'An electrically neutral, extremely light particle that rarely interacts with matter.',
    interactions: ['Weak', 'Gravity']
  },
  {
    id: 'muon',
    name: 'Muon',
    symbol: 'μ⁻',
    type: ParticleType.LEPTON,
    mass: '105.7 MeV/c²',
    charge: '-1 e',
    spin: '1/2',
    generation: Generation.SECOND,
    discovered: '1936',
    description: 'Similar to an electron but roughly 200 times more massive. It is unstable and decays rapidly.',
    interactions: ['Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'muon_neutrino',
    name: 'Muon Neutrino',
    symbol: 'νμ',
    type: ParticleType.LEPTON,
    mass: '< 0.17 MeV/c²',
    charge: '0',
    spin: '1/2',
    generation: Generation.SECOND,
    discovered: '1962',
    description: 'The neutrino flavor paired with the muon.',
    interactions: ['Weak', 'Gravity']
  },
  {
    id: 'tau',
    name: 'Tau',
    symbol: 'τ⁻',
    type: ParticleType.LEPTON,
    mass: '1.777 GeV/c²',
    charge: '-1 e',
    spin: '1/2',
    generation: Generation.THIRD,
    discovered: '1975',
    description: 'The heaviest lepton. It is the only lepton massive enough to decay into hadrons.',
    interactions: ['Electromagnetic', 'Weak', 'Gravity']
  },
  {
    id: 'tau_neutrino',
    name: 'Tau Neutrino',
    symbol: 'ντ',
    type: ParticleType.LEPTON,
    mass: '< 18.2 MeV/c²',
    charge: '0',
    spin: '1/2',
    generation: Generation.THIRD,
    discovered: '2000',
    description: 'The neutrino flavor paired with the tau particle.',
    interactions: ['Weak', 'Gravity']
  },

  // Bosons
  {
    id: 'gluon',
    name: 'Gluon',
    symbol: 'g',
    type: ParticleType.GAUGE_BOSON,
    mass: '0',
    charge: '0',
    spin: '1',
    generation: Generation.NONE,
    discovered: '1979',
    description: 'The mediator of the strong interaction. It "glues" quarks together to form protons and neutrons.',
    interactions: ['Strong']
  },
  {
    id: 'photon',
    name: 'Photon',
    symbol: 'γ',
    type: ParticleType.GAUGE_BOSON,
    mass: '0',
    charge: '0',
    spin: '1',
    generation: Generation.NONE,
    discovered: '1905',
    description: 'The quantum of light and the mediator of the electromagnetic force.',
    interactions: ['Electromagnetic']
  },
  {
    id: 'z_boson',
    name: 'Z Boson',
    symbol: 'Z⁰',
    type: ParticleType.GAUGE_BOSON,
    mass: '91.2 GeV/c²',
    charge: '0',
    spin: '1',
    generation: Generation.NONE,
    discovered: '1983',
    description: 'A heavy, neutral mediator of the weak force.',
    interactions: ['Weak']
  },
  {
    id: 'w_boson',
    name: 'W Boson',
    symbol: 'W±',
    type: ParticleType.GAUGE_BOSON,
    mass: '80.4 GeV/c²',
    charge: '±1 e',
    spin: '1',
    generation: Generation.NONE,
    discovered: '1983',
    description: 'Charged mediators of the weak force, responsible for radioactive decay.',
    interactions: ['Weak', 'Electromagnetic']
  },
  {
    id: 'higgs',
    name: 'Higgs Boson',
    symbol: 'H⁰',
    type: ParticleType.SCALAR_BOSON,
    mass: '125.1 GeV/c²',
    charge: '0',
    spin: '0',
    generation: Generation.NONE,
    discovered: '2012',
    description: 'An excitation of the Higgs field, which gives mass to other elementary particles.',
    interactions: ['Weak', 'Gravity (indirectly gives mass)']
  },
];

export const FORCE_COLORS = {
  Strong: '#a855f7', // Purple
  Electromagnetic: '#facc15', // Yellow
  Weak: '#ef4444', // Red
  Gravity: '#94a3b8', // Slate
};

export const TYPE_COLORS = {
  [ParticleType.QUARK]: 'bg-purple-500/20 border-purple-500/50 text-purple-200',
  [ParticleType.LEPTON]: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200',
  [ParticleType.GAUGE_BOSON]: 'bg-rose-500/20 border-rose-500/50 text-rose-200',
  [ParticleType.SCALAR_BOSON]: 'bg-amber-500/20 border-amber-500/50 text-amber-200',
};

export const TYPE_COLORS_SOLID = {
  [ParticleType.QUARK]: '#a855f7',
  [ParticleType.LEPTON]: '#10b981',
  [ParticleType.GAUGE_BOSON]: '#f43f5e',
  [ParticleType.SCALAR_BOSON]: '#f59e0b',
};
