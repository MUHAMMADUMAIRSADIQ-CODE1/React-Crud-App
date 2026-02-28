import { useContext } from "react";
import { context } from "../../Store/context";

function SideBar({ State, setState }) {
    let { none, toggle, user,logout  } = useContext(context)

    return (
        <div>
            {
                toggle && (
                    <div className="d-flex  SideBar flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px" }}> <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> <svg className="bi pe-none me-2" width="40" height="32" aria-hidden="true"><use xlinkHref="#bootstrap"></use></svg> <span className="fs-4">Sidebar</span> </a> <hr /> <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item"> <a href="#" className={`nav-link text-white ${State === "Home" ? "active" : ""} `} aria-current="page" onClick={() => setState("Home")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#home"></use></svg>
                            Home
                        </a> </li>

                        <li> <a href="#" className={`nav-link text-white ${State === "Products" ? "active" : ""} `} onClick={() => setState("Products")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#grid"></use></svg>
                            Products
                        </a> </li>
                        <li> <a href="#" className={`nav-link text-white ${State === "Contact" ? "active" : ""} `} onClick={() => setState("Contact")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#grid"></use></svg>
                            Contact
                        </a> </li>
                        {none ?
                            <>
                                <li> <a href="#" className={`nav-link text-white ${State === "Features" ? "active" : ""} `} onClick={() => setState("Features")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#grid"></use></svg>
                                    Features
                                </a> </li>
                                <li> <a href="#" className={`nav-link text-white ${State === "Pricing" ? "active" : ""} `} onClick={() => setState("Pricing")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#grid"></use></svg>
                                    Pricing
                                </a> </li>
                                <li> <a href="#" className={`nav-link text-white ${State === "FAQS" ? "active" : ""} `} onClick={() => setState("FAQS")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#grid"></use></svg>
                                    FAQS
                                </a> </li>
                                <li> <a href="#" className={`nav-link text-white ${State === "About" ? "active" : ""} `} onClick={() => setState("About")}> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#grid"></use></svg>
                                    About
                                </a> </li>
                            </>

                            : ""}
                    </ul> <hr />
                        <div className="dropdown"> <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> <img src={`${user.photoURL}`} alt="" width="32" height="32" className="rounded-circle me-2" /> <strong>{user.displayName}</strong> </a> <ul className="dropdown-menu dropdown-menu-dark text-small shadow"> <li><a className="dropdown-item" href="#">New project...</a></li> <li><a className="dropdown-item" href="#">Settings</a></li> <li><a className="dropdown-item" href="#">Profile</a></li> <li><hr className="dropdown-divider" /></li> <li><a className="dropdown-item" href="#"onClick={logout}>Sign out</a></li> </ul> </div> </div>

                )
            }
        </div>
    )
}
export default SideBar;