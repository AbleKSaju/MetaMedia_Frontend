import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type AddProfileFormData = {
  username: string;
  mobile: string;
  dob: string;
  bio: string;
  location: string;
  gender?: string;
  profile?: string;
};

// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   " image/png",
//   "image/webp",
// ];

export const schema: ZodType<AddProfileFormData> = z.object({
  username: z
    .string()
    .min(2, {
      message: "must contain at least 2 characters",
    })
    .max(30, { message: " name cannot exceed 30 characters" })
    .regex(/^[A-Za-z][A-Za-z\s]*$/, {
      message: "name must contain only alphabetic characters",
    }),
  mobile: z.string().refine((value) => value.length === 10, {
    message: "number must have exactly 10 numbers",
  }),
  bio: z.string()  .min(1, {
    message: "bio is empty",
  }).max(50, { message: " name cannot exceed 30 characters" }),
  dob: z.string().refine((value) => !!value, {
    message: "Date of birth is required",
  }),
  location: z.string().min(2, {
    message: "location not match",
  }),
  gender: z.string().refine((value) => ["male", "female"].includes(value), {
    message: "Please select a valid gender",
  }),
  // gender: z.enum(["male", "female"]),
//   profile: z
//     .any()
//     .refine((file) => {
//       console.log(file, "fileeeeeeeeeeee");
//       if (file.length === 0) {
//         console.log("if log");
//         return true;
//       }
//       console.log("if out log");

//       return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
//     }, `Only .jpg, .jpeg, .png and .webp formats are supported.`)
//     .optional()
//     .nullable(),
});

export const useAddProfleValidate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProfileFormData>({ resolver: zodResolver(schema) });
  console.log("ooyaaa");
  
  return {
    register,
    handleSubmit,
    errors,
  };
};
