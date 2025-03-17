
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface ActiveTraining {
  id: string;
  worker: {
    name: string;
    department: string;
    avatar?: string;
  };
  trainingModule: string;
  progress: number;
  startTime: string;
  duration: string;
  status: "in-progress" | "paused" | "completed" | "failed";
}

interface ActiveTrainingsTableProps {
  trainings: ActiveTraining[];
}

export function ActiveTrainingsTable({ trainings }: ActiveTrainingsTableProps) {
  // Função para traduzir o status
  const getStatusText = (status: ActiveTraining['status']) => {
    switch(status) {
      case "in-progress": return "em andamento";
      case "paused": return "pausado";
      case "completed": return "concluído";
      case "failed": return "falhou";
      default: return status;
    }
  };

  // Função para traduzir os departamentos
  const translateDepartment = (department: string) => {
    const translations: Record<string, string> = {
      "Cargo Handling": "Manuseio de Carga",
      "Ship Loading": "Carregamento de Navios",
      "Dock Operations": "Operações de Doca",
      "Yard Management": "Gestão de Pátio",
    };
    
    return translations[department] || department;
  };

  // Função para traduzir os módulos
  const translateModule = (module: string) => {
    const translations: Record<string, string> = {
      "Crane Operation Safety": "Segurança na Operação de Guindastes",
      "Container Inspection": "Inspeção de Contêineres",
      "Emergency Procedures": "Procedimentos de Emergência",
      "Equipment Handling": "Manuseio de Equipamentos",
      "Hazardous Materials": "Materiais Perigosos",
    };
    
    return translations[module] || module;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessões de Treinamento Ativas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trabalhador</TableHead>
              <TableHead>Módulo</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Hora de Início</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{training.worker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {training.worker.name}
                    </div>
                    <Badge variant="outline">{translateDepartment(training.worker.department)}</Badge>
                  </div>
                </TableCell>
                <TableCell>{translateModule(training.trainingModule)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={training.progress} className="h-2 w-[60px]" />
                    <span className="text-xs text-muted-foreground">{training.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{training.startTime}</TableCell>
                <TableCell>{training.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      training.status === "in-progress"
                        ? "default"
                        : training.status === "paused"
                        ? "outline"
                        : training.status === "completed"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {getStatusText(training.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
