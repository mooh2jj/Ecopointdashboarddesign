package com.katech.ecodrive.data.repository

import com.katech.ecodrive.data.local.dao.PointEntryDao
import com.katech.ecodrive.data.local.prefs.AppPreferences
import com.katech.ecodrive.data.model.*
import com.katech.ecodrive.data.remote.api.EcoApiService
import com.katech.ecodrive.data.remote.api.ExchangeRequest
import com.katech.ecodrive.data.remote.websocket.WebSocketEvent
import com.katech.ecodrive.data.remote.websocket.WebSocketManager
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

/**
 * 에코 포인트 Repository
 * - WebSocket 이벤트 처리
 * - HTTP API 호출
 * - 로컬 DB 캐싱
 * - SharedPreferences 관리
 * 
 * Data Layer의 핵심 - ViewModel은 이 Repository를 통해서만 데이터 접근
 */
class EcoPointRepository(
    private val apiService: EcoApiService,
    private val webSocketManager: WebSocketManager,
    private val pointEntryDao: PointEntryDao,
    private val prefs: AppPreferences
) {
    
    /**
     * WebSocket 이벤트 스트림
     * - ViewModel에서 collect하여 UI 업데이트
     */
    fun observeCloudEvents(): Flow<WebSocketEvent> {
        return webSocketManager.connectAndObserve()
    }
    
    /**
     * 로컬 DB에서 최근 포인트 내역 가져오기
     */
    fun getRecentPointEntries(limit: Int = 10): Flow<List<PointEntry>> {
        return pointEntryDao.getRecentEntries(limit)
    }
    
    /**
     * 포인트 내역 추가 (WebSocket 이벤트 수신 시)
     */
    suspend fun addPointEntry(entry: PointEntry) {
        pointEntryDao.insertEntry(entry)
        // SharedPreferences에도 최신 총 포인트 캐싱
        prefs.lastEcoPoints = prefs.lastEcoPoints + entry.points
    }
    
    /**
     * 서버에서 에코 포인트 조회
     */
    suspend fun fetchEcoPoints(userId: String): Result<EcoPoint> {
        return try {
            val response = apiService.getEcoPoints(userId)
            if (response.isSuccessful && response.body() != null) {
                val ecoPoint = response.body()!!
                // SharedPreferences 업데이트
                prefs.lastEcoPoints = ecoPoint.totalPoints
                Result.success(ecoPoint)
            } else {
                Result.failure(Exception("포인트 조회 실패: ${response.code()}"))
            }
        } catch (e: Exception) {
            // 네트워크 오류 시 마지막 캐싱된 값 반환
            Result.failure(e)
        }
    }
    
    /**
     * 포인트 교환 요청
     */
    suspend fun exchangePoints(
        userId: String,
        itemId: Long,
        pointsRequired: Int
    ): Result<String> {
        return try {
            val request = ExchangeRequest(userId, itemId, pointsRequired)
            val response = apiService.exchangePoints(request)
            
            if (response.isSuccessful && response.body() != null) {
                val result = response.body()!!
                if (result.success) {
                    // 포인트 차감 기록 추가
                    val entry = PointEntry(
                        type = PointEntryType.SPENT,
                        category = "교환",
                        points = -pointsRequired,
                        description = "포인트 교환",
                        timestamp = java.util.Date(),
                        iconColor = "#FFD54F"
                    )
                    addPointEntry(entry)
                    prefs.lastEcoPoints = result.remainingPoints
                    Result.success(result.message)
                } else {
                    Result.failure(Exception(result.message))
                }
            } else {
                Result.failure(Exception("교환 요청 실패: ${response.code()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    /**
     * 사용자 응답 전송 (A/C 제어 수락/거절 등)
     */
    suspend fun sendUserResponse(response: UserResponse): Result<Unit> {
        return try {
            val result = apiService.sendUserResponse(response)
            if (result.isSuccessful) {
                Result.success(Unit)
            } else {
                Result.failure(Exception("응답 전송 실패: ${result.code()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    /**
     * WebSocket 연결 종료
     */
    fun disconnectWebSocket() {
        webSocketManager.disconnect()
    }
}
