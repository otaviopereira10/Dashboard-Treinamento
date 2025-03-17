
import { 
  Activity, 
  CheckCircle, 
  ClipboardCheck, 
  Clock 
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  mockActiveTrainings, 
  mockPerformanceData, 
  mockStats, 
  mockWorkers 
} from "@/data/mockData";
import { ActiveTrainingsTable } from "@/components/dashboard/ActiveTrainingsTable";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { WorkersList } from "@/components/dashboard/WorkersList";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Sessões de Treinamento Ativas"
            value={mockStats.activeTrainings}
            icon={Activity}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Concluídos Hoje"
            value={mockStats.completedToday}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Taxa Média de Conclusão"
            value={`${mockStats.avgCompletionRate}%`}
            icon={ClipboardCheck}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Total de Horas de Treinamento"
            value={mockStats.trainingHours}
            icon={Clock}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Performance Chart */}
        <PerformanceChart data={mockPerformanceData} />

        {/* Two Column Layout for Table and Workers List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveTrainingsTable trainings={mockActiveTrainings} />
          </div>
          <div>
            <WorkersList workers={mockWorkers} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
