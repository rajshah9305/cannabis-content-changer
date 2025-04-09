
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConsumptionStore } from '@/hooks/useConsumptionStore';
import { 
  ConsumptionMethod, 
  MoodEffect, 
  PhysicalEffect, 
  Strain 
} from '@/models/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const moodEffects: MoodEffect[] = [
  'Relaxed', 'Euphoric', 'Happy', 'Uplifted', 'Creative', 'Focused', 'Energetic', 'Sleepy',
];

const physicalEffects: PhysicalEffect[] = [
  'Pain Relief', 'Inflammation Relief', 'Appetite', 'Sleep Aid', 'Nausea Relief', 'Headache Relief',
];

const consumptionMethods: ConsumptionMethod[] = [
  'Smoke', 'Vape', 'Edible', 'Tincture', 'Topical', 'Other',
];

const AddEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { strains, addConsumptionEntry } = useConsumptionStore();
  const { toast } = useToast();
  
  // Form state
  const [selectedStrainId, setSelectedStrainId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0.5);
  const [unit, setUnit] = useState<string>('g');
  const [method, setMethod] = useState<ConsumptionMethod>('Vape');
  const [selectedMoodEffects, setSelectedMoodEffects] = useState<MoodEffect[]>([]);
  const [selectedPhysicalEffects, setSelectedPhysicalEffects] = useState<PhysicalEffect[]>([]);
  const [rating, setRating] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  
  // Handle mood effect toggle
  const toggleMoodEffect = (effect: MoodEffect) => {
    if (selectedMoodEffects.includes(effect)) {
      setSelectedMoodEffects(selectedMoodEffects.filter(item => item !== effect));
    } else {
      setSelectedMoodEffects([...selectedMoodEffects, effect]);
    }
  };
  
  // Handle physical effect toggle
  const togglePhysicalEffect = (effect: PhysicalEffect) => {
    if (selectedPhysicalEffects.includes(effect)) {
      setSelectedPhysicalEffects(selectedPhysicalEffects.filter(item => item !== effect));
    } else {
      setSelectedPhysicalEffects([...selectedPhysicalEffects, effect]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStrainId) {
      toast({
        title: "Error",
        description: "Please select a strain",
        variant: "destructive",
      });
      return;
    }
    
    addConsumptionEntry({
      date: new Date(),
      strainId: selectedStrainId,
      amount,
      unit,
      method,
      moodEffects: selectedMoodEffects,
      physicalEffects: selectedPhysicalEffects,
      rating,
      notes,
    });
    
    toast({
      title: "Entry Added",
      description: "Your consumption entry has been saved.",
    });
    
    navigate('/');
  };
  
  // Get unit options based on selected method
  const getUnitOptions = () => {
    switch (method) {
      case 'Edible':
        return ['mg', 'pieces'];
      case 'Tincture':
        return ['ml', 'drops'];
      case 'Topical':
        return ['applications'];
      case 'Smoke':
      case 'Vape':
      default:
        return ['g', 'puffs', 'bowls'];
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Add Consumption Entry</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="strain">Strain</Label>
                <Select 
                  value={selectedStrainId} 
                  onValueChange={setSelectedStrainId}
                >
                  <SelectTrigger id="strain">
                    <SelectValue placeholder="Select a strain" />
                  </SelectTrigger>
                  <SelectContent>
                    {strains.map((strain: Strain) => (
                      <SelectItem key={strain.id} value={strain.id}>
                        {strain.name} ({strain.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {getUnitOptions().map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="method">Consumption Method</Label>
                <Select value={method} onValueChange={(value) => setMethod(value as ConsumptionMethod)}>
                  <SelectTrigger id="method">
                    <SelectValue placeholder="How did you consume it?" />
                  </SelectTrigger>
                  <SelectContent>
                    {consumptionMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label>Mood Effects</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {moodEffects.map(effect => (
                    <div key={effect} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mood-${effect}`} 
                        checked={selectedMoodEffects.includes(effect)}
                        onCheckedChange={() => toggleMoodEffect(effect)}
                      />
                      <Label htmlFor={`mood-${effect}`} className="text-sm cursor-pointer">
                        {effect}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Physical Effects</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {physicalEffects.map(effect => (
                    <div key={effect} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`physical-${effect}`} 
                        checked={selectedPhysicalEffects.includes(effect)}
                        onCheckedChange={() => togglePhysicalEffect(effect)}
                      />
                      <Label htmlFor={`physical-${effect}`} className="text-sm cursor-pointer">
                        {effect}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="rating">Rating</Label>
                  <span className="text-xl font-bold">{rating} / 5</span>
                </div>
                <Slider
                  id="rating"
                  min={1}
                  max={5}
                  step={1}
                  value={[rating]}
                  onValueChange={([value]) => setRating(value)}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Great</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="How did it make you feel? Any other observations?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button type="submit" className="w-full bg-cannabis-500 hover:bg-cannabis-600">
          <Save className="mr-2 h-4 w-4" />
          Save Entry
        </Button>
      </form>
    </div>
  );
};

export default AddEntryPage;
