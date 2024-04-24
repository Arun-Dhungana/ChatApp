import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps<T extends React.ElementType> {
  as?: T;
}
export default function Button<T extends React.ElementType = "button">({
  as,
  ...prop
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as || "button";
  return (
    <Component
      {...prop}
      className={
        (twMerge(
          "bg-blue-500 rounded text-white p-[0.875rem] active:bg-blue-600 disabled:bg-gray-200 flex items-center justify-center gap-2 ",
        ),
        prop.className)
      }
    ></Component>
  );
}
