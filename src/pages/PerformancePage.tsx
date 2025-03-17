
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  PieChart, 
  Pie, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPerformanceData } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

// Dados para o gráfico de pizza
const trainingCompletionData = [
  { name: "Concluído", value: 68, color: "#4dc4ff" },
  { name: "Em Andamento", value: 22, color: "#0099e6" },
  { name: "Não Iniciado", value: 10, color: "#00334d" },
];

// Dados para a distribuição de habilidades
const skillDistributionData = [
  { name: "Operação de Guindaste", score: 85 },
  { name: "Procedimentos de Segurança", score: 78 },
  { name: "Manuseio de Equipamentos", score: 92 },
  { name: "Reconhecimento de Riscos", score: 65 },
  { name: "Resposta a Emergências", score: 72 },
  { name: "Gestão de Contêineres", score: 88 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

const PerformancePage = () => {
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Análise de Desempenho</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Selecionar Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Departamentos</SelectItem>
                <SelectItem value="cargo">Manuseio de Carga</SelectItem>
                <SelectItem value="dock">Operações de Doca</SelectItem>
                <SelectItem value="yard">Gestão de Pátio</SelectItem>
                <SelectItem value="safety">Segurança e Conformidade</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="month">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última Semana</SelectItem>
                <SelectItem value="month">Último Mês</SelectItem>
                <SelectItem value="quarter">Último Trimestre</SelectItem>
                <SelectItem value="year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="comparison">Comparativo</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendência de Desempenho</CardTitle>
                  <CardDescription>
                    Evolução dos principais indicadores ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockPerformanceData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: isMobile ? 0 : 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="accuracy" name="Precisão" fill="#1AB2FF" />
                        <Bar dataKey="completionTime" name="Tempo de Conclusão" fill="#0077B3" />
                        <Bar dataKey="safetyScore" name="Índice de Segurança" fill="#00334D" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status dos Treinamentos</CardTitle>
                  <CardDescription>
                    Distribuição geral do status dos treinamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trainingCompletionData}
                          cx="50%"
                          cy="50%"
                          labelLine={!isMobile}
                          outerRadius={isMobile ? 80 : 100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {trainingCompletionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Habilidades</CardTitle>
                <CardDescription>
                  Análise das diferentes habilidades e competências
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillDistributionData}
                      layout={isMobile ? "horizontal" : "vertical"}
                      margin={{
                        top: 20,
                        right: 30,
                        left: isMobile ? 20 : 150,
                        bottom: isMobile ? 60 : 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      {isMobile ? (
                        <>
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                          <YAxis type="number" domain={[0, 100]} />
                        </>
                      ) : (
                        <>
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" width={140} />
                        </>
                      )}
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Pontuação" barSize={30}>
                        {skillDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparativo entre Departamentos</CardTitle>
                <CardDescription>
                  Análise comparativa do desempenho entre os diferentes departamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">
                  Selecione os departamentos para visualizar o comparativo
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PerformancePage;
