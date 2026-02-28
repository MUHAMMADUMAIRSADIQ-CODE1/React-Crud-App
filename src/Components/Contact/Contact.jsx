import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";

function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_2w0tr8l",
            "template_ha4xz8b",
            form.current,
            "ZWW3Rxr_ypcUVyiQs"
        )
            .then(() => {
                toast.success("Message Sent Successfully");
                e.target.reset();
            })
            .catch((error) => {
                console.error("Email KI tarf",error)
                toast.error("Something went wrong");
            });
    };

    return (
        <div className="container py-5">
            <ToastContainer position="top-center"/>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">

                            <h2 className="text-center mb-4 fw-bold">
                                Contact Us
                            </h2>

                            <form ref={form} onSubmit={sendEmail}>


                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter subject"
                                        required
                                    />
                                </div>


                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        className="form-control rounded-3"
                                        placeholder="Write your message..."
                                        required
                                    ></textarea>
                                </div>


                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-lg rounded-3"
                                    >
                                        Send Message
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;