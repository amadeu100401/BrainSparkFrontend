import { ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
    subtitle: string;
}

export default function Logo({ subtitle }: LogoProps) {
    return (
        <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">BrainSpark</span>
            </Link>
            <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>
    )
}