import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to My Project</h1>

      <button onClick={() => navigate("/signup")}>
        Get Started
      </button>

      <p>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-700"
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Home;
