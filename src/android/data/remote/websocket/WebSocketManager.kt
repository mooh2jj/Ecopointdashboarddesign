package com.katech.ecodrive.data.remote.websocket

import android.util.Log
import com.katech.ecodrive.data.model.CloudEvent
import com.katech.ecodrive.util.Constants
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.serialization.json.Json
import okhttp3.*
import java.util.concurrent.TimeUnit

/**
 * WebSocket 관리자
 * - 실시간 운전 피드백 이벤트 수신
 * - OkHttp WebSocket 사용
 * - Flow로 이벤트 스트림 제공
 */
class WebSocketManager {
    
    private val tag = "WebSocketManager"
    private val client = OkHttpClient.Builder()
        .readTimeout(0, TimeUnit.MILLISECONDS)
        .build()
    
    private var webSocket: WebSocket? = null
    private val json = Json { ignoreUnknownKeys = true }
    
    /**
     * WebSocket 연결 및 이벤트 Flow 반환
     */
    fun connectAndObserve(): Flow<WebSocketEvent> = callbackFlow {
        val listener = object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                Log.d(tag, "WebSocket 연결 성공")
                trySend(WebSocketEvent.Connected)
            }
            
            override fun onMessage(webSocket: WebSocket, text: String) {
                Log.d(tag, "메시지 수신: $text")
                try {
                    val event = json.decodeFromString<CloudEvent>(text)
                    trySend(WebSocketEvent.EventReceived(event))
                } catch (e: Exception) {
                    Log.e(tag, "메시지 파싱 실패", e)
                    trySend(WebSocketEvent.Error("메시지 파싱 실패: ${e.message}"))
                }
            }
            
            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                Log.e(tag, "WebSocket 연결 실패", t)
                trySend(WebSocketEvent.Disconnected("연결 실패: ${t.message}"))
            }
            
            override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                Log.d(tag, "WebSocket 종료: $reason")
                trySend(WebSocketEvent.Disconnected(reason))
            }
        }
        
        val request = Request.Builder()
            .url(Constants.WEBSOCKET_URL)
            .build()
        
        webSocket = client.newWebSocket(request, listener)
        
        awaitClose {
            webSocket?.close(1000, "클라이언트 종료")
            webSocket = null
        }
    }
    
    /**
     * WebSocket 연결 종료
     */
    fun disconnect() {
        webSocket?.close(1000, "사용자 종료")
        webSocket = null
    }
    
    /**
     * 메시지 전송 (필요 시)
     */
    fun sendMessage(message: String) {
        webSocket?.send(message)
    }
}

/**
 * WebSocket 이벤트 sealed class
 */
sealed class WebSocketEvent {
    object Connected : WebSocketEvent()
    data class EventReceived(val event: CloudEvent) : WebSocketEvent()
    data class Disconnected(val reason: String) : WebSocketEvent()
    data class Error(val message: String) : WebSocketEvent()
}
