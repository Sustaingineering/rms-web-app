//React
import { useState } from "react";

//Design
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye, CircleCheck, CircleX, Eraser, } from "lucide-react";

//Navigation
import { useNavigation } from "@/hooks/useNavigation";


const LoginForm: React.FC = () => {
    //Routing
    const {navigate} = useNavigation();

    //Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Error
    const [hasError, setHasError] = useState(false);

    //Handlers
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setHasError(false);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setHasError(false);
    }

    //Password
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    //Email
    const clearEmail = () => {
        setEmail("");
    }

    //Routing
    const routeSignup = () => {
        navigate("/signup")
        return;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(email, password)
        
        if (
            email == "" || 
            password == ""
        ) {
            setHasError(true);
            return;
        }
    }

    return (
        <Card className = "mx-auto max-w-sm font-sans border-0">
            <CardHeader className = "space-y-1">
                <CardTitle className = "text-2xl font-bold flex justify-center">
                    Login
                </CardTitle>
            </CardHeader>
            
            <CardContent>
                <div className = "space-y-4">
                    <div className = "space-y-2">
                        <Label htmlFor="email" className="font-semibold">
                            Email
                        </Label>
                        <div className = "flex">
                            <Input 
                                className="border-0"
                                id = "email" 
                                type="email" 
                                placeholder="@example.com"
                                value = {email}
                                onChange={handleEmailChange}
                                required>
                            </Input>
                            <Button variant = "ghost" size = "icon" onClick={clearEmail}>
                                <Eraser></Eraser>
                            </Button>
                        </div>
                    </div>

                    <div className = "space-y-2">
                        <Label htmlFor="password" className="font-semibold">
                            Password
                        </Label>
                        <div className = "flex">
                            <Input 
                                className="border-0" 
                                id="password" 
                                placeholder="Input Password"
                                type = {showPassword ? "text" : "password"}
                                value = {password}
                                onChange={handlePasswordChange}
                                required>
                            </Input>
                            <Button variant = "ghost" size = "icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                            </Button>
                        </div>
                        
                    </div>

                    <div className = "text-sm flex animate-pulse">
                        {hasError && <CircleX color = "red" className = "size-5"></CircleX>}
                        {hasError && <p className = "text-red-600 ml-1">All fields are required</p>}
                    </div>

                    <Button 
                        type = "submit" 
                        variant = "ghost" 
                        className = "w-full text-white font-bold bg-blue-600"
                        onClick={handleSubmit}
                    >
                        Log in
                    </Button>

                    <CardFooter className = "flex justify-center text-sm">
                        <Button onClick = {routeSignup} variant = "link">Don't have an account? Sign up here</Button>
                    </CardFooter>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm