import React, { useState,useEffect } from "react";

const dilutionLabels = ["10^0", "10^-1", "10^-2", "10^-3"];

const BackTitrationWell = () => {
    // ✅ 4개 그룹(10^0 ~ 10^-3), 각 그룹당 2개 행, 8개 컬럼
    const [wells, setWells] = useState(Array(4).fill(null).map(() => [Array(4).fill(false), Array(4).fill(false)]));
    const [isDragging, setIsDragging] = useState(false);
    const [dragValue, setDragValue] = useState(null);

    const toggleWell = (groupIdx, rowIdx, colIdx, value = null) => {
        setWells(prev => {
            const newWells = prev.map(group => group.map(row => [...row]));
            newWells[groupIdx][rowIdx][colIdx] = value !== null ? value : !newWells[groupIdx][rowIdx][colIdx];
            return newWells;
        });
    };

    return (
        <div className="back-titration">
            <div className="well-plate" onMouseUp={() => setIsDragging(false)}>
                {dilutionLabels.map((label, groupIdx) => (
                    <div key={groupIdx} className="well-group">
                        {/* <div className="group-label">{label}</div> */}
                        {wells[groupIdx].map((row, rowIdx) => (
                            <div key={rowIdx} className="well-row">
                                {row.map((well, colIdx) => (
                                    <div
                                        key={`${groupIdx}-${rowIdx}-${colIdx}`}
                                        className={`well ${well ? "selected" : ""}`}
                                        onMouseDown={() => {
                                            setIsDragging(true);
                                            const newValue = !wells[groupIdx][rowIdx][colIdx];
                                            setDragValue(newValue);
                                            toggleWell(groupIdx, rowIdx, colIdx, newValue);
                                        }}
                                        onMouseEnter={() => {
                                            if (isDragging) toggleWell(groupIdx, rowIdx, colIdx, dragValue);
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                        <div className="count-display">
                            {label} 선택: {wells[groupIdx][0].filter(Boolean).length + wells[groupIdx][1].filter(Boolean).length}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BackTitrationWell;
