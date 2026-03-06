import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../Store/context";
function Form() {
    const { CollectFormData, setDisplay, display, info, Update } = useContext(context)
    let [disabled, setDisabled] = useState(undefined)
    let titleRef = useRef("")
    let dispRef = useRef("")
    let imbRef = useRef("")
    let reactionsRef = useRef("")
    let HashRef = useRef("")
   const defaultPosts = [
    {
        title: "Exploring Nature",
        description: "Nature is full of beauty and peace. When we explore forests, mountains and rivers we feel relaxed and connected with the earth. Spending time in nature improves our mental health and gives us fresh energy for daily life.",
        images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"],
        rating: "😍😍😍",
        tags: ["#nature", "#travel"]
    },
    {
        title: "Future of Technology",
        description: "Technology is rapidly changing our world. Artificial intelligence, robotics and automation are making work easier and faster. In the future technology will help humans solve complex problems and improve everyday life.",
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"],
        rating: "🔥🔥🔥",
        tags: ["#technology", "#innovation"]
    },
    {
        title: "Healthy Lifestyle",
        description: "Living a healthy lifestyle requires balance between diet, exercise and mental peace. Regular physical activity and healthy food help the body stay strong and active while reducing stress and improving overall wellbeing.",
        images: ["https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=500&q=80"],
        rating: "💪💪",
        tags: ["#health", "#fitness"]
    },
    {
        title: "Learning Programming",
        description: "Programming is one of the most valuable skills in the modern world. Learning coding improves logical thinking and problem solving abilities. With dedication and practice anyone can become a skilled developer.",
        images: ["https://images.unsplash.com/photo-1581091215364-6e3a53e3ee14?auto=format&fit=crop&w=500&q=80"],
        rating: "💻💻",
        tags: ["#coding", "#developer"]
    },
    {
        title: "Travel Around The World",
        description: "Traveling to new places allows us to discover different cultures, foods and traditions. Every country has unique beauty and experiences that teach us more about the world and broaden our perspective.",
        images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"],
        rating: "✈️✈️",
        tags: ["#travel", "#adventure"]
    },
    {
        title: "Power of Books",
        description: "Books have the power to transform minds and inspire people. Reading regularly increases knowledge, improves imagination and helps individuals understand different viewpoints and ideas.",
        images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80"],
        rating: "📚📚",
        tags: ["#books", "#learning"]
    },
    {
        title: "Morning Motivation",
        description: "Starting the day with positive thoughts and motivation can improve productivity and focus. Successful people often follow morning routines that include exercise, planning and personal development.",
        images: ["https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=500&q=80"],
        rating: "🌅🌅",
        tags: ["#motivation", "#success"]
    },
    {
        title: "Digital Creativity",
        description: "The digital world provides many tools for creativity such as design software, video editing and animation. Creative individuals can express their ideas and reach global audiences through digital platforms.",
        images: ["https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=500&q=80"],
        rating: "🎨🎨",
        tags: ["#design", "#creative"]
    },
    {
        title: "Importance of Education",
        description: "Education is the foundation of a successful society. It empowers individuals with knowledge, critical thinking and skills that help them build better careers and contribute to community development.",
        images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"],
        rating: "🎓🎓",
        tags: ["#education", "#knowledge"]
    },
    {
        title: "Social Media Impact",
        description: "Social media has become a powerful tool for communication and information sharing. It connects people around the world but also requires responsible usage to maintain positive digital environments.",
        images: ["https://images.unsplash.com/photo-1515263487990-61e33a4d636d?auto=format&fit=crop&w=500&q=80"],
        rating: "📱📱",
        tags: ["#socialmedia", "#internet"]
    }
];
    useEffect(() => {
        if (display && info) {
            titleRef.current.value = info.title
            dispRef.current.value = info.description
            imbRef.current.value = info.images.join(" ")
            reactionsRef.current.value = info.rating
            HashRef.current.value = info.tags.join(" ")

            setDisabled(info)
        }
    }, [display, info])
    function takeInput() {
        let title = titleRef.current.value;
        let disp = dispRef.current.value;
        let img = imbRef.current.value;
        let rect = reactionsRef.current.value
        let hash = HashRef.current.value
        console.log("takeInput running")
        let obj = {
            id: display ? info.id : (Date.now()).toString(),
            title: title,
            description: disp,
            images: img.split(" "),
            rating: rect,
            tags: display ? hash.split(" ") : hash
        }
        setDisabled(obj)
    }
    console.log(disabled)
    function autoFillPost() {
        const randomPost = defaultPosts[Math.floor(Math.random() * defaultPosts.length)];

        titleRef.current.value = randomPost.title;
        dispRef.current.value = randomPost.description;
        imbRef.current.value = randomPost.images.join(" ");
        reactionsRef.current.value = randomPost.rating;
        HashRef.current.value = randomPost.tags.join(" ");

        takeInput();
    }
    function Wrapper() {
        return (
            <form className="Form form-input" onSubmit={(event) => {
                event.preventDefault()

                setDisplay(false)
                titleRef.current.value = ""
                dispRef.current.value = ""
                imbRef.current.value = ""
                reactionsRef.current.value = ""
                HashRef.current.value = ""

                if (!display) {
                    CollectFormData({
                        ...disabled,
                        tags: Array.isArray(disabled.tags)
                            ? disabled.tags
                            : disabled.tags.split(" ")
                    })
                }
                else {
                    Update(disabled)
                }
                setDisabled(undefined)
            }} >

                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{display ? "Edit Section" : "Post Generator"}</h1>
                {!display ? <button
                    type="button"
                    className="btn btn-success mb-3"
                    onClick={autoFillPost}
                >
                    Auto Generate Post
                </button> : ""}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter Post Title</label>
                    <input ref={titleRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Post Title" onChange={() => takeInput()} />
                    <div id="emailHelp" className="form-text">Enter Your Post Here </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Enter Description Here</label>
                    <textarea ref={dispRef} className="form-control" placeholder="Some quick example text to build on the card title and make up the..." onChange={() => takeInput()} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter Image Link Here</label>
                    <input ref={imbRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="https://tse1.mm.bing.net/th/id/OIP..." onChange={() => takeInput()} />
                    <div id="emailHelp" className="form-text">Enter Your Post Here </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter Post Reactions</label>
                    <input ref={reactionsRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="&#128512;&#128512;&#128512;" onChange={() => takeInput()} />
                    <div id="emailHelp" className="form-text">Enter Your Post Here </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter Post Tags</label>
                    <input ref={HashRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="#Post #Cards" onChange={() => takeInput()} />
                    <div id="emailHelp" className="form-text">Enter Your Post Here </div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => takeInput()} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={
                    !disabled ||
                    !disabled.title ||
                    !disabled.description ||
                    !disabled.images ||
                    !disabled.rating ||
                    !disabled.tags
                }> {display ? "Update" : "Submit"}</button>
            </form>

        )
    }
    return (
        <>
            {display ? (
                // 🔥 Modal Mode
                <div className="overlay">
                    <div className="modal-box">

                        <button
                            className="close-btn"
                            onClick={() => setDisplay(false)}
                        >
                            ✖
                        </button>

                        {Wrapper()}
                    </div>
                </div>
            ) : (
                // 🟢 Normal Page Mode

                <>{Wrapper()}</>

            )}
        </>
    )
}
export default Form;
