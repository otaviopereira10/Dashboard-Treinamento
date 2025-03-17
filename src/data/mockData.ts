
import { ActiveTraining } from "@/components/dashboard/ActiveTrainingsTable";
import { PerformanceData } from "@/components/dashboard/PerformanceChart";
import { Worker } from "@/components/dashboard/WorkersList";

// Mock data for active trainings
export const mockActiveTrainings: ActiveTraining[] = [
  {
    id: "t1",
    worker: {
      name: "João Silva",
      department: "Cargo Handling",
    },
    trainingModule: "Crane Operation Safety",
    progress: 75,
    startTime: "09:30",
    duration: "45:20",
    status: "in-progress",
  },
  {
    id: "t2",
    worker: {
      name: "Maria Oliveira",
      department: "Ship Loading",
    },
    trainingModule: "Container Inspection",
    progress: 92,
    startTime: "10:15",
    duration: "32:10",
    status: "in-progress",
  },
  {
    id: "t3",
    worker: {
      name: "Carlos Santos",
      department: "Dock Operations",
    },
    trainingModule: "Emergency Procedures",
    progress: 100,
    startTime: "08:45",
    duration: "60:00",
    status: "completed",
  },
  {
    id: "t4",
    worker: {
      name: "Ana Costa",
      department: "Yard Management",
    },
    trainingModule: "Equipment Handling",
    progress: 45,
    startTime: "11:00",
    duration: "22:30",
    status: "paused",
  },
  {
    id: "t5",
    worker: {
      name: "Paulo Mendes",
      department: "Cargo Handling",
    },
    trainingModule: "Hazardous Materials",
    progress: 30,
    startTime: "09:15",
    duration: "15:45",
    status: "in-progress",
  },
];

// Mock data for performance chart
export const mockPerformanceData: PerformanceData[] = [
  {
    name: "Jan",
    accuracy: 82,
    completionTime: 68,
    safetyScore: 75,
  },
  {
    name: "Fev",
    accuracy: 85,
    completionTime: 70,
    safetyScore: 78,
  },
  {
    name: "Mar",
    accuracy: 83,
    completionTime: 74,
    safetyScore: 80,
  },
  {
    name: "Abr",
    accuracy: 86,
    completionTime: 78,
    safetyScore: 83,
  },
  {
    name: "Mai",
    accuracy: 89,
    completionTime: 82,
    safetyScore: 85,
  },
  {
    name: "Jun",
    accuracy: 91,
    completionTime: 85,
    safetyScore: 88,
  },
  {
    name: "Jul",
    accuracy: 92,
    completionTime: 87,
    safetyScore: 91,
  },
];

// Mock data for workers
export const mockWorkers: Worker[] = [
  {
    id: "w1",
    name: "Roberto Almeida",
    position: "Operador de Guindaste Sênior",
    department: "Manuseio de Cargas",
    status: "training",
    completedTrainings: 12,
    pendingTrainings: 3,
    avatar: "/placeholder.svg",
    trainingProgress: {
      currentModule: "Inspeção de Contêineres",
      progressPercentage: 65,
      expectedCompletionDate: "2023-12-15",
      lastActivity: "2023-11-23",
    }
  },
  {
    id: "w2",
    name: "Carla Ferreira",
    position: "Supervisora de Doca",
    department: "Operações de Doca",
    status: "available",
    completedTrainings: 18,
    pendingTrainings: 0,
    avatar: "/placeholder.svg",
    trainingProgress: {
      currentModule: "Gerenciamento Avançado de Equipe",
      progressPercentage: 90,
      expectedCompletionDate: "2023-12-05",
      lastActivity: "2023-11-26",
    }
  },
  {
    id: "w3",
    name: "Miguel Souza",
    position: "Inspetor de Segurança",
    department: "Segurança & Conformidade",
    status: "available",
    completedTrainings: 15,
    pendingTrainings: 2,
    avatar: "/placeholder.svg",
    trainingProgress: {
      currentModule: "Protocolos de Emergência Avançados",
      progressPercentage: 45,
      expectedCompletionDate: "2023-12-20",
      lastActivity: "2023-11-24",
    }
  },
  {
    id: "w4",
    name: "Lucia Pereira",
    position: "Operadora de Equipamentos",
    department: "Gestão de Pátio",
    status: "off-duty",
    completedTrainings: 9,
    pendingTrainings: 5,
    avatar: "/placeholder.svg"
  },
  {
    id: "w5",
    name: "Fernando Ribeiro",
    position: "Operador Júnior",
    department: "Manuseio de Cargas",
    status: "training",
    completedTrainings: 6,
    pendingTrainings: 8,
    avatar: "/placeholder.svg",
    trainingProgress: {
      currentModule: "Segurança na Operação de Guindastes",
      progressPercentage: 30,
      expectedCompletionDate: "2024-01-10",
      lastActivity: "2023-11-22",
    }
  },
];

// Stats data
export const mockStats = {
  activeTrainings: 12,
  completedToday: 24,
  avgCompletionRate: 87,
  trainingHours: 156,
};
