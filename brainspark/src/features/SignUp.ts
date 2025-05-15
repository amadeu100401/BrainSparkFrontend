import httpUtil from "../utils/HttpUtil";

interface SignUpProps {
  payload: {
    name: string;
    email: string;
    password: string;
    birthDate?: any;
  };
}

export async function signup({ payload }:SignUpProps) {
    const response = await httpUtil({
        url: "/api/v1/users/signup",
        method: "POST",
        data: payload
    });

    sessionStorage.setItem("email", response.email);
}