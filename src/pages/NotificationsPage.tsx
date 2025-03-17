
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  BellRing,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Trash2,
  Bell,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "warning":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "error":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const NotificationsPage = () => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo treinamento alocado",
      message: "Um novo treinamento de 'Segurança em Operações Portuárias' foi agendado para você.",
      date: "Hoje, 14:30",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Treinamento completado",
      message: "João Silva completou o treinamento de 'Manuseio de Cargas Perigosas'.",
      date: "Hoje, 10:15",
      read: true,
      type: "success",
    },
    {
      id: "3",
      title: "Lembrete de treinamento",
      message: "Seu treinamento de 'Primeiros Socorros' está agendado para amanhã às 09:00.",
      date: "Ontem, 16:45",
      read: false,
      type: "warning",
    },
    {
      id: "4",
      title: "Problema detectado",
      message: "Um problema foi detectado com o equipamento VR #405. Verifique antes de usar.",
      date: "15/10/2023, 08:23",
      read: true,
      type: "error",
    },
    {
      id: "5",
      title: "Atualização do sistema",
      message: "Uma nova atualização do sistema está disponível. Será instalada automaticamente esta noite.",
      date: "12/10/2023, 11:30",
      read: true,
      type: "info",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi marcada como lida.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast({
      title: "Notificações marcadas como lidas",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };

  const handleDeleteNotification = (id: string) => {
    setSelectedNotification(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (selectedNotification) {
      setNotifications(
        notifications.filter((notification) => notification.id !== selectedNotification)
      );
      toast({
        title: "Notificação removida",
        description: "A notificação foi removida com sucesso.",
      });
    }
    setShowConfirmDialog(false);
    setSelectedNotification(null);
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram removidas.",
    });
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setSelectedNotification(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Notificações</h1>
            <p className="text-muted-foreground mt-1">
              Mantenha-se informado sobre as atualizações e atividades do sistema
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filtrar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Todas</DropdownMenuItem>
                <DropdownMenuItem>Não lidas</DropdownMenuItem>
                <DropdownMenuItem>Lidas</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Informações</DropdownMenuItem>
                <DropdownMenuItem>Sucessos</DropdownMenuItem>
                <DropdownMenuItem>Alertas</DropdownMenuItem>
                <DropdownMenuItem>Erros</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" onClick={markAllAsRead} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Marcar todas como lidas</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Limpar todas</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Limpar todas as notificações?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Todas as notificações serão removidas permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAllNotifications}>Limpar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Todas</span>
              <Badge variant="secondary" className="ml-1">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" />
              <span>Não lidas</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Todas as notificações</CardTitle>
                <CardDescription>
                  Visualize todas as notificações recebidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium">Sem notificações</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Você não tem nenhuma notificação no momento.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          toast({
                            title: "Atualizado",
                            description: "Nenhuma nova notificação encontrada.",
                          });
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Atualizar
                      </Button>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start p-4 rounded-lg border ${
                          !notification.read ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="mr-4 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium">
                              {notification.title}
                              {!notification.read && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                >
                                  Nova
                                </Badge>
                              )}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 px-2 text-xs"
                              >
                                Marcar como lida
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="h-8 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread">
            <Card>
              <CardHeader>
                <CardTitle>Notificações não lidas</CardTitle>
                <CardDescription>
                  Visualize notificações que precisam da sua atenção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.filter((n) => !n.read).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CheckCircle2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium">Nenhuma notificação não lida</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Você está em dia com todas as suas notificações.
                      </p>
                    </div>
                  ) : (
                    notifications
                      .filter((n) => !n.read)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start p-4 rounded-lg border bg-muted/50"
                        >
                          <div className="mr-4 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                                <Badge
                                  variant="secondary"
                                  className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                >
                                  Nova
                                </Badge>
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {notification.date}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 px-2 text-xs"
                              >
                                Marcar como lida
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="h-8 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir notificação?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A notificação será removida permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default NotificationsPage;
