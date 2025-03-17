
import { useState, ChangeEvent, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Check, 
  Save, 
  User, 
  BellRing, 
  Lock, 
  Mail, 
  LucideIcon, 
  Globe, 
  Shield, 
  Bell,
  Laptop,
  Moon,
  Sun,
  Camera
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/contexts/UserContext";

// Definindo os tipos para as configurações
interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

// Componente para seções de configurações
const SettingsSection = ({ icon: Icon, title, description, children }: SettingsSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
    <div className="pt-2">{children}</div>
    <Separator className="my-6" />
  </div>
);

// Esquema de validação para o formulário de perfil
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, digite um email válido.",
  }),
  bio: z.string().max(160).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const SettingsPage = () => {
  const { toast } = useToast();
  const { userProfile, updateProfile, darkMode, toggleDarkMode } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para configurações de notificação
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: "new-training",
      title: "Novo treinamento",
      description: "Receba notificações quando novos treinamentos forem agendados",
      enabled: true,
    },
    {
      id: "training-completed",
      title: "Treinamento concluído",
      description: "Receba notificações quando um trabalhador concluir um treinamento",
      enabled: true,
    },
    {
      id: "system-updates",
      title: "Atualizações do sistema",
      description: "Receba notificações sobre atualizações e manutenções do sistema",
      enabled: false,
    },
    {
      id: "safety-alerts",
      title: "Alertas de segurança",
      description: "Receba alertas sobre questões de segurança no ambiente de trabalho",
      enabled: true,
    },
  ]);

  // Estado para configurações de segurança
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    rememberSessions: true,
    notifyOnLogin: true,
  });

  // Estado para configurações do sistema
  const [systemSettings, setSystemSettings] = useState({
    highContrast: false,
    reducedMotion: false
  });

  // Dados do formulário de perfil
  const defaultValues: ProfileFormValues = {
    name: userProfile.name,
    email: userProfile.email,
    bio: userProfile.bio || "",
  };

  // Formulário de perfil
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Função para alternar configurações de notificação
  const toggleNotification = (id: string) => {
    setNotificationSettings(
      notificationSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    
    toast({
      title: "Configuração de notificação atualizada",
      description: "Suas preferências de notificação foram atualizadas.",
    });
  };

  // Função para alternar configurações de segurança
  const toggleSecuritySetting = (key: keyof typeof securitySettings) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: !securitySettings[key],
    });
    
    toast({
      title: "Configuração de segurança atualizada",
      description: "Suas configurações de segurança foram atualizadas.",
    });
  };

  // Função para alternar configurações do sistema
  const toggleSystemSetting = (key: keyof typeof systemSettings) => {
    setSystemSettings({
      ...systemSettings,
      [key]: !systemSettings[key],
    });
    
    toast({
      title: "Configuração do sistema atualizada",
      description: "Suas configurações do sistema foram atualizadas.",
    });
  };

  // Função para lidar com o envio do formulário de perfil
  const onSubmitProfile = (data: ProfileFormValues) => {
    updateProfile({
      name: data.name,
      email: data.email,
      bio: data.bio || "",
    });
  };

  // Função para escolher uma imagem do avatar
  const handleChangeAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Função para carregar a imagem do avatar selecionada
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProfile({ avatar: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para salvar todas as configurações
  const saveAllSettings = () => {
    form.handleSubmit(onSubmitProfile)();
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas preferências e configurações de conta
            </p>
          </div>
          <Button onClick={saveAllSettings} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar alterações
          </Button>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Conta
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Laptop className="h-4 w-4" />
              Sistema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e detalhes de contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute -bottom-2 -right-2 rounded-full"
                        onClick={handleChangeAvatar}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={handleChangeAvatar}>
                      Alterar imagem
                    </Button>
                  </div>

                  <div className="flex-1">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmitProfile)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Breve descrição sobre você e sua função.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="mt-4">
                          Atualizar perfil
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferências do Sistema</CardTitle>
                <CardDescription>
                  Personalize sua experiência no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsSection
                  icon={Globe}
                  title="Idioma e Região"
                  description="Configure sua preferência de idioma e fuso horário"
                >
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="language">Idioma</Label>
                      <div className="w-[180px]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              Português (Brasil)
                              <Check className="h-4 w-4 ml-2" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[180px] p-0">
                            <div className="p-2">
                              <div className="flex items-center gap-2 rounded-md p-1 cursor-pointer bg-accent">
                                <Check className="h-4 w-4" />
                                <span>Português (Brasil)</span>
                              </div>
                              <div className="flex items-center gap-2 rounded-md p-1 cursor-pointer hover:bg-accent">
                                <span className="w-4"></span>
                                <span>English (US)</span>
                              </div>
                              <div className="flex items-center gap-2 rounded-md p-1 cursor-pointer hover:bg-accent">
                                <span className="w-4"></span>
                                <span>Español</span>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <div className="w-[180px]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              America/Sao_Paulo
                              <Check className="h-4 w-4 ml-2" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <div className="p-2">
                              <div className="flex items-center gap-2 rounded-md p-1 cursor-pointer bg-accent">
                                <Check className="h-4 w-4" />
                                <span>America/Sao_Paulo</span>
                              </div>
                              <div className="flex items-center gap-2 rounded-md p-1 cursor-pointer hover:bg-accent">
                                <span className="w-4"></span>
                                <span>UTC</span>
                              </div>
                              <div className="flex items-center gap-2 rounded-md p-1 cursor-pointer hover:bg-accent">
                                <span className="w-4"></span>
                                <span>America/New_York</span>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  icon={Shield}
                  title="Privacidade"
                  description="Configure suas preferências de privacidade"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Compartilhar estatísticas de uso</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ajude-nos a melhorar compartilhando estatísticas anônimas de uso
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </SettingsSection>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como e quando você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsSection
                  icon={Bell}
                  title="Tipos de Notificação"
                  description="Escolha quais tipos de notificações você deseja receber"
                >
                  <div className="space-y-4">
                    {notificationSettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <Label htmlFor={setting.id}>{setting.title}</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {setting.description}
                          </p>
                        </div>
                        <Switch
                          id={setting.id}
                          checked={setting.enabled}
                          onCheckedChange={() => toggleNotification(setting.id)}
                        />
                      </div>
                    ))}
                  </div>
                </SettingsSection>

                <SettingsSection
                  icon={Mail}
                  title="Canais de Entrega"
                  description="Escolha como deseja receber suas notificações"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Receba notificações por email
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Notificações Push</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Receba notificações no navegador
                        </p>
                      </div>
                      <Switch id="push-notifications" defaultChecked={true} />
                    </div>
                  </div>
                </SettingsSection>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Configure as opções de segurança para sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsSection
                  icon={Lock}
                  title="Autenticação"
                  description="Configure as opções de autenticação para sua conta"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Autenticação de dois fatores</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={securitySettings.twoFactorEnabled}
                        onCheckedChange={() => toggleSecuritySetting("twoFactorEnabled")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="remember-sessions">Lembrar sessões</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Mantenha-se conectado em dispositivos confiáveis
                        </p>
                      </div>
                      <Switch
                        id="remember-sessions"
                        checked={securitySettings.rememberSessions}
                        onCheckedChange={() => toggleSecuritySetting("rememberSessions")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-login">Notificar novos logins</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Receba um email quando um novo dispositivo fizer login na sua conta
                        </p>
                      </div>
                      <Switch
                        id="notify-login"
                        checked={securitySettings.notifyOnLogin}
                        onCheckedChange={() => toggleSecuritySetting("notifyOnLogin")}
                      />
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  icon={Lock}
                  title="Senha"
                  description="Gerencie sua senha"
                >
                  <Button variant="outline">Alterar senha</Button>
                </SettingsSection>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Exibição</CardTitle>
                <CardDescription>
                  Personalize a aparência do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsSection
                  icon={Laptop}
                  title="Interface"
                  description="Ajuste como a interface do sistema é exibida"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Modo escuro</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ative o modo escuro para reduzir o cansaço visual
                        </p>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast">Alto contraste</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Aumente o contraste para melhorar a legibilidade
                        </p>
                      </div>
                      <Switch
                        id="high-contrast"
                        checked={systemSettings.highContrast}
                        onCheckedChange={() => toggleSystemSetting("highContrast")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduced-motion">Movimento reduzido</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reduza as animações da interface
                        </p>
                      </div>
                      <Switch
                        id="reduced-motion"
                        checked={systemSettings.reducedMotion}
                        onCheckedChange={() => toggleSystemSetting("reducedMotion")}
                      />
                    </div>
                  </div>
                </SettingsSection>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
