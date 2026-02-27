import { useContext, useEffect, useRef } from "react"
import { context } from "../../Store/context"

function Header({ setState }) {

    let ulref = useRef("")
    let { none, setNone, toggle, setToggle, logout } = useContext(context)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setNone(window.matchMedia("(max-width: 768px)").matches)

        })
    }, [])

    useEffect(() => {
        none ? setToggle(false) : setToggle(true)
    }, [none])

    return (
        <header className="p-3 text-bg-dark Header">

            <div className="container ">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <ul ref={ulref} className="nav col-6  col-lg-auto me-lg-auto mb-2 justify-content-lg-start  mb-md-0 justify-content-start nones">

                        <li onClick={() => setState("Home")}><a href="#" className="nav-link px-2 text-secondary">Home</a></li> <li><a href="#" className="nav-link px-2 text-white">Features</a></li> <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li> <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li> <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                    </ul>
                    <form className="col-12  d-none  d-lg-flex col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search"> <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                    </form>
                    {none ? <span onClick={() => setToggle(!toggle)} style={{ fontSize: "30px", cursor: "progress" }}>☰</span> : ""}

                    <div className="text-end btn-l col-lg-2 col-6 d-flex  justify-content-end align-items-center arrange">
                        <button type="button" className="btn btn-outline-light me-2" onClick={logout}>Logout</button>
                        <button type="button" className="btn btn-warning remove">Sign-up</button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header