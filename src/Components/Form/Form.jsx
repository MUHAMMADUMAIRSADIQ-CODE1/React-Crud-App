import { useContext, useRef, useState } from "react";
import { context } from "../../Store/context";
function Form() {
    const { CollectFormData } = useContext(context)
    let [disabled, setDisabled] = useState(undefined)
    let titleRef = useRef("")
    let dispRef = useRef("")
    let imbRef = useRef("")
    let reactionsRef = useRef("")
    let HashRef = useRef("")
    function takeInput() {
        let title = titleRef.current.value;
        let disp = dispRef.current.value;
        let img = imbRef.current.value;
        let rect = reactionsRef.current.value
        let hash = HashRef.current.value
        console.log("jahan per feed kiya", hash)
        let obj = {
            id: (Date.now()).toString(),
            title: title,
            description: disp,
            images: img.split(" "),
            rating: rect,
            tags: hash
        }
        setDisabled(obj)
    }
    return (
        <form className="Form form-input" onSubmit={(event) => {
            event.preventDefault()

            titleRef.current.value = ""
            dispRef.current.value = ""
            imbRef.current.value = ""
            reactionsRef.current.value = ""
            HashRef.current.value = ""
            CollectFormData({ ...disabled, tags: disabled.tags.split(" ") })
            setDisabled(undefined)
        }} >
            {console.log(disabled)}
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Post Generator</h1>
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
            {console.log("hash dekh raha hoon", disabled ? disabled.tags : "")}
            <button type="submit" className="btn btn-primary" disabled={
                !disabled ||
                !disabled.title ||
                !disabled.description ||
                !disabled.images ||
                !disabled.rating ||
                !disabled.tags
            }>Submit</button>
        </form>
    )
}
export default Form;
