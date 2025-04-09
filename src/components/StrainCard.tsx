
import React from 'react';
import { Star, Trash2, Edit, Heart } from 'lucide-react';
import { Strain } from '../models/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface StrainCardProps {
  strain: Strain;
  onDelete?: (id: string) => void;
  onEdit?: (strain: Strain) => void;
  onFavoriteToggle: (id: string) => void;
}

const StrainCard: React.FC<StrainCardProps> = ({ 
  strain, 
  onDelete, 
  onEdit, 
  onFavoriteToggle 
}) => {
  // Get badge color based on strain type
  const getStrainTypeColor = (type: string) => {
    switch (type) {
      case 'Indica': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Sativa': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Hybrid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'CBD': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <Card className="overflow-hidden border border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{strain.name}</CardTitle>
            <Badge 
              className={`${getStrainTypeColor(strain.type)} mt-1`} 
              variant="outline"
            >
              {strain.type}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onFavoriteToggle(strain.id)}
            >
              <Heart className={`h-5 w-5 ${strain.favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(strain)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem onClick={() => onDelete(strain.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {strain.description && (
          <div className="text-sm mb-2">
            <p>{strain.description}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm">
            <span className="text-muted-foreground">THC:</span>
            <span className="ml-1 font-medium">{strain.thcContent || 0}%</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">CBD:</span>
            <span className="ml-1 font-medium">{strain.cbdContent || 0}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrainCard;
