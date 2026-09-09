"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useLogout } from "@/hooks/useAuthActions";
import type { BaseUIEvent } from "@base-ui/react/types";
import { useRouter } from "next/navigation";

export const LogoutBtn = ({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const router = useRouter();
  const { logout } = useLogout();
  const handleClick = async (
    e: BaseUIEvent<React.MouseEvent<HTMLButtonElement>>,
  ) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      const { data, error } = await logout();
      if (!data?.success) return alert(error?.message);
      router.push("/");
      router.refresh();
    }
  };
  return <Button onClick={handleClick} {...props} />;
};
