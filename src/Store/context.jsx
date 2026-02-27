import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore/lite";
import { createContext, useEffect, useReducer, useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase.js";
import { toast, ToastContainer } from "react-toastify";
export const context = createContext()

import { db } from '../firebase.js'
import { onAuthStateChanged } from "firebase/auth";
export function ContextApp({ children }) {
    let initialState = []
    const [loading, setLoading] = useState(true);

    let [user, setUser] = useState()
    let [apiData, setApiData] = useState([])
    let [State, setState] = useState([])
    // let [State, dispatch] = useReducer(Reducer, initialState)
    let [none, setNone] = useState(window.matchMedia("(max-width:768px)").matches)
    let [toggle, setToggle] = useState(null)
    async function loginWithGoogle() {
        try {
            let result = await signInWithPopup(auth, provider)
            console.log("login ho gaya", result.user)
            setUser(result.user)
        } catch (error) {
            console.error(error);
        }
    }
    // useEffect(() => {
    //     // loginWithGoogle()
    // }, [])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            setTimeout(() => {
                setLoading(false);
                if (currentUser) toast.success(`Welcome ${currentUser.displayName}`)

            }, 3000)
        });

        return () => unsubscribe();
    }, []);
    function logout() {
        auth.signOut();
        toast.success(`${user.displayName} Signout Successfully`)
        setUser(null);
    }




    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=50")
            .then(res => res.json()).then(data => setApiData(data.products))

    }, [])
    // if()
    useEffect(() => {
        async function initData() {
            if (!user || apiData.length === 0) return;

            let snapshot = await getDocs(
                collection(db, "Users", user.uid, "posts")
            );

            if (snapshot.size === 0) {
                for (const item of apiData) {
                    await setDoc(
                        doc(db, "Users", user.uid, "posts", item.id.toString()),
                        item
                    );
                }


                snapshot = await getDocs(
                    collection(db, "Users", user.uid, "posts")
                );
            }

            let posts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setState(posts);
            if (posts.length !== 0)toast.success(`${user.displayName} Posts Loaded Successfully`)
        }
        

            initData();
    }, [user, apiData]);
    console.log(State.length)
    console.log(State)
    async function checkIncludes(obj) {
        console.log("andar agyaa ", State)
        if (State.length === 0) {

        }
        else {
            const isDuplicate = State.some((item) => {

                console.log("Title:", item.title === obj.title);
                console.log("Description:", item.description === obj.description);
                console.log("Image:", item.images[0] === obj.images[0]);
                console.log("rating:", item.rating === obj.rating);
                console.log("Tags:",
                    JSON.stringify(item.tags) === JSON.stringify(obj.tags)
                );

                return (
                    item.title === obj.title ||
                    item.description === obj.description ||
                    item.images[0] === obj.images[0] ||
                    item.rating === obj.rating ||
                    JSON.stringify(item.tags) === JSON.stringify(obj.tags)
                );
            });

            console.log("Final some() result:", isDuplicate);
            console.log(isDuplicate)
            if (!isDuplicate && user) {
                setState(pre => [obj, ...pre])
                setDoc(doc(db, "Users", user.uid, "posts", obj.id.toString()), obj)
                toast.success(`${user.displayName} Post Added Successfully`)

            } else {
                toast.success(`${user.displayName} Post Already Declared`)
            }
        }
    }
    async function DeleteItem(Id) {
        if (!Id) return console.error("Cannot delete: Id is undefined")
        await deleteDoc(doc(db, "Users", user.uid, "posts", Id.toString()))
        let filterDelete = State.filter((item) => item.id !== Id)
        setState(filterDelete)
        toast.success(`${user.displayName} Post Deleted Successfully`)
    }
    function CollectFormData(obj) {
        checkIncludes(obj)

    }
    let allState = State;
    return (
        <>
            <ToastContainer position="top-center" />
            < context.Provider value={{
                CollectFormData, State, none, setNone, toggle, setToggle, DeleteItem, user, loginWithGoogle, logout, loading,
                allState
            }}>
                {children}
            </context.Provider >
        </>
    )
}