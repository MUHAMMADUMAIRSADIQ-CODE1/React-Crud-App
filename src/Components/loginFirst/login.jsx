import { useContext } from "react";
import { context } from "../../Store/context";


function LoginScreen() {
    const { loginWithGoogle } = useContext(context);

    return (
        <div className="login-wrapper">

            {/* Navbar */}
            <nav className="navbar custom-navbar px-3 px-md-5 py-3">
                <span className="brand-text">Post Generator</span>
            </nav>

            {/* Main Section */}
            <div className="container flex-grow-1 d-flex align-items-center">
                <div className="row w-100 align-items-center gy-5 custom">

                    {/* Left Content */}
                    <div className="col-12 col-lg-6 text-center text-lg-start text-white">
                        <h1 className="main-heading">
                            Create Powerful
                            <span className="highlight-text"> Social Posts</span>
                        </h1>

                        <p className="sub-text mt-3">
                            Generate, manage and store professional posts instantly.
                            Secure cloud storage with Google authentication.
                        </p>

                        <button
                            onClick={loginWithGoogle}
                            className="google-login-btn mt-4"
                        >
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                alt="google"
                                width="20"
                            />
                            Continue with Google
                        </button>

                        <p className="security-text mt-3">
                            Secure Login Powered by Firebase
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="col-12 col-lg-6 text-center">
                        <div className="image-card mx-auto">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                                alt="preview"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="footer-text text-center py-3">
                © 2026 Post Generator
            </footer>

        </div>
    );
}

export default LoginScreen;