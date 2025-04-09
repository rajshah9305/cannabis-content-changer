
import { useState } from 'react';
import { mockConsumptionEntries, mockStrains, getConsumptionWithStrains } from '../services/mockData';
import { ConsumptionEntry, ConsumptionWithStrain, Strain } from '../models/types';

export const useConsumptionStore = () => {
  const [strains, setStrains] = useState<Strain[]>(mockStrains);
  const [consumptionEntries, setConsumptionEntries] = useState<ConsumptionEntry[]>(mockConsumptionEntries);
  
  // Get entries with strain data
  const getEntriesWithStrains = (): ConsumptionWithStrain[] => {
    return consumptionEntries.map(entry => {
      const strain = strains.find(strain => strain.id === entry.strainId);
      return { ...entry, strain: strain! };
    });
  };
  
  // Add a new strain
  const addStrain = (newStrain: Omit<Strain, 'id'>) => {
    const id = (strains.length + 1).toString();
    const strain = { ...newStrain, id };
    setStrains([...strains, strain]);
    return strain;
  };
  
  // Update an existing strain
  const updateStrain = (updatedStrain: Strain) => {
    setStrains(strains.map(strain => 
      strain.id === updatedStrain.id ? updatedStrain : strain
    ));
  };
  
  // Toggle favorite status of a strain
  const toggleFavoriteStrain = (strainId: string) => {
    setStrains(strains.map(strain => 
      strain.id === strainId ? { ...strain, favorite: !strain.favorite } : strain
    ));
  };
  
  // Add a new consumption entry
  const addConsumptionEntry = (newEntry: Omit<ConsumptionEntry, 'id'>) => {
    const id = (consumptionEntries.length + 1).toString();
    const entry = { ...newEntry, id };
    setConsumptionEntries([entry, ...consumptionEntries]);
    return entry;
  };
  
  // Update an existing consumption entry
  const updateConsumptionEntry = (updatedEntry: ConsumptionEntry) => {
    setConsumptionEntries(consumptionEntries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
  };
  
  // Delete a consumption entry
  const deleteConsumptionEntry = (entryId: string) => {
    setConsumptionEntries(consumptionEntries.filter(entry => entry.id !== entryId));
  };
  
  return {
    strains,
    consumptionEntries: getEntriesWithStrains(),
    addStrain,
    updateStrain,
    toggleFavoriteStrain,
    addConsumptionEntry,
    updateConsumptionEntry,
    deleteConsumptionEntry
  };
};
