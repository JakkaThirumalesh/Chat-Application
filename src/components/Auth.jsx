import "../styles/Auth.css";
import googleLogo from "../assets/download.svg";

export const Auth = ({ signInWithGoogle }) => {
  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button onClick={() => signInWithGoogle()}>
        <img src={googleLogo} alt="Google logo" />
        Sign In With Google
      </button>
    </div>
  );
};
