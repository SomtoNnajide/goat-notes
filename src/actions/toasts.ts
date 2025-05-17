'use client'

import { toast } from "sonner" 

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