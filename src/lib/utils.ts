import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner" 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  if(error instanceof Error){
    return { errorMessage: error.message }
  } else {
    return { errorMessage: "An error occured" }
  }
}

export const successToast = (title: string, description: string) => {
    toast.success(title, {
        style: {
            background: "var(--color-success-bg)",
            color: "var(--color-success-text)",
        },
        description: description
    })
}

export const errorToast = (title: string, description: string) => {
    toast.error(title, {
        style: {
            background: "var(--color-error-bg)",
            color: "var(--color-error-text)"
        },
        description: description
    })
}