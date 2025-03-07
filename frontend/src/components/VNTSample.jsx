import React, { useState } from "react";

const initialWells = () => Array(2).fill(null).map(() => Array(12).fill(false));

const VNTSample = ({ sample, sampleIdx }) => {
    const [sampleData, setSampleData] = useState(sample);
    const [wells, setWells] = useState(initialWells());
    const [isDragging, setIsDragging] = useState(false);
    const [dragValue, setDragValue] = useState(null); // ✅ 드래그할 값 저장

    // ✅ Well 상태 변경 (드래그 지원)
    const toggleWell = (row, col, value = null) => {
        setWells(prev => {
            const newWells = prev.map(innerRow => [...innerRow]);
            if (value !== null) {
                newWells[row][col] = value;
            } else {
                newWells[row][col] = !newWells[row][col];
            }
            return newWells;
        });
    };

    // ✅ 샘플명 입력 & 확인
    const handleConfirmName = () => {
        setSampleData(prev => ({ ...prev, isConfirmed: true }));
    };

    // ✅ 샘플명 수정
    const handleEditName = () => {
        setSampleData(prev => ({ ...prev, isConfirmed: false }));
    };

    return (
        <div className="sample-section"
            onMouseUp={() => setIsDragging(false)} // ✅ 드래그 종료 이벤트 추가
        >
            <div className="sample-header">
                {sampleData.isConfirmed ? (
                    <>
                        <span>{sampleData.name}</span>
                        <button className="edit-button" onClick={handleEditName}>✏️</button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={sampleData.name}
                            onChange={(e) => setSampleData({ ...sampleData, name: e.target.value })}
                            placeholder="샘플명 입력"
                        />
                        <button className="confirm-button" onClick={handleConfirmName}>확인</button>
                    </>
                )}
            </div>

            <div className="well-plate">
                {wells.map((row, rowIdx) => (
                    <div key={rowIdx} className="well-row">
                        {row.map((well, colIdx) => (
                            <div
                                key={`${rowIdx}-${colIdx}`}
                                className={`well ${well ? "selected" : ""}`}
                                onMouseDown={() => {
                                    setIsDragging(true);
                                    const newValue = !wells[rowIdx][colIdx]; // ✅ 현재 상태 반전 후 저장
                                    setDragValue(newValue);
                                    toggleWell(rowIdx, colIdx, newValue);
                                }}
                                onMouseEnter={() => {
                                    if (isDragging) {
                                        toggleWell(rowIdx, colIdx, dragValue);
                                    }
                                }}
                            />
                        ))}
                        <span className="count-display">
                            {row.filter(Boolean).length} {/* ✅ 선택된 개수 표시 */}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VNTSample;
