import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type ForgotPasswordFormData = {
  email: string;
};

export const schema: ZodType<ForgotPasswordFormData> = z.object({
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
});

export const useForgotPasswordValidaion = () => {
  console.log("HANDLE");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(schema) });
console.log("YOOO");

  return {
    register,
    handleSubmit,
    errors,
  };
};
