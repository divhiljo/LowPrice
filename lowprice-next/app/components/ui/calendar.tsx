"use client";

import * as React from "react";

import { cn } from "./utils";

function Calendar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-3", className)} {...props} />
  );
}

export { Calendar };
