import VNTWellPlate from "./VNTWellPlate";
import BackTitrationWell from "./BackTitrationWell";
import "../styles/VNTest.css";
import React, { useState, useEffect } from "react"; // ✅ useState 추가


const VNTTest = () => {
    const [plates, setPlates] = useState([{ id: 1 }]);
    const [vntResults, setVntResults] = useState({});
    const [backTitrationResults, setBackTitrationResults] = useState({});

    // ✅ VNT 검사 결과 저장
    const handleVNTUpdate = (sampleResults) => {
        setVntResults(sampleResults);
    };

    // ✅ Back Titration 결과 저장
    const handleBackTitrationUpdate = (titrationResults) => {
        setBackTitrationResults(titrationResults);
    };

    // ✅ 제출 버튼 클릭 시 콘솔 출력
    const handleSubmit = () => {
        console.log("🔹 VNT 검사 결과");
        Object.entries(vntResults).forEach(([sampleName, count]) => {
            console.log(`${sampleName}: ${count} wells`);
        });

        console.log("\n🔹 Back Titration 결과");
        Object.entries(backTitrationResults).forEach(([dilution, count]) => {
            console.log(`${dilution}: ${count} wells`);
        });
    };

    return (
        <div className="vnt-container">
            <header className="vnt-header">
                <h1 className="title">🦠 VNT 검사</h1>
            </header>

            <div className="vnt-layout">
                {/* ✅ 왼쪽: 96-well plate */}
                <div className="well-plate-container">
                    {plates.map((plate, index) => (
                        <VNTWellPlate key={plate.id} plateId={plate.id} onUpdate={handleVNTUpdate} />
                    ))}
                </div>

                {/* ✅ 오른쪽: Back Titration */}
                <div className="back-titration-container">
                    <h3>Back Titration</h3>
                    <BackTitrationWell onUpdate={handleBackTitrationUpdate} />
                </div>
            </div>

            {/* ✅ 제출 버튼 추가 */}
            <div className="submit-container">
                <button className="submit-button" onClick={handleSubmit}>📤 제출</button>
            </div>
        </div>
    );
};

export default VNTTest;
