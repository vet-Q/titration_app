import React, { useState } from "react";
import ResultDisplay from "./ResultDisplay";
import ChartView from "./ChartView";
import WellPlate from "./WellPlate";
import { fetchTCID50 } from "../api";
import "../styles/App.css";

const dilutionFactors = ["10^-1", "10^-2", "10^-3", "10^-4", "10^-5", "10^-6", "10^-7", "10^-8"];

const TCID50 = () => {
    const [result, setResult] = useState(null);
    const [inputData, setInputData] = useState(null);
    const [positiveCounts, setPositiveCounts] = useState(Array(8).fill(0));
    const [virusVolume, setVirusVolume] = useState(50);
    const [titerVirusVolume, setTiterVirusVolume] = useState(50);
    const [totalVolumeML, setTotalVolumeML] = useState(5);

    const [virusName, setVirusName] = useState("");
    const [passageNo, setPassageNo] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleUpdatePositiveCounts = (newCounts) => {
        setPositiveCounts([...newCounts]);
    };

    const handleCalculate = async () => {
        const requestData = {
            dilution_factors: dilutionFactors.map(f => Math.pow(10, parseFloat(f.replace("10^-", "-")))),
            positive_counts: positiveCounts,
            total_wells: 8,
            virus_volume_per_well: virusVolume,
            titer_virus_volume_per_well: titerVirusVolume,
            total_volume_ml: totalVolumeML,
        };

        setInputData(requestData);
        const response = await fetchTCID50(requestData);
        setResult(response);
    };

    const handleConfirm = () => {
        if (virusName && passageNo) {
            setIsConfirmed(true);
        }
    };

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleSaveChanges = () => {
        setShowModal(false);
    };

    return (
        <div className="tcid-container">
            {/* ✅ 제목 변경 */}
            <h1 className="title">
                🧪 TCID₅₀ Calculator {isConfirmed && `(${virusName} / ${passageNo})`}
                {isConfirmed && <button className="small-edit-button" onClick={handleEdit}>✏️</button>}
            </h1>

            {/* ✅ 바이러스명 & Passage No. 입력 */}
            {!isConfirmed ? (
                <div className="input-section">
                    <label>바이러스명: </label>
                    <input type="text" value={virusName} onChange={(e) => setVirusName(e.target.value)} placeholder="예: BTV-1" />

                    <label>Passage No.: </label>
                    <input type="text" value={passageNo} onChange={(e) => setPassageNo(e.target.value)} placeholder="예: P3" />

                    <button className="confirm-button" onClick={handleConfirm}>확인</button>
                </div>
            ) : null}

            {/* ✅ 기존 입력 필드 */}
            <div className="section">
                <label>Virus titration시 virus volume(μL): </label>
                <input type="number" value={virusVolume} onChange={(e) => setVirusVolume(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="section">
                <label>BT, VNT시 100TCID/well의 virus volume (μL): </label>
                <input type="number" value={titerVirusVolume} onChange={(e) => setTiterVirusVolume(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="section">
                <label>전체 볼륨 (mL): </label>
                <input type="number" value={totalVolumeML} onChange={(e) => setTotalVolumeML(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="section">
                <WellPlate onUpdate={handleUpdatePositiveCounts} />
            </div>

            <div className="section">
                <button className="calculate-button" onClick={handleCalculate}>
                    📊 TCID₅₀ 계산
                </button>
            </div>

            <div className="section row-layout">
                <div className="result-container">
                    <ResultDisplay result={result} virusVolume={virusVolume} titerVirusVolume={titerVirusVolume} totalVolumeML={totalVolumeML} />
                </div>
                <div className="chart-container">
                    <ChartView data={inputData} />
                </div>
            </div>

            {/* ✅ 수정 모달 창 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>바이러스명 & Passage 수정</h2>
                        <label>바이러스명: </label>
                        <input type="text" value={virusName} onChange={(e) => setVirusName(e.target.value)} />

                        <label>Passage No.: </label>
                        <input type="text" value={passageNo} onChange={(e) => setPassageNo(e.target.value)} />

                        <button className="save-button" onClick={handleSaveChanges}>저장</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TCID50;
