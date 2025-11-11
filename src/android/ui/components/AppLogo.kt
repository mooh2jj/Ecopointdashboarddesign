package com.katech.ecodrive.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.katech.ecodrive.ui.theme.PrimaryMain
import com.katech.ecodrive.ui.theme.SecondaryMain

/**
 * 앱 로고 컴포넌트
 * - 그라디언트 원형 배경
 * - 새싹 SVG 아이콘
 * - 64dp 크기
 */
@Composable
fun AppLogo(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .size(64.dp)
            .shadow(
                elevation = 16.dp,
                shape = RoundedCornerShape(16.dp),
                ambientColor = PrimaryMain.copy(alpha = 0.4f)
            )
            .background(
                brush = Brush.linearGradient(
                    colors = listOf(PrimaryMain, SecondaryMain)
                ),
                shape = RoundedCornerShape(16.dp)
            ),
        contentAlignment = Alignment.Center
    ) {
        // SVG 새싹 로고
        SproutIcon(modifier = Modifier.size(40.dp))
    }
}

/**
 * 새싹 SVG 아이콘
 * - 원본 SideNav.tsx의 SVG와 동일
 * - Compose Canvas로 구현
 */
@Composable
private fun SproutIcon(modifier: Modifier = Modifier) {
    // TODO: Canvas를 사용하여 SVG Path 그리기
    // 또는 drawable 리소스로 SVG 파일 사용
    // 현재는 플레이스홀더로 Box 표시
    Box(modifier = modifier.background(Color.Transparent))
}
