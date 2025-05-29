import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LostLeadsPanelProps {
  className?: string;
}

interface ReasonStat {
  id: string;
  percentage: number;
  description: string;
}

const reasonsData: ReasonStat[] = [
  { id: 'reason1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'reason2', percentage: 20, description: 'However venture pursuit' },
  { id: 'reason3', percentage: 10, description: 'Other' },
  { id: 'reason4', percentage: 30, description: 'The proposal is unclear' }, // As per image, this repeats
];

interface OtherStat {
  id: string;
  value: string;
  label: string;
  tooltip?: string;
}

const otherData: OtherStat[] = [
  { id: 'stat1', value: '900', label: 'total leads count' },
  { id: 'stat2', value: '12', label: 'days in average to convert lead' },
  { id: 'stat3', value: '30', label: 'inactive leads', tooltip: 'Leads that have not shown activity in X days.' },
];

const LostLeadsPanel: React.FC<LostLeadsPanelProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
        <Card>
          <CardHeader>
            <CardTitle>Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 pt-2">
            {reasonsData.map((reason) => (
              <div key={reason.id}>
                <p className="text-3xl font-bold text-primary-text">{reason.percentage}%</p>
                <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 pt-2">
            {otherData.map((stat) => (
              <div key={stat.id}>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-primary-text">{stat.value}</p>
                  {stat.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stat.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default LostLeadsPanel;
