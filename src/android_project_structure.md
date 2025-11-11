# Eco Drive Android Project Structure

```
app/src/main/java/com/katech/ecodrive/
├── MainActivity.kt                          # 앱 진입점
├── EcoDriveApplication.kt                   # Application 클래스
│
├── navigation/
│   └── NavGraph.kt                          # Compose Navigation 설정
│
├── ui/
│   ├── splash/
│   │   ├── SplashScreen.kt                  # 스플래시 화면 Composable
│   │   └── SplashViewModel.kt               # 스플래시 ViewModel
│   │
│   ├── main/
│   │   ├── MainDashboardScreen.kt           # 메인 대시보드 화면
│   │   ├── MainDashboardViewModel.kt        # 메인 대시보드 ViewModel
│   │   └── components/
│   │       ├── PlantScene.kt                # 식물 성장 애니메이션
│   │       ├── FeedbackSidePanel.kt         # 우측 피드백 패널
│   │       └── PointsEarnedPopup.kt         # 포인트 획득 팝업
│   │
│   ├── points/
│   │   ├── PointManagementScreen.kt         # 포인트 관리 화면
│   │   ├── PointManagementViewModel.kt      # 포인트 관리 ViewModel
│   │   └── components/
│   │       ├── HistoryTab.kt                # 포인트 내역 탭
│   │       ├── ReportTab.kt                 # 리포트 탭
│   │       └── ExchangeTab.kt               # 교환 탭
│   │
│   ├── analysis/
│   │   ├── DriverAnalysisScreen.kt          # 운전자 분석 화면
│   │   ├── DriverAnalysisViewModel.kt       # 운전자 분석 ViewModel
│   │   └── components/
│   │       ├── WeeklyCalendar.kt            # 주간 캘린더
│   │       ├── PatternChart.kt              # 패턴 분석 차트
│   │       └── TrendChart.kt                # 추이 차트
│   │
│   ├── components/
│   │   ├── SideNav.kt                       # 좌측 네비게이션
│   │   └── AppLogo.kt                       # 앱 로고 SVG
│   │
│   └── theme/
│       ├── Color.kt                         # 색상 정의
│       ├── Theme.kt                         # 테마 설정
│       └── Type.kt                          # 타이포그래피
│
├── data/
│   ├── model/
│   │   ├── EcoPoint.kt                      # 에코 포인트 모델
│   │   ├── PointEntry.kt                    # 포인트 내역 모델
│   │   ├── DrivingPattern.kt                # 운전 패턴 모델
│   │   ├── DrivingRecord.kt                 # 주행 기록 모델
│   │   └── CloudEvent.kt                    # 클라우드 이벤트 모델
│   │
│   ├── local/
│   │   ├── AppDatabase.kt                   # Room Database
│   │   ├── dao/
│   │   │   ├── PointEntryDao.kt            # 포인트 내역 DAO
│   │   │   └── DrivingRecordDao.kt         # 주행 기록 DAO
│   │   └── prefs/
│   │       └── AppPreferences.kt            # SharedPreferences 래퍼
│   │
│   ├── remote/
│   │   ├── api/
│   │   │   └── EcoApiService.kt             # Retrofit API 서비스
│   │   └── websocket/
│   │       ├── WebSocketManager.kt          # WebSocket 관리자
│   │       └── WebSocketEvent.kt            # WebSocket 이벤트 모델
│   │
│   └── repository/
│       ├── EcoPointRepository.kt            # 포인트 Repository
│       ├── DrivingDataRepository.kt         # 주행 데이터 Repository
│       └── WeatherRepository.kt             # 날씨 Repository (Polling)
│
└── util/
    ├── Constants.kt                         # 상수 정의
    ├── DateUtils.kt                         # 날짜 유틸리티
    └── NetworkUtils.kt                      # 네트워크 유틸리티

app/src/main/res/
├── values/
│   ├── colors.xml                           # 색상 리소스
│   ├── strings.xml                          # 문자열 리소스
│   └── dimens.xml                           # 크기 리소스
└── drawable/
    ├── seed_image.png                       # 씨앗 이미지
    ├── sprout_image.png                     # 새싹 이미지
    ├── plant_image.png                      # 다육식물 이미지
    └── watering_can.png                     # 물뿌리개 이미지

build.gradle.kts (Module: app)
- Jetpack Compose 의존성
- Room, Retrofit, OkHttp, Kotlin Coroutines
- Navigation Compose
- Accompanist (System UI Controller 등)
```

## 주요 기술 스택

- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM
- **DI**: Manual DI (또는 Hilt/Koin 선택 가능)
- **Local DB**: Room
- **Network**: Retrofit (HTTP), OkHttp (WebSocket)
- **Async**: Kotlin Coroutines + Flow
- **Navigation**: Compose Navigation
- **Charts**: MPAndroidChart 또는 Vico

## 화면 해상도

- **전체**: 1920x720px
- **상단 바**: 80px (Safe Zone)
- **활성 영역**: 1920x640px
- **좌측 네비게이션**: 140px

## 통신 전략

1. **WebSocket**: 실시간 운전 피드백 이벤트 (급가속, 급감속 등)
2. **Short Polling (10분)**: 날씨, 온도 데이터
3. **HTTP POST/PUT**: 사용자 응답 전송 (포인트 교환 등)

## 로컬 저장소

1. **SharedPreferences**: 앱 설정, 마지막 포인트 값 캐싱
2. **Room Database**: 이벤트 로그, 주행 기록, 리포트 캐싱
