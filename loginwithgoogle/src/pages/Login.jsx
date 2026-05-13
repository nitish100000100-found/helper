import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);

    const token = credentialResponse.credential;

    // backend ko bhejna
    const res = await fetch("http://localhost:3000/auth/google/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <h1>Login with Google1</h1>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
      <h1>Login with Google</h1>
    </div>
  );
}

export default Login;