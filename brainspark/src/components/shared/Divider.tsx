interface DividerProps {
    orInDivide?: boolean
}

export default function Divider({orInDivide = false}:DividerProps) {
    return (
        <>
            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    {orInDivide && (
                        <span className="px-2 bg-white text-gray-500">ou</span>
                    )}
                </div>
            </div>
        </>
    );
}