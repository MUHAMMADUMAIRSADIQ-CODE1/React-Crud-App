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
title:"Exploring Nature",
description:"Nature is full of beauty and peace. When we explore forests, mountains and rivers we feel relaxed and connected with the earth. Spending time in nature improves our mental health and gives us fresh energy for daily life.",
images:["https://picsum.photos/500/300"],
rating:"😍😍😍",
tags:["#nature","#travel"]
},

{
title:"Future of Technology",
description:"Technology is rapidly changing our world. Artificial intelligence, robotics and automation are making work easier and faster. In the future technology will help humans solve complex problems and improve everyday life.",
images:["https://picsum.photos/500/301"],
rating:"🔥🔥🔥",
tags:["#technology","#innovation"]
},

{
title:"Healthy Lifestyle",
description:"Living a healthy lifestyle requires balance between diet, exercise and mental peace. Regular physical activity and healthy food help the body stay strong and active while reducing stress and improving overall wellbeing.",
images:["https://picsum.photos/500/302"],
rating:"💪💪",
tags:["#health","#fitness"]
},

{
title:"Learning Programming",
description:"Programming is one of the most valuable skills in the modern world. Learning coding improves logical thinking and problem solving abilities. With dedication and practice anyone can become a skilled developer.",
images:["https://picsum.photos/500/303"],
rating:"💻💻",
tags:["#coding","#developer"]
},

{
title:"Travel Around The World",
description:"Traveling to new places allows us to discover different cultures, foods and traditions. Every country has unique beauty and experiences that teach us more about the world and broaden our perspective.",
images:["https://picsum.photos/500/304"],
rating:"✈️✈️",
tags:["#travel","#adventure"]
},

{
title:"Power of Books",
description:"Books have the power to transform minds and inspire people. Reading regularly increases knowledge, improves imagination and helps individuals understand different viewpoints and ideas.",
images:["https://picsum.photos/500/305"],
rating:"📚📚",
tags:["#books","#learning"]
},

{
title:"Morning Motivation",
description:"Starting the day with positive thoughts and motivation can improve productivity and focus. Successful people often follow morning routines that include exercise, planning and personal development.",
images:["https://picsum.photos/500/306"],
rating:"🌅🌅",
tags:["#motivation","#success"]
},

{
title:"Digital Creativity",
description:"The digital world provides many tools for creativity such as design software, video editing and animation. Creative individuals can express their ideas and reach global audiences through digital platforms.",
images:["https://picsum.photos/500/307"],
rating:"🎨🎨",
tags:["#design","#creative"]
},

{
title:"Importance of Education",
description:"Education is the foundation of a successful society. It empowers individuals with knowledge, critical thinking and skills that help them build better careers and contribute to community development.",
images:["https://picsum.photos/500/308"],
rating:"🎓🎓",
tags:["#education","#knowledge"]
},

{
title:"Social Media Impact",
description:"Social media has become a powerful tool for communication and information sharing. It connects people around the world but also requires responsible usage to maintain positive digital environments.",
images:["https://picsum.photos/500/309"],
rating:"📱📱",
tags:["#socialmedia","#internet"]
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
        titleRef.current.value = defaultPosts[Math.floor(Math.random() * defaultPosts.length)].title
        dispRef.current.value = defaultPosts[Math.floor(Math.random() * defaultPosts.length)].description
        imbRef.current.value = defaultPosts[Math.floor(Math.random() * defaultPosts.length)].images.join(" ")
        reactionsRef.current.value = defaultPosts[Math.floor(Math.random() * defaultPosts.length)].rating
        HashRef.current.value = defaultPosts[Math.floor(Math.random() * defaultPosts.length)].tags.join(" ")
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
                    onClick={()=>{
                        autoFillPost();
                        takeInput();
                    }}
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
