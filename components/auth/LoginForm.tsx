"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuthActions";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 character"),
});

export type loginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useLogin();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: loginFormData) => {
    const { data, error } = await login(formData);
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
        <label>Email</label>
        <input className="ring ring-slate-500" {...register("email")} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      <div className="space-x-10 ring ring-slate-500 p-4">
        <label>Password</label>
        <input className="ring ring-slate-500" {...register("password")} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>
      <button className="cursor-pointer" type="submit">
        Login
      </button>
    </form>
  );
};
