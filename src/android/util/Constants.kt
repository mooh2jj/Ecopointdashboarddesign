package com.katech.ecodrive.util

/**
 * 앱 전체에서 사용되는 상수 정의
 */
object Constants {
    
    // 화면 해상도
    const val SCREEN_WIDTH = 1920
    const val SCREEN_HEIGHT = 720
    const val SAFE_ZONE_TOP = 80
    const val ACTIVE_AREA_HEIGHT = 640
    
    // 네비게이션
    const val SIDE_NAV_WIDTH = 140
    const val FEEDBACK_PANEL_WIDTH = 400
    
    // 터치 타겟 최소 크기 (IVI 가이드라인)
    const val MIN_TOUCH_TARGET = 48 // dp
    const val RECOMMENDED_TOUCH_TARGET = 88 // dp
    
    // 식물 성장 단계
    const val GROWTH_STAGE_SEED = 0
    const val GROWTH_STAGE_SPROUT = 1
    const val GROWTH_STAGE_PLANT = 2
    
    const val POINTS_THRESHOLD_SEED = 500
    const val POINTS_THRESHOLD_SPROUT = 1000
    
    // 애니메이션 지속 시간
    const val SPLASH_DURATION = 3000L // ms
    const val WATERING_ANIMATION_DURATION = 4000L
    const val SPARKLE_DURATION = 2600L
    
    // 네트워크
    const val BASE_URL = "http://your-vm-server:8080/" // VM 서버 주소
    const val WEBSOCKET_URL = "ws://your-vm-server:8080/ws/events"
    const val WEATHER_POLLING_INTERVAL = 600000L // 10분 (ms)
    
    // API 엔드포인트
    object Api {
        const val WEATHER = "api/weather"
        const val ECO_POINTS = "api/eco-points"
        const val DRIVING_PATTERNS = "api/driving-patterns"
        const val POINT_EXCHANGE = "api/point-exchange"
        const val USER_RESPONSE = "api/user-response"
    }
    
    // SharedPreferences Keys
    object Prefs {
        const val PREF_NAME = "eco_drive_prefs"
        const val KEY_LAST_ECO_POINTS = "last_eco_points"
        const val KEY_AC_CONTROL_ACCEPTED = "ac_control_accepted"
        const val KEY_VOICE_VOLUME = "voice_volume"
        const val KEY_LAST_WEATHER_UPDATE = "last_weather_update"
    }
    
    // Room Database
    object Database {
        const val NAME = "eco_drive_database"
        const val VERSION = 1
    }
    
    // 스크린 라우트
    object Routes {
        const val SPLASH = "splash"
        const val MAIN_DASHBOARD = "main_dashboard"
        const val POINT_MANAGEMENT = "point_management"
        const val DRIVER_ANALYSIS = "driver_analysis"
    }
    
    // WebSocket 이벤트 타입
    object EventType {
        const val RAPID_ACCELERATION = "rapid_acceleration"
        const val RAPID_DECELERATION = "rapid_deceleration"
        const val ECONOMIC_SPEED = "economic_speed"
        const val IDLE_REDUCTION = "idle_reduction"
        const val AC_CONTROL_PROPOSAL = "ac_control_proposal"
    }
}
