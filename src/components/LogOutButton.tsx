"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";
import { errorToast, successToast } from "@/actions/toasts";

function LogOutButton() {
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const handleLogOut = async () => {
        setLoading(true)

        const { errorMessage } = await logOutAction()

        if (!errorMessage){
            successToast("Logged Out", "You have been successfully logged out")

            router.push("/")
        } else {
            errorToast("Error", errorMessage)
        }

        setLoading(false)
    };

    return (
        <Button
        className="w-24"
        variant="outline"
        onClick={handleLogOut}
        disabled={loading}
        >
        {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
        </Button>
    );
}

export default LogOutButton;
