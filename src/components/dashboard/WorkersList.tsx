
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface Worker {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
  status: "available" | "training" | "off-duty";
  completedTrainings: number;
  pendingTrainings: number;
  trainingProgress?: {
    currentModule?: string;
    progressPercentage?: number;
    expectedCompletionDate?: string;
    lastActivity?: string;
  };
}

interface WorkersListProps {
  workers: Worker[];
  title?: string;
}

export function WorkersList({ workers, title = "Visão Geral dos Trabalhadores" }: WorkersListProps) {
  const getStatusText = (status: Worker['status']) => {
    switch(status) {
      case "available": return "Disponível";
      case "training": return "Em Treinamento";
      case "off-duty": return "Fora de Serviço";
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/workers">Ver Todos</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workers.map((worker) => (
            <div key={worker.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={worker.avatar} />
                  <AvatarFallback>{worker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{worker.name}</div>
                  <div className="text-sm text-muted-foreground">{worker.position}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    worker.status === "available"
                      ? "secondary"
                      : worker.status === "training"
                      ? "default"
                      : "outline"
                  }
                >
                  {getStatusText(worker.status)}
                </Badge>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/workers/${worker.id}`}>
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
