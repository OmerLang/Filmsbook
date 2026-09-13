"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useState } from "react";

type AddReviewBtnProps = React.ComponentProps<typeof Button> & {
  tmdbId: string;
};

export const AddReviewBtn = ({
  tmdbId,
  className,
  ...props
}: AddReviewBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isOpenStyles = "";
  const isClosedStyles =
    "cursor-pointer text-(--text-color-buttons) hover:bg-gray-500 transition";
  return (
    <div
      className={`ring ring-gray-500 rounded-sm ${!isOpen ? isClosedStyles : isOpenStyles}`}
    >
      {!isOpen && (
        <Button
          size="sm"
          variant="ghost"
          disableHover={true}
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          Add Review
        </Button>
      )}
    </div>
  );
};
