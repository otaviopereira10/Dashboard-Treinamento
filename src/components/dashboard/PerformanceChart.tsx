
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

export interface PerformanceData {
  name: string;
  accuracy: number;
  completionTime: number;
  safetyScore: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title?: string;
}

export function PerformanceChart({ data, title = "Métricas de Desempenho" }: PerformanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={{ strokeWidth: 1 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ strokeWidth: 1 }}
                domain={[0, 100]}
                tickCount={6}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  fontSize: "12px"
                }}
                formatter={(value, name) => {
                  const label = {
                    accuracy: "Precisão",
                    completionTime: "Tempo de Conclusão",
                    safetyScore: "Índice de Segurança"
                  }[name] || name;
                  return [`${value}%`, label];
                }}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend 
                verticalAlign="bottom"
                height={36}
                formatter={(value) => {
                  return {
                    accuracy: "Precisão",
                    completionTime: "Tempo de Conclusão",
                    safetyScore: "Índice de Segurança"
                  }[value] || value;
                }}
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                name="accuracy" 
                stroke="#4CAF50" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="completionTime" 
                name="completionTime" 
                stroke="#2196F3" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="safetyScore" 
                name="safetyScore" 
                stroke="#FF5722" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
