package main

import (
	"context"
	"fmt"
	"math"
)

type TCID50Request struct {
	DilutionFactors         []float64 `json:"dilution_factors"`
	PositiveCounts          []float64 `json:"positive_counts"`
	TotalWells              float64   `json:"total_wells"`
	VirusVolumePerWell      float64   `json:"virus_volume_per_well"`
	TiterVirusVolumePerWell float64   `json:"titer_virus_volume_per_well"`
	TotalVolumeML           float64   `json:"total_volume_ml"`
}

type TCID50Response struct {
	LogTCID50       float64 `json:"log_tcid50"`
	TCID50          float64 `json:"tcid50"`
	TCID50PerVirus  float64 `json:"tcid50_per_virus"`
	StockVolumeUL   float64 `json:"stock_volume_ul"`
	DiluentVolumeUL float64 `json:"diluent_volume_ul"`
}

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

// CalculateTCID50 함수는 반드시 이렇게 써야 합니다.
func (a *App) CalculateTCID50(data *TCID50Request) (*TCID50Response, error) {
	n := len(data.DilutionFactors)
	if n == 0 || len(data.PositiveCounts) != n {
		return nil, fmt.Errorf("입력 배열 길이가 맞지 않습니다.")
	}
	if data.TotalWells <= 0 || data.VirusVolumePerWell <= 0 || data.TotalVolumeML <= 0 || data.TiterVirusVolumePerWell <= 0 {
		return nil, fmt.Errorf("입력값들은 양수여야 합니다.")
	}

	positives := make([]float64, n)
	negatives := make([]float64, n)
	for i := 0; i < n; i++ {
		p := data.PositiveCounts[i]
		if p > data.TotalWells {
			return nil, fmt.Errorf("양성 웰 수가 전체 웰 수보다 클 수 없습니다.")
		}
		positives[i] = p
		negatives[i] = data.TotalWells - p
	}

	cumulativePos := make([]float64, n)
	cumulativeNeg := make([]float64, n)

	for i := 0; i < n; i++ {
		sumPos := 0.0
		for k := i; k < n; k++ {
			sumPos += positives[k]
		}
		cumulativePos[i] = sumPos
	}

	for i := 0; i < n; i++ {
		sumNeg := 0.0
		for k := 0; k <= i; k++ {
			sumNeg += negatives[k]
		}
		cumulativeNeg[i] = sumNeg
	}

	infectedRates := make([]float64, n)
	for i := 0; i < n; i++ {
		denom := cumulativePos[i] + cumulativeNeg[i]
		if denom > 0 {
			infectedRates[i] = cumulativePos[i] / denom
		} else {
			infectedRates[i] = 0
		}
	}

	idx := -1
	for i := 0; i < n-1; i++ {
		if infectedRates[i] >= 0.5 && infectedRates[i+1] < 0.5 {
			idx = i
			break
		}
	}

	var logTCID50 float64
	if idx == -1 {
		logTCID50 = math.Log10(data.DilutionFactors[n-1])
	} else {
		p1 := infectedRates[idx]
		p2 := infectedRates[idx+1]
		d1 := math.Log10(data.DilutionFactors[idx])
		d2 := math.Log10(data.DilutionFactors[idx+1])
		fraction := (p1 - 0.5) / (p1 - p2)
		logTCID50 = d1 - fraction*(d1-d2)
	}

	tcid50 := math.Pow(10, math.Abs(logTCID50)) * 1000 / data.VirusVolumePerWell
	targetTCID50PerML := (100.0 / data.TiterVirusVolumePerWell) * 1000
	dilutionFactor := tcid50 / targetTCID50PerML
	stockVolumeUL := (data.TotalVolumeML * 1000) / dilutionFactor
	diluentVolumeUL := (data.TotalVolumeML * 1000) - stockVolumeUL

	return &TCID50Response{
		LogTCID50:       logTCID50,
		TCID50:          tcid50,
		TCID50PerVirus:  tcid50 / 1000.0 * data.VirusVolumePerWell,
		StockVolumeUL:   stockVolumeUL,
		DiluentVolumeUL: diluentVolumeUL,
	}, nil
}
