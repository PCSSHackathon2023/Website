import React from "react";
import styles from "../css/partytitle.module.css";

function SplitToChar(text, index) {
    let char = text.charAt(index);
    if (char === " ") {
        char = "\u00A0";
    }

    return (
        <p
            className={styles.text}
            style={{ animationDelay: index * 50 + "ms" }}
        >
            {char}
        </p>
    );
}

export default function PartyTitle({ text }) {
    let items = [];
    for (let i = 0; i < text.length; i++) {
        items.push(SplitToChar(text, i));
    }

    return <div className={styles.holder}>{items}</div>;
}
