package com.katech.ecodrive.ui.main

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.katech.ecodrive.data.model.*
import com.katech.ecodrive.data.remote.websocket.WebSocketEvent
import com.katech.ecodrive.data.repository.EcoPointRepository
import com.katech.ecodrive.data.repository.WeatherRepository
import com.katech.ecodrive.data.repository.WeatherResult
import com.katech.ecodrive.util.Constants
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.util.Date

/**
 * 메인 대시보드 ViewModel
 * - WebSocket 이벤트 수신 및 처리
 * - 날씨 데이터 Polling
 * - UI 상태 관리
 */
class MainDashboardViewModel(
    private val ecoPointRepository: EcoPointRepository,
    private val weatherRepository: WeatherRepository
) : ViewModel() {
    
    // UI State
    private val _uiState = MutableStateFlow(MainDashboardUiState())
    val uiState: StateFlow<MainDashboardUiState> = _uiState.asStateFlow()
    
    // 최근 포인트 내역 (Flow)
    val recentEntries: StateFlow<List<PointEntry>> = ecoPointRepository
        .getRecentPointEntries(limit = 3)
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )
    
    init {
        observeWebSocketEvents()
        observeWeatherUpdates()
    }
    
    /**
     * WebSocket 이벤트 관찰
     * - 실시간 운전 피드백 이벤트 수신
     */
    private fun observeWebSocketEvents() {
        viewModelScope.launch {
            ecoPointRepository.observeCloudEvents().collect { event ->
                when (event) {
                    is WebSocketEvent.Connected -> {
                        _uiState.update { it.copy(isConnected = true) }
                    }
                    
                    is WebSocketEvent.EventReceived -> {
                        handleCloudEvent(event.event)
                    }
                    
                    is WebSocketEvent.Disconnected -> {
                        _uiState.update { it.copy(isConnected = false) }
                    }
                    
                    is WebSocketEvent.Error -> {
                        _uiState.update { it.copy(errorMessage = event.message) }
                    }
                }
            }
        }
    }
    
    /**
     * 클라우드 이벤트 처리
     */
    private fun handleCloudEvent(event: CloudEvent) {
        viewModelScope.launch {
            when (event.eventType) {
                Constants.EventType.ECONOMIC_SPEED -> {
                    // 경제속도 준수 - 포인트 적립
                    val points = event.data.points ?: 0
                    _uiState.update {
                        it.copy(
                            ecoPoints = it.ecoPoints + points,
                            showPointsPopup = true,
                            pointsEarned = points,
                            pointsDescription = event.data.description ?: "경제속도 준수",
                            showWateringAnimation = true
                        )
                    }
                    
                    // DB에 내역 추가
                    val entry = PointEntry(
                        type = PointEntryType.EARNED,
                        category = "운전",
                        points = points,
                        description = event.data.description ?: "경제속도 준수",
                        timestamp = Date(),
                        iconColor = "#81C784"
                    )
                    ecoPointRepository.addPointEntry(entry)
                }
                
                Constants.EventType.RAPID_ACCELERATION,
                Constants.EventType.RAPID_DECELERATION -> {
                    // 급가속/급감속 경고 - TTS 또는 다이얼로그
                    // TODO: TTS API 호출 또는 경고 다이얼로그 표시
                }
                
                Constants.EventType.AC_CONTROL_PROPOSAL -> {
                    // A/C 제어 제안 - 다이얼로그 표시
                    _uiState.update {
                        it.copy(
                            showAcProposal = true,
                            acProposal = event.data.acProposal
                        )
                    }
                }
                
                else -> {
                    // 기타 이벤트 처리
                }
            }
        }
    }
    
    /**
     * 날씨 업데이트 관찰 (Short Polling - 10분)
     */
    private fun observeWeatherUpdates() {
        viewModelScope.launch {
            weatherRepository.observeWeatherUpdates().collect { result ->
                when (result) {
                    is WeatherResult.Success -> {
                        _uiState.update {
                            it.copy(
                                weather = result.data,
                                isWeatherCached = false
                            )
                        }
                    }
                    
                    is WeatherResult.CachedData -> {
                        _uiState.update {
                            it.copy(
                                weather = result.data,
                                isWeatherCached = true
                            )
                        }
                    }
                    
                    is WeatherResult.Error -> {
                        // 날씨 오류는 치명적이지 않으므로 무시
                    }
                }
            }
        }
    }
    
    /**
     * 포인트 팝업 닫기
     */
    fun dismissPointsPopup() {
        _uiState.update {
            it.copy(
                showPointsPopup = false,
                showWateringAnimation = false
            )
        }
    }
    
    /**
     * A/C 제어 제안 응답
     */
    fun respondToAcProposal(accepted: Boolean) {
        viewModelScope.launch {
            val response = UserResponse(
                eventId = "ac_control_${System.currentTimeMillis()}",
                responseType = if (accepted) "accept" else "reject"
            )
            ecoPointRepository.sendUserResponse(response)
            
            _uiState.update {
                it.copy(showAcProposal = false, acProposal = null)
            }
        }
    }
    
    override fun onCleared() {
        super.onCleared()
        ecoPointRepository.disconnectWebSocket()
    }
}

/**
 * UI 상태 데이터 클래스
 */
data class MainDashboardUiState(
    val ecoPoints: Int = 1230,
    val dailyPoints: Int = 300,
    val isConnected: Boolean = false,
    val weather: WeatherData? = null,
    val isWeatherCached: Boolean = false,
    val showPointsPopup: Boolean = false,
    val pointsEarned: Int = 0,
    val pointsDescription: String = "",
    val showWateringAnimation: Boolean = false,
    val showAcProposal: Boolean = false,
    val acProposal: AcProposal? = null,
    val errorMessage: String? = null
)
