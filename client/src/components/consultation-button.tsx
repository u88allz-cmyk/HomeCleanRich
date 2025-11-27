import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Phone, FileEdit } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConsultationButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
}

const serviceOptions = [
  { id: "입주청소", label: "입주청소" },
  { id: "거주청소", label: "거주청소" },
  { id: "상가청소", label: "상가청소" },
  { id: "특수청소", label: "특수청소" },
];

export function ConsultationButton({ 
  className = "", 
  variant = "default", 
  size = "default",
  fullWidth = false 
}: ConsultationButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      services: [],
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "상담 신청 완료",
        description: "빠른 시일 내에 연락드리겠습니다.",
      });
      form.reset();
      setDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "오류 발생",
        description: error.message || "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    submitMutation.mutate(data);
  };

  const handlePhoneCall = () => {
    window.location.href = "tel:070-1361-1659";
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={variant} 
            size={size} 
            className={`${fullWidth ? "w-full" : ""} ${className}`}
            data-testid="button-consultation-dropdown"
          >
            상담 신청
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem 
            onClick={handlePhoneCall}
            className="cursor-pointer gap-2"
            data-testid="menu-item-phone"
          >
            <Phone className="w-4 h-4" />
            전화연결
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setDialogOpen(true)}
            className="cursor-pointer gap-2"
            data-testid="menu-item-inquiry"
          >
            <FileEdit className="w-4 h-4" />
            문의작성
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              <span className="text-primary">홈클린리치</span> 상담 신청
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      이름 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="이름을 입력해주세요" 
                        {...field} 
                        data-testid="input-dialog-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      연락처 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="010-0000-0000" 
                        {...field} 
                        data-testid="input-dialog-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      시공 선택 <span className="text-destructive">*</span>
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {serviceOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValue, option.id]);
                                    } else {
                                      field.onChange(
                                        currentValue.filter((value: string) => value !== option.id)
                                      );
                                    }
                                  }}
                                  data-testid={`checkbox-dialog-${option.id}`}
                                />
                              </FormControl>
                              <Label className="text-sm font-normal cursor-pointer">
                                {option.label}
                              </Label>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      내용 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="문의 내용을 입력해주세요" 
                        className="min-h-[120px] resize-none"
                        {...field} 
                        data-testid="textarea-dialog-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={submitMutation.isPending}
                data-testid="button-dialog-submit"
              >
                {submitMutation.isPending ? "전송 중..." : "상담 신청하기"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
