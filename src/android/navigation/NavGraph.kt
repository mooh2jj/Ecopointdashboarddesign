package com.katech.ecodrive.navigation

import androidx.compose.runtime.*
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.katech.ecodrive.ui.analysis.DriverAnalysisScreen
import com.katech.ecodrive.ui.main.MainDashboardScreen
import com.katech.ecodrive.ui.points.PointManagementScreen
import com.katech.ecodrive.ui.splash.SplashScreen
import com.katech.ecodrive.util.Constants

/**
 * Navigation Graph
 * - Splash → MainDashboard → PointManagement / DriverAnalysis
 */
@Composable
fun NavGraph(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Constants.Routes.SPLASH
    ) {
        // 스플래시 화면
        composable(Constants.Routes.SPLASH) {
            SplashScreen(
                onNavigateToMain = {
                    navController.navigate(Constants.Routes.MAIN_DASHBOARD) {
                        popUpTo(Constants.Routes.SPLASH) { inclusive = true }
                    }
                }
            )
        }
        
        // 메인 대시보드
        composable(Constants.Routes.MAIN_DASHBOARD) {
            MainDashboardScreen(navController = navController)
        }
        
        // 포인트 관리
        composable(Constants.Routes.POINT_MANAGEMENT) {
            PointManagementScreen(navController = navController)
        }
        
        // 운전자 분석
        composable(Constants.Routes.DRIVER_ANALYSIS) {
            DriverAnalysisScreen(navController = navController)
        }
    }
}
