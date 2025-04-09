
import { ConsumptionEntry, Strain } from '../models/types';

// Sample strains
export const mockStrains: Strain[] = [
  { 
    id: '1', 
    name: 'Blue Dream', 
    type: 'Hybrid', 
    thcContent: 18, 
    cbdContent: 0.5, 
    description: 'A popular strain known for its balanced effects, combining the best of both sativa and indica.',
    favorite: true
  },
  { 
    id: '2', 
    name: 'OG Kush', 
    type: 'Indica', 
    thcContent: 23, 
    cbdContent: 0.3, 
    description: 'A potent indica known for its powerful relaxation effects.',
    favorite: false
  },
  { 
    id: '3', 
    name: 'Sour Diesel', 
    type: 'Sativa', 
    thcContent: 20, 
    cbdContent: 0.2, 
    description: 'An energizing sativa that provides a fast-acting boost.',
    favorite: true
  },
  { 
    id: '4', 
    name: 'ACDC', 
    type: 'CBD', 
    thcContent: 1, 
    cbdContent: 20, 
    description: 'A high-CBD strain known for medicinal benefits without significant psychoactive effects.',
    favorite: false
  },
  { 
    id: '5', 
    name: 'Purple Punch', 
    type: 'Indica', 
    thcContent: 19, 
    cbdContent: 0.1, 
    description: 'A sweet, dessert-like strain with relaxing effects.',
    favorite: true
  },
];

// Sample consumption entries
export const mockConsumptionEntries: ConsumptionEntry[] = [
  {
    id: '1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0), // Today
    strainId: '1',
    amount: 0.5,
    unit: 'g',
    method: 'Vape',
    moodEffects: ['Relaxed', 'Creative'],
    physicalEffects: ['Pain Relief'],
    rating: 4,
    notes: 'Great for evening relaxation, helped with back pain.'
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // Yesterday
    strainId: '3',
    amount: 0.25,
    unit: 'g',
    method: 'Smoke',
    moodEffects: ['Energetic', 'Focused'],
    physicalEffects: [],
    rating: 5,
    notes: 'Perfect for morning productivity.'
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    strainId: '2',
    amount: 10,
    unit: 'mg',
    method: 'Edible',
    moodEffects: ['Sleepy', 'Relaxed'],
    physicalEffects: ['Sleep Aid'],
    rating: 3,
    notes: 'Took too much, felt groggy the next morning.'
  },
  {
    id: '4',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    strainId: '4',
    amount: 0.5,
    unit: 'ml',
    method: 'Tincture',
    moodEffects: [],
    physicalEffects: ['Inflammation Relief', 'Pain Relief'],
    rating: 4,
    notes: 'Great for daytime pain relief without psychoactive effects.'
  },
  {
    id: '5',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    strainId: '5',
    amount: 0.75,
    unit: 'g',
    method: 'Vape',
    moodEffects: ['Euphoric', 'Relaxed'],
    physicalEffects: ['Appetite'],
    rating: 5,
    notes: 'Perfect for weekend relaxation.'
  },
];

// Helper function to get consumption entries with strain data
export const getConsumptionWithStrains = () => {
  return mockConsumptionEntries.map(entry => {
    const strain = mockStrains.find(strain => strain.id === entry.strainId);
    return { ...entry, strain: strain! };
  });
};
