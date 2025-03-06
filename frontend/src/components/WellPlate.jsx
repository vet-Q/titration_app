import React, { useState } from "react";
import "../styles/WellPlate.css";

const dilutionFactors = ["10^-1", "10^-2", "10^-3", "10^-4", "10^-5", "10^-6", "10^-7", "10^-8"];

const WellPlate = ({ onUpdate }) => {
    const [positiveCounts, setPositiveCounts] = useState(Array(8).fill(0));
    const [wells, setWells] = useState(Array(8).fill(null).map(() => Array(8).fill(false)));
    const [isDragging, setIsDragging] = useState(false); // ✅ 드래그 여부 상태 추가

    // 클릭 또는 드래그 시 Well 상태 변경
    const toggleWell = (row, col) => {
        setWells(prevWells => {
            const newWells = prevWells.map(innerRow => [...innerRow]);
            newWells[row][col] = !newWells[row][col];
            return newWells;
        });

        setPositiveCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[row] = wells[row][col] ? prevCounts[row] - 1 : prevCounts[row] + 1;
            onUpdate(newCounts);
            return newCounts;
        });
    };

    return (
        <div 
            className="well-plate"
            onMouseUp={() => setIsDragging(false)} // ✅ 드래그 끝
        >
            {dilutionFactors.map((factor, rowIdx) => (
                <div key={factor} className="dilution-row">
                    <span className="dilution-label">{factor}</span>
                    <div className="well-container">
                        {Array(8).fill(null).map((_, colIdx) => (
                            <div
                                key={`${rowIdx}-${colIdx}`}
                                className={`well ${wells[rowIdx][colIdx] ? "positive" : ""}`}
                                onMouseDown={() => {
                                    setIsDragging(true); // ✅ 드래그 시작
                                    toggleWell(rowIdx, colIdx);
                                }}
                                onMouseEnter={() => {
                                    if (isDragging) toggleWell(rowIdx, colIdx); // ✅ 드래그 중이면 변화 적용
                                }}
                            />
                        ))}
                    </div>
                    <span className="positive-count">{positiveCounts[rowIdx]}</span>
                </div>
            ))}
        </div>
    );
};

export default WellPlate;
