'use client'

import PostForm from "@/components/PostForm/PostForm"
import { useState } from "react"

export default function Create() {
    const [state, setState] = useState(true)

    return(
        <>
            <PostForm onState={state}/>
        </>
    )
}