import React from "react"
import type { DiaryEntry } from "../types"

interface DiaryEntryProps {
    entry: DiaryEntry
}

const DiaryEntryItem: React.FC<DiaryEntryProps> = ({ entry }) => {
    return (
           <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{entry.date}</h3>
                <p style={{ margin: '0' }}>
                    **Visibilidad:** {entry.visibility}
                </p>
                <p style={{ margin: '5px 0' }}>
                    **Clima:** {entry.weather}
                </p>
                <p style={{ fontStyle: 'italic' }}>
                    *{entry.comment}*
                </p>
            </div>
        )
    }

export default DiaryEntryItem