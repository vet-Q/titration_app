import React, { useState, useEffect } from "react"; // ✅ useState 추가
import { Tabs, Tab, Box } from "@mui/material";
import TCID50 from "./components/TCID50";  // 기존 TCID50 계산기
import VNTTest from "./components/VNTest"; // 새로 만든 VNT 컴포넌트
import "./styles/App.css";

const App = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            {/* ✅ 탭 UI */}
            <Tabs
                value={tabIndex}
                onChange={(event, newIndex) => setTabIndex(newIndex)}
                centered
            >
                <Tab label="TCID₅₀ 계산" />
                <Tab label="VNT 검사" />
            </Tabs>

            {/* ✅ 선택된 탭에 따라 다른 컴포넌트 렌더링 */}
            <div className="tab-content">
                {tabIndex === 0 && <TCID50 />}
                {tabIndex === 1 && <VNTTest />}
            </div>
        </Box>
    );
};

export default App;
