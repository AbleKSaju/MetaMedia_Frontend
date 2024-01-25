import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const schema: ZodType<LoginFormData> = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password:z.string().min(4,{message:"Password have at least 8 character"})
});

export const useValidate = () => {
  const {register,handleSubmit,formState:{errors}} = useForm<LoginFormData>({resolver:zodResolver(schema)})
  return {
    register,
    handleSubmit,
    errors
  }
}
