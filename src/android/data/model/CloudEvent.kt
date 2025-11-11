package com.katech.ecodrive.data.model

import com.katech.ecodrive.util.Constants
import kotlinx.serialization.Serializable
import java.util.Date

/**
 * 클라우드에서 수신하는 실시간 이벤트 모델 (WebSocket)
 */
@Serializable
data class CloudEvent(
    val eventType: String,        // EventType 상수 참조
    val timestamp: Long,
    val data: EventData
)

@Serializable
data class EventData(
    val points: Int? = null,              // 포인트 변화량
    val description: String? = null,      // 이벤트 설명
    val speedLimit: Int? = null,          // 경제속도 (km/h)
    val currentSpeed: Float? = null,      // 현재 속도
    val acProposal: AcProposal? = null    // A/C 제어 제안
)

@Serializable
data class AcProposal(
    val action: String,           // "turn_off", "reduce_temperature"
    val currentTemp: Float,       // 현재 설정 온도
    val suggestedTemp: Float?,    // 제안 온도
    val estimatedSavings: Int     // 예상 절감 포인트
)

/**
 * 날씨 데이터 (Short Polling으로 수신)
 */
@Serializable
data class WeatherData(
    val temperature: Float,       // 온도 (°C)
    val condition: String,        // 날씨 상태 ("맑음", "흐림" 등)
    val location: String,         // 위치
    val timestamp: Long
)

/**
 * 사용자 응답 모델 (서버로 전송)
 */
@Serializable
data class UserResponse(
    val eventId: String,
    val responseType: String,     // "accept", "reject", "dismiss"
    val timestamp: Long = System.currentTimeMillis()
)

/**
 * 피드백 카드 모델
 */
data class FeedbackCard(
    val iconName: String,         // "ThumbsUp", "Leaf", "AlertTriangle"
    val text: String,
    val color: String             // Hex color
)
