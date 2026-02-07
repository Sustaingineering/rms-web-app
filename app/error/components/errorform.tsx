import { useNavigation } from "@/hooks/useNavigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

//Shadcn
import { Card, 
        CardHeader, 
        CardTitle, 
        CardDescription, 
        CardContent, 
        } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ErrorForm: React.FC = () => {
    // Navigation initialization
    const {navigate} = useNavigation();

    useEffect(() => {
        toast.dismiss();
    }, []);

    const goToLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <Card className = "mx-auto max-w-sm bg-amber-50">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Error
                </CardTitle>
                <CardDescription className = "flex justify-center text-center">We apologize for the inconvenience</CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className = "space-y-4">

                    <Button type = "submit" onClick = {goToLogin} variant = "ghost" className = "w-full text-white bg-red-400">
                        Back to Login
                    </Button>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default ErrorForm;

