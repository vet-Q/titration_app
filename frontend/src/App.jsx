import React, { useState, useEffect } from "react"; // ✅ useState 추가
import { Tabs, Tab, Box, Switch, FormControlLabel, CssBaseline } from "@mui/material"; // ✅ Switch, FormControlLabel, CssBaseline 추가
import { ThemeProvider, createTheme } from "@mui/material/styles"; // ✅ MUI 다크모드 관련 추가
import TCID50 from "./components/TCID50";  // 기존 TCID50 계산기
import VNTTest from "./components/VNTest"; // 새로 만든 VNT 컴포넌트
import "./styles/App.css";

const App = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [darkMode, setDarkMode] = useState(false); // ✅ 다크 모드 상태 추가

    // ✅ MUI 테마 설정 (다크 모드 적용)
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* ✅ 기본 스타일 적용 (다크모드 활성화) */}
            <Box sx={{ width: "100%", bgcolor: "background.paper", minHeight: "100vh", padding: 2 }}>
                {/* ✅ 다크 모드 토글 스위치 */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={() => setDarkMode(prev => !prev)}
                        />
                    }
                    label={darkMode ? "🌙" : "☀️"}
                    sx={{ position: "absolute", top: 10, right: 20, zIndex: 10 }} // ✅ 위치 조정
                />

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
                <footer>
                    <p>DVM_Q© 2025.All rights reserved.</p>
                </footer>
            </Box>
        </ThemeProvider>
    );
};


export default App;
