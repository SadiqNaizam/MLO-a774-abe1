import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface StatsOverviewProps {
  className?: string;
}

interface FunnelStageData {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string;
  avgTimeText?: string;
}

const funnelData: FunnelStageData[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-red-500', avgTimeText: 'Average time on this stage' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-yellow-500', avgTimeText: 'Average time on this stage' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 0, color: 'bg-indigo-600', avgTimeText: 'Average time on this stage' }, // Days set to 0 to hide tooltip if not applicable, as per image
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-green-500', avgTimeText: 'Average time on this stage' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-600', avgTimeText: 'Average time on this stage' },
];

const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface SourceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F06548' }, // accent-red
  { name: 'Behance', value: 1500, percentage: 25, color: '#FF8800' }, // accent-orange
  { name: 'Instagram', value: 1000, percentage: 15, color: '#0AB39C' }, // accent-green
  { name: 'Dribbble', value: 500, percentage: 10, color: '#299CDB' }, // accent-blue
];

const StatsOverview: React.FC<StatsOverviewProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
        <Card>
          <CardHeader>
            <CardTitle>Funnel count</CardTitle>
            <div className="text-3xl font-bold pt-2">600 <span className="text-sm font-normal text-muted-foreground">active leads</span></div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-3 flex rounded-full overflow-hidden mb-6">
              {funnelData.map(stage => (
                <div
                  key={stage.id}
                  className={cn(stage.color)}
                  style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
                  title={`${stage.name}: ${stage.count}`}
                />
              ))}
            </div>
            <ul className="space-y-3">
              {funnelData.map((stage) => (
                <li key={stage.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className={cn('w-3 h-3 rounded-sm mr-2', stage.color)}></span>
                    <span>{stage.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="w-12 text-right text-muted-foreground">{stage.count}</span>
                    <span className="w-16 text-right text-muted-foreground">$ {stage.value}</span>
                    {stage.days > 0 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="w-12 text-right text-primary-text cursor-default">{stage.days} days</span>
                        </TooltipTrigger>
                        {stage.avgTimeText && <TooltipContent><p>{stage.avgTimeText}</p></TooltipContent>}
                      </Tooltip>
                    ) : (
                      // Placeholder for alignment if no days/tooltip for an item like "In conversation"
                      <span className="w-12 text-right"></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                  >
                    {sourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number, name: string, props: {payload: SourceData}) => [`$${value}`, props.payload.name]}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right" 
                    iconType="square"
                    iconSize={10}
                    formatter={(value, entry) => {
                      const { color, payload } = entry as any; // Type assertion needed for payload structure
                      const item = payload as SourceData;
                      return (
                        <span style={{ color: 'hsl(var(--foreground))' }} className="text-sm">
                          {item.name}
                          <span className="ml-4 text-muted-foreground">$ {item.value}</span>
                          <span className="ml-2 text-muted-foreground">{item.percentage}%</span>
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
             <p className="text-xs text-muted-foreground text-right mt-2 mr-4">from leads total</p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default StatsOverview;
