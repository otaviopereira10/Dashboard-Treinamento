
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { mockWorkers } from "@/data/mockData";
import { Worker } from "@/components/dashboard/WorkersList";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  BookOpen,
  History,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock training modules data
const trainingModules = [
  {
    id: "m1",
    name: "Segurança na Operação de Guindastes",
    description: "Procedimentos de segurança para operar guindastes no porto.",
    duration: "4 horas",
    completionStatus: "completed", // completed, in-progress, pending
    completedOn: "2023-10-15",
    progress: 100,
  },
  {
    id: "m2",
    name: "Inspeção de Contêineres",
    description: "Técnicas para inspeção eficiente de contêineres de carga.",
    duration: "3 horas",
    completionStatus: "in-progress", // completed, in-progress, pending
    completedOn: null,
    progress: 60,
  },
  {
    id: "m3",
    name: "Procedimentos de Emergência",
    description: "Protocolos para lidar com situações de emergência no porto.",
    duration: "5 horas",
    completionStatus: "pending", // completed, in-progress, pending
    completedOn: null,
    progress: 0,
  },
  {
    id: "m4",
    name: "Manuseio de Materiais Perigosos",
    description: "Técnicas seguras para lidar com materiais perigosos.",
    duration: "6 horas",
    completionStatus: "pending", // completed, in-progress, pending
    completedOn: null,
    progress: 0,
  },
];

// Mock activities data
const activityHistory = [
  {
    id: "a1",
    date: "2023-11-25",
    time: "14:30",
    description: "Concluiu o módulo 'Segurança na Operação de Guindastes'",
    type: "completion",
  },
  {
    id: "a2",
    date: "2023-11-23",
    time: "10:15",
    description: "Iniciou o módulo 'Inspeção de Contêineres'",
    type: "started",
  },
  {
    id: "a3",
    date: "2023-11-20",
    time: "09:45",
    description: "Atualizou informações de perfil",
    type: "update",
  },
  {
    id: "a4",
    date: "2023-11-15",
    time: "16:00",
    description: "Participou de treinamento presencial sobre segurança portuária",
    type: "other",
  },
];

const WorkerDetailsPage = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const foundWorker = mockWorkers.find(w => w.id === workerId);
      
      if (foundWorker) {
        // Add mock training progress data
        const workerWithProgress = {
          ...foundWorker,
          trainingProgress: {
            currentModule: "Inspeção de Contêineres",
            progressPercentage: 60,
            expectedCompletionDate: "2023-12-15",
            lastActivity: "2023-11-23",
          }
        };
        setWorker(workerWithProgress);
      }
      
      setIsLoading(false);
    }, 500);
  }, [workerId]);

  const getStatusText = (status: Worker['status'] | undefined) => {
    if (!status) return "";
    
    switch(status) {
      case "available": return "Disponível";
      case "training": return "Em Treinamento";
      case "off-duty": return "Fora de Serviço";
      default: return status;
    }
  };

  const getStatusBadgeVariant = (status: Worker['status'] | undefined) => {
    if (!status) return "outline";
    
    switch(status) {
      case "available": return "secondary";
      case "training": return "default";
      case "off-duty": return "outline";
      default: return "outline";
    }
  };

  const getModuleStatusBadge = (status: string) => {
    switch(status) {
      case "completed": 
        return <Badge variant="secondary" className="ml-2 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Concluído
        </Badge>;
      case "in-progress": 
        return <Badge variant="default" className="ml-2 flex items-center gap-1">
          <Clock className="h-3 w-3" /> Em Progresso
        </Badge>;
      case "pending": 
        return <Badge variant="outline" className="ml-2 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> Pendente
        </Badge>;
      default: 
        return null;
    }
  };

  const handleStartModule = (moduleId: string) => {
    toast({
      title: "Módulo iniciado",
      description: "O trabalhador foi designado para iniciar este módulo.",
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <div className="animate-pulse space-y-4 w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-48 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!worker) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-4" asChild>
              <Link to="/workers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Trabalhador não encontrado</h1>
          </div>
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <p className="text-muted-foreground">
                  O trabalhador com ID {workerId} não foi encontrado.
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/workers">Ver Todos os Trabalhadores</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const completedModules = trainingModules.filter(m => m.completionStatus === "completed").length;
  const totalModules = trainingModules.length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-4" asChild>
            <Link to="/workers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes do Trabalhador</h1>
        </div>

        {/* Worker Profile Card */}
        <Card>
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={worker.avatar} />
                <AvatarFallback className="text-xl">{worker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h2 className="text-2xl font-bold">{worker.name}</h2>
                  <Badge variant={getStatusBadgeVariant(worker.status)} className="w-fit">
                    {getStatusText(worker.status)}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{worker.position}</p>
                <p className="text-muted-foreground">Departamento: {worker.department}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Treinamentos Concluídos</p>
                      <p className="text-xl font-bold">{worker.completedTrainings}</p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Treinamentos Pendentes</p>
                      <p className="text-xl font-bold">{worker.pendingTrainings}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso Geral dos Treinamentos</CardTitle>
            <CardDescription>
              Visão geral do progresso em todos os módulos de treinamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progresso total</p>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {completedModules} de {totalModules} módulos concluídos
                </div>
              </div>
              <Progress value={overallProgress} className="h-2" />

              {worker.trainingProgress?.currentModule && (
                <div className="bg-muted p-4 rounded-md mt-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">Módulo Atual</p>
                      <p className="font-medium">{worker.trainingProgress.currentModule}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Progresso: {worker.trainingProgress.progressPercentage}%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Conclusão prevista: {worker.trainingProgress.expectedCompletionDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="modules">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4">
            <TabsTrigger value="modules" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" /> Módulos de Treinamento
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="mr-2 h-4 w-4" /> Histórico de Atividades
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center">
              <Award className="mr-2 h-4 w-4" /> Certificados
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules">
            <Card>
              <CardHeader>
                <CardTitle>Módulos de Treinamento</CardTitle>
                <CardDescription>
                  Detalhes de todos os módulos de treinamento e seu progresso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingModules.map((module) => (
                    <Card key={module.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {module.name}
                              {getModuleStatusBadge(module.completionStatus)}
                            </CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </div>
                          <div className="flex flex-col items-start md:items-end text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Duração: {module.duration}</span>
                            </div>
                            {module.completedOn && (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Concluído em: {module.completedOn}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-2">
                        {module.completionStatus !== "pending" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progresso</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </Button>
                        
                        {module.completionStatus === "pending" && (
                          <Button size="sm" onClick={() => handleStartModule(module.id)}>
                            Iniciar Módulo
                          </Button>
                        )}
                        
                        {module.completionStatus === "in-progress" && (
                          <Button size="sm">
                            Continuar
                          </Button>
                        )}
                        
                        {module.completionStatus === "completed" && (
                          <Button variant="secondary" size="sm" className="flex items-center">
                            <Award className="mr-2 h-4 w-4" />
                            Ver Certificado
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>
                  Registro cronológico de atividades e progresso no treinamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Tipo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityHistory.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>{activity.description}</TableCell>
                        <TableCell>
                          <Badge variant={
                            activity.type === "completion" ? "secondary" :
                            activity.type === "started" ? "default" :
                            activity.type === "update" ? "outline" : "outline"
                          }>
                            {activity.type === "completion" ? "Conclusão" :
                             activity.type === "started" ? "Iniciado" :
                             activity.type === "update" ? "Atualização" : "Outro"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Certificados</CardTitle>
                <CardDescription>
                  Certificados obtidos ao concluir treinamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <Card className="w-full md:w-[calc(50%-0.5rem)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Segurança na Operação de Guindastes</CardTitle>
                      <CardDescription>Concluído em 15/10/2023</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Certificado de conclusão do treinamento em operações seguras de guindastes no ambiente portuário.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Award className="mr-2 h-4 w-4" />
                        Baixar Certificado
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="w-full md:w-[calc(50%-0.5rem)] bg-muted/50 border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-muted-foreground">Certificados Futuros</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Os certificados serão adicionados aqui conforme o trabalhador conclui os módulos de treinamento.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WorkerDetailsPage;
