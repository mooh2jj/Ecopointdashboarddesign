package com.katech.ecodrive

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.core.view.WindowCompat
import com.katech.ecodrive.navigation.NavGraph
import com.katech.ecodrive.ui.theme.BackgroundPrimary
import com.katech.ecodrive.ui.theme.EcoDriveTheme

/**
 * MainActivity
 * - IVI 디스플레이용 1920x720 해상도
 * - Jetpack Compose 사용
 * - 전체 화면 모드
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 전체 화면 설정 (상태바/네비게이션바 숨김)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        
        setContent {
            EcoDriveTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = BackgroundPrimary
                ) {
                    NavGraph()
                }
            }
        }
    }
}
