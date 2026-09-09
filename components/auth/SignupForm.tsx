"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useAuthActions";
const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "first Name must be at least 2 character")
      .max(50, "first Name must be under 50 character"),
    lastName: z
      .string()
      .trim()
      .min(2, "last Name must be at least 2 character")
      .max(50, "last Name must be under 50 character"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const { signup } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData: signupFormData) => {
    const { data, error } = await signup(formData);
    if (!data) alert(error?.message);
    router.push("/");
    router.refresh();
  };
  return (
    <form
      className="flex flex-col gap-4 text-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-x-10 ring ring-slate-500 p-4">
        <label>First Name</label>
        <input className="ring ring-slate-500" {...register("firstName")} />
        {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
      </div>
      <div className="space-x-10 ring ring-slate-500 p-4">
        <label>Last Name</label>
        <input className="ring ring-slate-500" {...register("lastName")} />
        {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
      </div>
      <div className="space-x-10 ring ring-slate-500 p-4">
        <label>Email</label>
        <input className="ring ring-slate-500" {...register("email")} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      <div className="space-x-10 ring ring-slate-500 p-4">
        <label>Password</label>
        <input className="ring ring-slate-500" {...register("password")} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>
      <div className="space-x-10 ring ring-slate-500 p-4">
        <label>Confirm Password</label>
        <input
          className="ring ring-slate-500"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button className="cursor-pointer" type="submit">
        Sign up
      </button>
    </form>
  );
};
