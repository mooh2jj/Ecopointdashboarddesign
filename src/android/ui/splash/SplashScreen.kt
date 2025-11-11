package com.katech.ecodrive.ui.splash

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.katech.ecodrive.ui.components.AppLogo
import com.katech.ecodrive.ui.theme.*
import com.katech.ecodrive.util.Constants
import kotlinx.coroutines.delay

/**
 * 스플래시 화면
 * - 3초 표시
 * - 그라디언트 배경
 * - 로고 + 앱 이름 + 태그라인
 * - 로딩 애니메이션
 */
@Composable
fun SplashScreen(
    onNavigateToMain: () -> Unit
) {
    // 3초 후 메인 화면으로 이동
    LaunchedEffect(Unit) {
        delay(Constants.SPLASH_DURATION)
        onNavigateToMain()
    }
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(BackgroundPrimary, BackgroundTertiary)
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // 로고 (회전 애니메이션)
            val infiniteTransition = rememberInfiniteTransition(label = "logo_rotation")
            val rotation by infiniteTransition.animateFloat(
                initialValue = 0f,
                targetValue = 360f,
                animationSpec = infiniteRepeatable(
                    animation = tween(3000, easing = LinearEasing),
                    repeatMode = RepeatMode.Restart
                ),
                label = "rotation"
            )
            
            AppLogo(modifier = Modifier.size(140.dp))
            
            Spacer(modifier = Modifier.height(32.dp))
            
            // 앱 이름
            Text(
                text = "Eco Drive",
                fontSize = 32.sp,
                color = PrimaryMain,
                style = MaterialTheme.typography.displayLarge
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // 태그라인
            Text(
                text = "Drive Smart, Earn Green.",
                fontSize = 20.sp,
                color = SecondaryMain,
                style = MaterialTheme.typography.titleMedium
            )
            
            Spacer(modifier = Modifier.height(64.dp))
            
            // 로딩 점 애니메이션
            LoadingDots()
        }
    }
}

@Composable
private fun LoadingDots() {
    val infiniteTransition = rememberInfiniteTransition(label = "dots")
    
    Row(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        repeat(3) { index ->
            val alpha by infiniteTransition.animateFloat(
                initialValue = 0.3f,
                targetValue = 1f,
                animationSpec = infiniteRepeatable(
                    animation = tween(600, easing = FastOutSlowInEasing),
                    repeatMode = RepeatMode.Reverse,
                    initialStartOffset = StartOffset(index * 200)
                ),
                label = "dot_$index"
            )
            
            Box(
                modifier = Modifier
                    .size(12.dp)
                    .background(
                        color = PrimaryMain.copy(alpha = alpha),
                        shape = androidx.compose.foundation.shape.CircleShape
                    )
            )
        }
    }
}
