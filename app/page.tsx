"use client";
import LoginForm from "./landing/loginform";
import Image from "next/image";

export default function Landing() {
    return (
        <div className="landing-page">
            <div className="banner-container">
                <Image
                    src="/RMS_banner.png"
                    alt="Remote Monitoring System"
                    width={500}
                    height={200}
                    className="login-image"
                    priority
            />
            </div>
            <div className="login-form-container">
                <LoginForm />
            </div>
        </div>
    );
}