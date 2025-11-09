import { useState, useEffect } from "react";
import api from "./axios";
import Login from "./Login";

function App() {
    const [appointments, setAppointments] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            loadAppointments();
        }
    }, [loggedIn]);

    const loadAppointments = async () => {
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (err) {
            console.error("Error loading appointments", err);
        }
    };

    if (!loggedIn) {
        return <Login setLoggedIn={setLoggedIn} />;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>Appointments</h1>
            <ul>
                {appointments.map((a) => (
                    <li key={a.id}>
                        {a.name} - {a.date} - {a.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

