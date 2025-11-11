package com.katech.ecodrive.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

/**
 * 운전 패턴 분석 모델
 */
@Entity(tableName = "driving_patterns")
data class DrivingPattern(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val date: Date,
    val rapidAcceleration: Int,      // 급가속 횟수
    val rapidDeceleration: Int,      // 급감속 횟수
    val rapidStart: Int,             // 급출발 횟수
    val rapidStop: Int,              // 급정지 횟수
    val idleTime: Int,               // 공회전 시간 (초)
    val avgSpeed: Float,             // 평균 속도 (km/h)
    val ecoPoints: Int               // 해당 날짜 획득 포인트
)

/**
 * 주행 기록 (주간 캘린더용)
 */
@Entity(tableName = "driving_records")
data class DrivingRecord(
    @PrimaryKey
    val date: String,  // "yyyy-MM-dd" 형식
    val distance: Float,  // 주행거리 (km)
    val time: Int,        // 운전 시간 (분)
    val points: Int,      // 획득 포인트
    val delta: Int        // 전일 대비 증감률 (%)
)

/**
 * 차트 데이터 모델 (추이 차트용)
 */
data class TrendData(
    val date: String,      // "8/14" 형식
    val ecoPoints: Int,
    val avgSpeed: Float
)

/**
 * 패턴 차트 데이터 (바 차트용)
 */
data class PatternChartData(
    val name: String,      // "가속", "감속", "출발", "정지"
    val negative: Int,     // 급함 (빨간색)
    val positive: Int      // 안정 (녹색)
)
