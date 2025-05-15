'use client'

import PostForm from "@/components/PostForm/PostForm";
import { useState } from "react";

export default function Update() {
    const [state, setState] = useState(false)

    return(
        <>
            <PostForm onState={state}/>
        </>
    )
}