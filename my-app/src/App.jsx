import { useEffect, useState } from "react";
import axios from "axios";


function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:9000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post("http://localhost:9000/users", { name, email });
            fetchUsers();
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error adding user:", error);
        }
        setSubmitting(false);
    }

    async function deleteUser(id) {
        try {
            await axios.delete(`http://localhost:9000/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <div className="container">
            <h2>🚀 Register New User</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            <h2>📋 Users List</h2>
            {loading ? (
                <p className="loading">Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="user-card">
                            <span>{user.name} ({user.email})</span>
                            <button onClick={() => deleteUser(user.id)} className="delete-btn">🗑️ Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
