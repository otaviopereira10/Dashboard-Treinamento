import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  UserPlus, 
  EyeIcon, 
  FileEdit, 
  Trash2,
  Download
} from "lucide-react";
import { mockWorkers } from "@/data/mockData";
import { useState } from "react";
import { WorkerForm } from "@/components/dashboard/WorkerForm";
import { Worker } from "@/components/dashboard/WorkersList";
import { useToast } from "@/hooks/use-toast";
import { exportToFile } from "@/utils/exportUtils";

const WorkersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [showAddWorkerForm, setShowAddWorkerForm] = useState(false);
  const { toast } = useToast();
  
  const filteredWorkers = workers.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWorker = (workerData: Omit<Worker, "id">) => {
    const newWorker = {
      ...workerData,
      id: `w${workers.length + 1}`,
    };
    
    setWorkers([...workers, newWorker]);
  };

  const handleDeleteWorker = (workerId: string) => {
    setWorkers(workers.filter(worker => worker.id !== workerId));
    toast({
      title: "Trabalhador removido",
      description: "O trabalhador foi removido com sucesso.",
    });
  };

  const handleExportWorkers = () => {
    try {
      exportToFile({
        filename: "trabalhadores",
        format: "xlsx",
        data: workers
      });
      toast({
        title: "Relatório exportado",
        description: "O relatório de trabalhadores foi exportado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Ocorreu um erro ao exportar o relatório.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Trabalhadores</h1>
          <div className="flex gap-2">
            <Button className="flex items-center gap-2" onClick={() => setShowAddWorkerForm(true)}>
              <UserPlus className="h-4 w-4" />
              <span>Adicionar Trabalhador</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportWorkers}>
              <Download className="h-4 w-4" />
              <span>Exportar Lista</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>Gerenciar Trabalhadores</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar trabalhadores..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Treinamentos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={worker.avatar} />
                          <AvatarFallback>{worker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>{worker.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{worker.position}</TableCell>
                    <TableCell>{worker.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          worker.status === "available"
                            ? "secondary"
                            : worker.status === "training"
                            ? "default"
                            : "outline"
                        }
                      >
                        {worker.status === "available" ? "Disponível" : 
                         worker.status === "training" ? "Em Treinamento" : "Fora de Serviço"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          Concluídos: <span className="font-medium">{worker.completedTrainings}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Pendentes: <span className="font-medium">{worker.pendingTrainings}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteWorker(worker.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <WorkerForm 
        open={showAddWorkerForm} 
        onOpenChange={setShowAddWorkerForm} 
        onSubmit={handleAddWorker} 
      />
    </DashboardLayout>
  );
};

export default WorkersPage;
