package com.katech.ecodrive.data.local.prefs

import android.content.Context
import android.content.SharedPreferences
import com.katech.ecodrive.util.Constants

/**
 * SharedPreferences 래퍼 클래스
 * 간단한 설정 값 및 캐싱 데이터 저장
 */
class AppPreferences(context: Context) {
    
    private val prefs: SharedPreferences = context.getSharedPreferences(
        Constants.Prefs.PREF_NAME,
        Context.MODE_PRIVATE
    )
    
    // 마지막 에코 포인트 (빠른 캐싱)
    var lastEcoPoints: Int
        get() = prefs.getInt(Constants.Prefs.KEY_LAST_ECO_POINTS, 0)
        set(value) = prefs.edit().putInt(Constants.Prefs.KEY_LAST_ECO_POINTS, value).apply()
    
    // A/C 제어 수락 여부
    var acControlAccepted: Boolean
        get() = prefs.getBoolean(Constants.Prefs.KEY_AC_CONTROL_ACCEPTED, false)
        set(value) = prefs.edit().putBoolean(Constants.Prefs.KEY_AC_CONTROL_ACCEPTED, value).apply()
    
    // 음성 안내 볼륨 (0~100)
    var voiceVolume: Int
        get() = prefs.getInt(Constants.Prefs.KEY_VOICE_VOLUME, 70)
        set(value) = prefs.edit().putInt(Constants.Prefs.KEY_VOICE_VOLUME, value.coerceIn(0, 100)).apply()
    
    // 마지막 날씨 업데이트 시간
    var lastWeatherUpdate: Long
        get() = prefs.getLong(Constants.Prefs.KEY_LAST_WEATHER_UPDATE, 0L)
        set(value) = prefs.edit().putLong(Constants.Prefs.KEY_LAST_WEATHER_UPDATE, value).apply()
    
    // 모든 설정 초기화
    fun clearAll() {
        prefs.edit().clear().apply()
    }
}
