import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  Download, 
  FileDown, 
  Filter, 
  Search,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { exportToFile } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const trainingHistoryData = [
  {
    id: "h1",
    workerName: "Roberto Almeida",
    trainingModule: "Segurança na Operação de Guindastes",
    completionDate: "2023-07-15",
    duration: "1h 25m",
    score: 92,
    status: "completed",
  },
  {
    id: "h2",
    workerName: "Maria Oliveira",
    trainingModule: "Inspeção de Contêineres",
    completionDate: "2023-07-14",
    duration: "45m",
    score: 85,
    status: "completed",
  },
  {
    id: "h3",
    workerName: "Carlos Santos",
    trainingModule: "Procedimentos de Emergência",
    completionDate: "2023-07-12",
    duration: "2h 10m",
    score: 78,
    status: "completed",
  },
  {
    id: "h4",
    workerName: "Ana Costa",
    trainingModule: "Manuseio de Equipamentos",
    completionDate: "2023-07-10",
    duration: "1h 15m",
    score: 90,
    status: "completed",
  },
  {
    id: "h5",
    workerName: "Fernando Ribeiro",
    trainingModule: "Materiais Perigosos",
    completionDate: "2023-07-08",
    duration: "1h 45m",
    score: 82,
    status: "completed",
  },
  {
    id: "h6",
    workerName: "Roberto Almeida",
    trainingModule: "Protocolo de Carregamento de Navios",
    completionDate: "2023-07-05",
    duration: "1h 30m",
    score: 88,
    status: "completed",
  },
  {
    id: "h7",
    workerName: "Lucia Pereira",
    trainingModule: "Segurança no Cais",
    completionDate: "2023-07-03",
    duration: "50m",
    score: 95,
    status: "completed",
  },
  {
    id: "h8",
    workerName: "Paulo Mendes",
    trainingModule: "Manuseio Avançado de Carga",
    completionDate: "2023-07-01",
    duration: "2h 30m",
    score: 79,
    status: "completed",
  },
];

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  
  const filteredHistory = trainingHistoryData.filter(record => {
    const matchesSearch = record.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.trainingModule.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!date) return matchesSearch;
    
    const recordDate = new Date(record.completionDate);
    return matchesSearch && 
      recordDate.getDate() === date.getDate() && 
      recordDate.getMonth() === date.getMonth() && 
      recordDate.getFullYear() === date.getFullYear();
  });

  const handleExportReport = () => {
    try {
      exportToFile({
        filename: `relatorio-treinamentos${date ? '-' + format(date, 'dd-MM-yyyy') : ''}`,
        format: "xlsx",
        data: filteredHistory
      });
      toast({
        title: "Relatório exportado",
        description: "O relatório de treinamentos foi exportado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Ocorreu um erro ao exportar o relatório.",
        variant: "destructive",
      });
    }
  };

  const formatDateToPtBR = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Histórico de Treinamentos</h1>
          <Button className="flex items-center gap-2" onClick={handleExportReport}>
            <FileDown className="h-4 w-4" />
            <span>Exportar Relatório</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>Sessões de Treinamento Concluídas</CardTitle>
              <div className="flex flex-col md:flex-row items-stretch gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar histórico..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? (
                        <span>{format(date, "dd/MM/yyyy", { locale: ptBR })}</span>
                      ) : (
                        <span>Selecionar Data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={ptBR}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {date && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setDate(undefined)}
                    className="h-10 px-3"
                  >
                    Limpar
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trabalhador</TableHead>
                  <TableHead>Módulo de Treinamento</TableHead>
                  <TableHead>Data de Conclusão</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Pontuação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.workerName}</TableCell>
                    <TableCell>{record.trainingModule}</TableCell>
                    <TableCell>{formatDateToPtBR(record.completionDate)}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          record.score >= 90
                            ? "text-green-500 border-green-500"
                            : record.score >= 75
                            ? "text-amber-500 border-amber-500"
                            : "text-red-500 border-red-500"
                        }
                      >
                        {record.score}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Concluído</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Baixar Certificado</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ver Detalhes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
