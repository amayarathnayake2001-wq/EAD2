import { useState } from "react";
import api from "./axios";

export default function Login({ setLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);
            setLoggedIn(true);
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/>

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/>

                <button type="submit">Login</button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
