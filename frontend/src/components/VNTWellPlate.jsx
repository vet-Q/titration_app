import React, { useState } from "react";
import VNTSample from "./VNTSample"; // ✅ VNTSample import 확인
import "../styles/VNTWellPlate.css";

const initialBackTitration = () => Array(4).fill(null).map(() => [Array(4).fill(false), Array(4).fill(false)]);

const VNTWellPlate = () => {
    const [samples, setSamples] = useState([
        { id: 1, name: "", isConfirmed: false },
        { id: 2, name: "", isConfirmed: false },
        { id: 3, name: "", isConfirmed: false },
        { id: 4, name: "", isConfirmed: false },
    ]);

    return (
        <div className="vnt-container">
            <div className="well-plate-container">
                {samples.map((sample, idx) => (
                    <VNTSample key={sample.id} sample={sample} sampleIdx={idx} /> // ✅ VNTSample 정상적으로 불러오는지 확인
                ))}
                <button className="add-sample-button">샘플 추가</button>
            </div>
        </div>
    );
};

export default VNTWellPlate;
