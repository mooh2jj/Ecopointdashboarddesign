package com.katech.ecodrive.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.katech.ecodrive.ui.theme.*
import com.katech.ecodrive.util.Constants

/**
 * 좌측 사이드 네비게이션
 * - 140px 너비
 * - 로고 + 3개 메뉴 아이템
 * - IVI 터치 타겟: 88x88dp 이상
 */
@Composable
fun SideNav(
    navController: NavHostController,
    currentRoute: String,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .width(140.dp)
            .fillMaxHeight()
            .background(BackgroundTertiary)
            .shadow(elevation = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        Spacer(modifier = Modifier.height(32.dp))
        
        // 로고
        AppLogo(modifier = Modifier.size(64.dp))
        
        Spacer(modifier = Modifier.height(48.dp))
        
        // 네비게이션 아이템들
        val navItems = listOf(
            NavItem("메인 화면", Constants.Routes.MAIN_DASHBOARD, Icons.Default.Home),
            NavItem("포인트 관리", Constants.Routes.POINT_MANAGEMENT, Icons.Default.Home),
            NavItem("운전자 분석", Constants.Routes.DRIVER_ANALYSIS, Icons.Default.Home)
        )
        
        navItems.forEach { item ->
            NavButton(
                label = item.label,
                icon = item.icon,
                isActive = currentRoute == item.route,
                onClick = {
                    navController.navigate(item.route) {
                        popUpTo(Constants.Routes.MAIN_DASHBOARD) { inclusive = false }
                        launchSingleTop = true
                    }
                }
            )
            Spacer(modifier = Modifier.height(12.dp))
        }
    }
}

@Composable
private fun NavButton(
    label: String,
    icon: ImageVector,
    isActive: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val backgroundColor = if (isActive) SecondaryMain.copy(alpha = 0.2f) else Color.Transparent
    val iconColor = if (isActive) SecondaryMain else PrimaryMain
    val textColor = if (isActive) TextPrimary else TextSecondary
    
    Column(
        modifier = modifier
            .size(88.dp) // IVI 최소 터치 타겟
            .clickable(onClick = onClick)
            .background(
                color = backgroundColor,
                shape = RoundedCornerShape(12.dp)
            )
            .padding(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = iconColor,
            modifier = Modifier.size(28.dp)
        )
        
        Spacer(modifier = Modifier.height(4.dp))
        
        Text(
            text = label,
            fontSize = 14.sp,
            color = textColor,
            textAlign = TextAlign.Center,
            lineHeight = 16.sp
        )
    }
}

private data class NavItem(
    val label: String,
    val route: String,
    val icon: ImageVector
)
