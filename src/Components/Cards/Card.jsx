import { useContext, useEffect, useState } from "react";
import { context } from "../../Store/context";
import Form from "../Form/Form";
import Loader from "../Loader/Loader";

function Card() {
    let { State, DeleteItem, EditItem, display, setDisplay, initData, exist } = useContext(context);
    let [search, setSearch] = useState("")
    let [popup, setPopup] = useState(false)
    // const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(2);
    let filtered = State.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    )
    let visibleItems = filtered.slice(0, visibleCount);
    // if (!showAll && !search) {
    //     filtered = filtered.slice(0, 4)
    // }



    return (
        display ? <Form /> : <div className="cards-page container py-4">
           
            <div className="cards-header d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2 className="cards-title">All Posts</h2>
                <input
                    type="text"
                    className="form-control search-input mt-2 mt-md-0"
                    placeholder="Search cards..."
                    onChange={(e) => {
                        setSearch(e.target.value)

                    }} />
            </div>

            {State.length === 0 ? (

                <div style={{ textAlign: "center", marginTop: "70px" }}>
                    <p style={{ color: "#6C757D" }}>There Are No Posts Yet</p>

                    <button
                        className="btn btn-dark mt-3"
                        onClick={() => setPopup(true)}
                    >
                        Fetch Posts
                    </button>
                </div>

            ) : ""}
            {popup ? <div class="popup-overlay">

                <div class="popup-box">

                    <h2>Fetch Posts</h2>

                    <p>
                        Are you sure you want to fetch posts again?
                        This will reload posts from the API.
                    </p>

                    <div class="popup-buttons">
                        <button className="cancel-btn" onClick={() => setPopup(false)}>Cancel</button>
                        <button className="fetch-btn" onClick={() => {
                            initData()
                            setPopup(false)
                        }}>Fetch Posts</button>
                    </div>

                </div>

            </div> : ""}

            {popup ? "" : exist.size === 0 ? <Loader /> : ""}

            <div className="cards-wrapper d-flex flex-wrap gap-4 justify-content-center">
                {visibleItems.map((item, index) => (
                    <div
                        key={index}
                        className="card shadow-lg border-0 rounded-4"
                        style={{ width: "22rem" }}
                    >
                        <img
                            src={item.images[0]}
                            className="card-img-top"
                            alt={item.title}
                        />

                        <div className="card-body d-flex flex-column justify-content-between">

                            <div>
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>

                            <div className="mt-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <button className="btn btn-outline-danger btn-sm rounded-pill px-3">
                                        ❤️ {item.rating}
                                    </button>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => {
                                                EditItem(item.id, item)
                                                setDisplay(true)


                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-delete btn-sm"
                                            onClick={() => DeleteItem(item.id)}
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap gap-2">
                                    {item.tags.map((tag, i) => (
                                        <span key={i} className="badge">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            {(visibleCount < filtered.length) ? (
                <div className="sticky-btn">
                    <button className="btn btn-dark px-4 py-2 rounded-pill shadow" onClick={() => setVisibleCount(prev => prev + 2)}>
                        
                        Load More ⬇
                    </button>
                </div>
            ) : !search ? <div className="sticky-btn"> <button className="btn btn-dark px-4 py-2 rounded-pill shadow" onClick={() => {
                setVisibleCount(2)
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
                
                Read Less ⬆
            </button></div> : ""
            }
        </div >
    );
}

export default Card;