
export type ConsumptionMethod = 'Smoke' | 'Vape' | 'Edible' | 'Tincture' | 'Topical' | 'Other';

export type StrainType = 'Indica' | 'Sativa' | 'Hybrid' | 'CBD' | 'Unknown';

export type MoodEffect = 'Relaxed' | 'Euphoric' | 'Happy' | 'Uplifted' | 'Creative' | 'Focused' | 'Energetic' | 'Sleepy';

export type PhysicalEffect = 'Pain Relief' | 'Inflammation Relief' | 'Appetite' | 'Sleep Aid' | 'Nausea Relief' | 'Headache Relief';

export type Strain = {
  id: string;
  name: string;
  type: StrainType;
  thcContent?: number;
  cbdContent?: number;
  description?: string;
  favorite: boolean;
};

export type ConsumptionEntry = {
  id: string;
  date: Date;
  strainId: string;
  amount: number;
  unit: string;
  method: ConsumptionMethod;
  moodEffects: MoodEffect[];
  physicalEffects: PhysicalEffect[];
  rating: number;
  notes?: string;
  store?: string; // Added store field
};

export type ConsumptionWithStrain = ConsumptionEntry & {
  strain: Strain;
};
