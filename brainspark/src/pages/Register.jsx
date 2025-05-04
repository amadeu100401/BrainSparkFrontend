import { useState } from "react";
import axios from axios;

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        birthday: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubimit = async (e) => {
        e.proventDefault();
        setError("");
        setSuccess("");

        try {
            await axios.post("", {
                ...form
            });

            setSuccess("Usuário cadastrado com sucesso!");
        } catch(err) {
            setError("Erro ao cadastrar o usuário.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubimit}
                className="bg-white p-6 rounded-x1 shadown-md w-full max-w-md space-y-4"
            >
            </form>
        </div>
    );
}