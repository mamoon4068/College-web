
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;

function StudentSocialLogin() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await axios.post(
        `${API}/api/student/auth/google`,
        {
          idToken: response.credential,
        }
      );

      const { token, student } = result.data;

      sessionStorage.setItem("studentToken", token);

      console.log("Student:", student);

      // Student dashboard par redirect
      navigate("/student/dashboard");

    } catch (error) {
      console.error(
        error.response?.data?.message ||
        "Google login failed"
      );
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Google Login Failed")}
        text="continue_with"
        shape="rectangular"
        theme="outline"
        width="300"
      />
    </div>
  );
}

export default StudentSocialLogin;
