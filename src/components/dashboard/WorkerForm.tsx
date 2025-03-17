
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Worker } from "@/components/dashboard/WorkersList";

// Definindo o schema com os campos obrigatórios
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  position: z.string().min(2, {
    message: "Cargo é obrigatório.",
  }),
  department: z.string().min(2, {
    message: "Departamento é obrigatório.",
  }),
  status: z.enum(["available", "training", "off-duty"], {
    required_error: "Status é obrigatório.",
  }),
  completedTrainings: z.coerce.number().min(0),
  pendingTrainings: z.coerce.number().min(0),
});

type FormValues = z.infer<typeof formSchema>;

interface WorkerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Worker, "id">) => void;
}

export function WorkerForm({ open, onOpenChange, onSubmit }: WorkerFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // Garantindo valores padrão não nulos
    defaultValues: {
      name: "",
      position: "",
      department: "",
      status: "available",
      completedTrainings: 0,
      pendingTrainings: 0,
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Garantindo que todos os campos requeridos existam
    const workerData: Omit<Worker, "id"> = {
      name: values.name,
      position: values.position,
      department: values.department,
      status: values.status,
      completedTrainings: values.completedTrainings,
      pendingTrainings: values.pendingTrainings
    };
    
    onSubmit(workerData);
    form.reset();
    onOpenChange(false);
    toast({
      title: "Trabalhador adicionado",
      description: `${values.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Trabalhador</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do trabalhador" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Cargo do trabalhador" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <FormControl>
                    <Input placeholder="Departamento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="training">Em Treinamento</SelectItem>
                      <SelectItem value="off-duty">Fora de Serviço</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="completedTrainings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treinamentos Concluídos</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pendingTrainings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treinamentos Pendentes</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Adicionar Trabalhador</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
