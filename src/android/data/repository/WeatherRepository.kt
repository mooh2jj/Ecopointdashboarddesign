package com.katech.ecodrive.data.repository

import android.util.Log
import com.katech.ecodrive.data.local.prefs.AppPreferences
import com.katech.ecodrive.data.model.WeatherData
import com.katech.ecodrive.data.remote.api.EcoApiService
import com.katech.ecodrive.util.Constants
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * 날씨 데이터 Repository
 * - Short Polling (10분 간격)으로 날씨/온도 데이터 조회
 * - 네트워크 불안정 시 마지막 유효 값 유지
 */
class WeatherRepository(
    private val apiService: EcoApiService,
    private val prefs: AppPreferences
) {
    
    private val tag = "WeatherRepository"
    private var lastValidWeather: WeatherData? = null
    
    /**
     * 10분 간격 Short Polling
     * - Flow로 주기적으로 데이터 emit
     * - 네트워크 오류 시 마지막 유효 값 유지
     */
    fun observeWeatherUpdates(): Flow<WeatherResult> = flow {
        while (true) {
            try {
                val response = apiService.getWeather()
                
                if (response.isSuccessful && response.body() != null) {
                    val weather = response.body()!!
                    lastValidWeather = weather
                    prefs.lastWeatherUpdate = System.currentTimeMillis()
                    
                    Log.d(tag, "날씨 데이터 업데이트 성공: ${weather.temperature}°C")
                    emit(WeatherResult.Success(weather))
                } else {
                    Log.w(tag, "날씨 API 응답 실패: ${response.code()}")
                    // 마지막 유효 값이 있으면 그것을 사용
                    if (lastValidWeather != null) {
                        emit(WeatherResult.CachedData(lastValidWeather!!))
                    } else {
                        emit(WeatherResult.Error("날씨 데이터 없음"))
                    }
                }
            } catch (e: Exception) {
                Log.e(tag, "날씨 조회 중 네트워크 오류", e)
                // 네트워크 불안정 - 마지막 유효 값 반환
                if (lastValidWeather != null) {
                    emit(WeatherResult.CachedData(lastValidWeather!!))
                } else {
                    emit(WeatherResult.Error("네트워크 오류: ${e.message}"))
                }
            }
            
            // 10분 대기
            delay(Constants.WEATHER_POLLING_INTERVAL)
        }
    }
    
    /**
     * 즉시 날씨 조회 (수동 새로고침)
     */
    suspend fun fetchWeatherNow(): WeatherResult {
        return try {
            val response = apiService.getWeather()
            if (response.isSuccessful && response.body() != null) {
                val weather = response.body()!!
                lastValidWeather = weather
                prefs.lastWeatherUpdate = System.currentTimeMillis()
                WeatherResult.Success(weather)
            } else {
                lastValidWeather?.let { WeatherResult.CachedData(it) }
                    ?: WeatherResult.Error("날씨 데이터 없음")
            }
        } catch (e: Exception) {
            lastValidWeather?.let { WeatherResult.CachedData(it) }
                ?: WeatherResult.Error("네트워크 오류: ${e.message}")
        }
    }
}

/**
 * 날씨 조회 결과 Sealed Class
 */
sealed class WeatherResult {
    data class Success(val data: WeatherData) : WeatherResult()
    data class CachedData(val data: WeatherData) : WeatherResult()
    data class Error(val message: String) : WeatherResult()
}
