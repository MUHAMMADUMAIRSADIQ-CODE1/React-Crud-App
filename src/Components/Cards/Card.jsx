import { useContext, useEffect, useState } from "react";
import { context } from "../../Store/context";

function Card() {
    let { State, DeleteItem } = useContext(context);
    let [search, setSearch] = useState("")
    // const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(10);
    let filtered = State.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    )
    let visibleItems = filtered.slice(0, visibleCount);
    // if (!showAll && !search) {
    //     filtered = filtered.slice(0, 4)
    // }


    return (
        <div className="cards-page container py-4">
            {/* Cards Header */}
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
            {State.length === 0 ? <p style={{ color: "#6C757D", textAlign: "center", marginTop: "70px" }}>There Are No Posts Yet</p> : ""}

            {/* Cards Wrapper */}
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
                                    <button className="btn btn-delete btn-sm" onClick={() =>{
                                         DeleteItem(item.id)
                                         console.log("jis per click kiya",item.id)
                                         }}>
                                        🗑 Delete
                                    </button>
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
                    <button className="btn btn-dark px-4 py-2 rounded-pill shadow" onClick={() => setVisibleCount(prev => prev + 10)}>
                        {/* {showAll ? "Read Less ⬆" : "Read More ⬇"} */}
                        Load More ⬇
                    </button>
                </div>
            ) : !search ? <div className="sticky-btn"> <button className="btn btn-dark px-4 py-2 rounded-pill shadow" onClick={() => {
                setVisibleCount(10)
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
                {/* {showAll ? "Read Less ⬆" : "Read More ⬇"} */}
                Read Less ⬆
            </button></div> : ""
            }
        </div >
    );
}

export default Card;