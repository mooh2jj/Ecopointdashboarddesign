package com.katech.ecodrive.data.remote.api

import com.katech.ecodrive.data.model.*
import com.katech.ecodrive.util.Constants
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

/**
 * Retrofit API 서비스 인터페이스
 * - Short Polling으로 날씨/온도 데이터 조회
 * - 포인트 교환, 사용자 응답 전송
 */
interface EcoApiService {
    
    /**
     * 날씨 데이터 조회 (Short Polling - 10분마다)
     */
    @GET(Constants.Api.WEATHER)
    suspend fun getWeather(): Response<WeatherData>
    
    /**
     * 에코 포인트 현황 조회
     */
    @GET(Constants.Api.ECO_POINTS)
    suspend fun getEcoPoints(@Query("userId") userId: String): Response<EcoPoint>
    
    /**
     * 운전 패턴 데이터 조회
     */
    @GET(Constants.Api.DRIVING_PATTERNS)
    suspend fun getDrivingPatterns(
        @Query("userId") userId: String,
        @Query("startDate") startDate: String,
        @Query("endDate") endDate: String
    ): Response<List<DrivingPattern>>
    
    /**
     * 포인트 교환 요청
     */
    @POST(Constants.Api.POINT_EXCHANGE)
    suspend fun exchangePoints(
        @Body request: ExchangeRequest
    ): Response<ExchangeResponse>
    
    /**
     * 사용자 응답 전송 (A/C 제어 수락/거절 등)
     */
    @POST(Constants.Api.USER_RESPONSE)
    suspend fun sendUserResponse(
        @Body response: UserResponse
    ): Response<Unit>
    
    companion object {
        fun create(): EcoApiService {
            val retrofit = Retrofit.Builder()
                .baseUrl(Constants.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            
            return retrofit.create(EcoApiService::class.java)
        }
    }
}

/**
 * 요청/응답 모델
 */
data class ExchangeRequest(
    val userId: String,
    val itemId: Long,
    val pointsRequired: Int
)

data class ExchangeResponse(
    val success: Boolean,
    val message: String,
    val remainingPoints: Int
)
