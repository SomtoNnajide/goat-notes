'use client'

import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useRef, useState, useTransition } from "react"

type Props = {
    user: User | null
}

function AskAIButton({ user }: Props) {
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [questionText, setQuestionText] = useState("")
    const [questions, setQuestions] = useState<string[]>([])
    const [responses, setResponses] = useState<string[]>([])

    const handleOnOpenChange = (isOpen: boolean) => {
        if(!user){
            router.push('/login')
        } else {
            if(isOpen){
                setQuestionText("")
                setQuestions([])
                setResponses([])
            }
            setOpen(isOpen)
        }
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const handleInput = () => {
        const textarea = textareaRef.current

        if(!textarea) return
        
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    const handleClickInput = () => {
        textareaRef.current?.focus()
    }

    const handleSubmit = () => {
        console.log('submit')
    }

    const scrollToBottom = () => {
        contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogTrigger asChild>
                <Button variant="secondary">Ask AI</Button>
            </DialogTrigger>
            <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto" ref={contentRef}>
                <DialogHeader>
                    <DialogTitle>Ask AI About Your Notes</DialogTitle>
                    <DialogDescription>
                        Our AI assistant can answer questions about all of your notes
                    </DialogDescription>
                </DialogHeader>
                
                <div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AskAIButton