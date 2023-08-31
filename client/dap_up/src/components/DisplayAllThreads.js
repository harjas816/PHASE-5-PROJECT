import React from "react";
import ThreadCard from "./ThreadCard";
import { useState } from "react";



function DisplayAllThreads({ threads }) {

    console.log(threads)
    const thread_cards = threads.map(t => {
        return (
            <ThreadCard
                key={t.id}
                id={t.id}
                title={t.title}
                description={t.description}
                creator={t.creator}
            />
        )
    }
    )
    console.log(thread_cards)
    return (
        <div>
            {thread_cards}
        </div>
    )
}

export default DisplayAllThreads