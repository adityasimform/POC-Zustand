import React, { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useNavigate } from "react-router";
import { useStore } from "../stores/store";

const LoginPage: React.FC = () => {
  const login = useStore((state) => state.login) as (username: string, password: string) => Promise<void>;
  const isLoggedIn = useStore((state) => state.isLoggedIn) as boolean;

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await login(username, password);
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <Input
            label="Username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
