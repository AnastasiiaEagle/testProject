'use client'

import Header from "@/components/Header/Header";
import ListPosts from "@/components/ListPosts/ListPosts";
import { useEffect, useState } from "react";

export default function Home() {
  const [viewState, setViewState] = useState(true);

  return (
   <>
    <Header onViewState={setViewState}/>
    {viewState ? "перше" : <ListPosts />}
   </>
  );
}
