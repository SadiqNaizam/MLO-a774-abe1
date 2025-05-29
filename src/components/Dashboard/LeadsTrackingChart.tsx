import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LeadsTrackingChartProps {
  className?: string;
}

const chartData = [
  { name: 'March', closedWon: 60, closedLost: 70 },
  { name: 'April', closedWon: 50, closedLost: 40 },
  { name: 'May', closedWon: 90, closedLost: 35 },
  { name: 'June', closedWon: 65, closedLost: 5 },
  { name: 'July', closedWon: 75, closedLost: 30 },
  { name: 'August', closedWon: 95, closedLost: 20 },
];

type ActiveTab = 'Leads came' | 'Leads Converted' | 'Total deals size';

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [timeRange, setTimeRange] = useState<string>('last-6-months');
  const [activeTab, setActiveTab] = useState<ActiveTab>('Leads Converted');

  const totalClosed = chartData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = chartData.reduce((sum, item) => sum + item.closedLost, 0);

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Leads tracking</CardTitle>
          <div className="pt-2 space-x-4">
            <span className="text-3xl font-bold">{totalClosed}</span>
            <span className="text-sm text-muted-foreground">total closed</span>
            <span className="text-3xl font-bold ml-4">{totalLost}</span>
            <span className="text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="this-year">This year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }} className="mt-4">
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="square"
                iconSize={10}
                formatter={(value, entry) => {
                  const color = entry.color === '#0AB39C' ? 'text-green-500' : 'text-red-500';
                  return <span className={cn("text-sm", color)}>{value}</span>;
                }}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#0AB39C" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#0AB39C' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#0AB39C' }}/>
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#F06548" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#F06548' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#F06548' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex space-x-1 border-b border-border">
          {(['Leads came', 'Leads Converted', 'Total deals size'] as ActiveTab[]).map((tab) => (
            <Button 
              key={tab} 
              variant="ghost" 
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-2 rounded-none text-muted-foreground hover:text-primary-text',
                activeTab === tab && 'text-primary border-b-2 border-primary'
              )}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
