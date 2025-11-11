# Eco Drive - Android IVI Application

Android 12 IVI(In-Vehicle Infotainment)용 친환경 운전 포인트 적립 및 관리 앱

## 📱 개요

- **플랫폼**: Android 12+ (IVI System)
- **언어**: Kotlin
- **UI 프레임워크**: Jetpack Compose
- **아키텍처**: MVVM (Model-View-ViewModel)
- **해상도**: 1920x720 (활성 영역: 1920x640)

## 🏗️ 프로젝트 구조

```
app/src/main/java/com/katech/ecodrive/
├── MainActivity.kt                    # 앱 진입점
├── navigation/
│   └── NavGraph.kt                    # Compose Navigation
├── ui/
│   ├── splash/                        # 스플래시 화면
│   ├── main/                          # 메인 대시보드
│   ├── points/                        # 포인트 관리
│   ├── analysis/                      # 운전자 분석
│   ├── components/                    # 공통 컴포넌트
│   └── theme/                         # 테마, 색상, 타이포그래피
├── data/
│   ├── model/                         # 데이터 모델
│   ├── local/                         # Room DB + SharedPreferences
│   ├── remote/                        # Retrofit API + WebSocket
│   └── repository/                    # Repository 패턴
└── util/
    └── Constants.kt                   # 상수 정의
```

## 🌐 클라우드 통신 전략

### 1. WebSocket (실시간 이벤트)
- **용도**: 운전 피드백 이벤트 (급가속, 급감속, 경제속도 등)
- **라이브러리**: OkHttp WebSocket
- **구현**: `WebSocketManager.kt`
- **특징**: 
  - Full-Duplex 양방향 통신
  - 저지연 실시간 푸시
  - Flow로 이벤트 스트리밍

### 2. Short Polling (주기적 데이터)
- **용도**: 날씨, 외부 온도 데이터
- **주기**: 10분
- **라이브러리**: Retrofit + Kotlin Coroutines
- **구현**: `WeatherRepository.kt`
- **특징**:
  - `delay()` 함수로 정확한 10분 주기
  - 네트워크 불안정 시 마지막 유효 값 유지
  - ViewModelScope에 바인딩

### 3. HTTP POST/PUT (사용자 응답)
- **용도**: A/C 제어 수락/거절, 포인트 교환
- **라이브러리**: Retrofit
- **구현**: `EcoApiService.kt`

## 💾 로컬 저장소 전략

### 1. SharedPreferences
**용도**: 간단한 설정 및 캐싱
- 마지막 에코 포인트 값
- A/C 제어 수락 여부
- 음성 안내 볼륨 설정
- 마지막 날씨 업데이트 시간

**구현**: `AppPreferences.kt`

### 2. Room Database
**용도**: 구조화된 대량 데이터
- 포인트 내역 로그
- 주행 기록 (주간 캘린더)
- 운전 패턴 분석 데이터
- 리포트 캐싱

**구현**:
- `AppDatabase.kt`: 데이터베이스 정의
- `PointEntryDao.kt`: 포인트 내역 DAO
- `DrivingRecordDao.kt`: 주행 기록 DAO

## 🎨 디자인 시스템

### 색상 팔레트 (다크 테마)
- **Background**: #121212, #1A1A1A, #1E1E1E
- **Primary (Green)**: #81C784, #A5D6A7, #66BB6A
- **Secondary (Blue)**: #64B5F6, #90CAF9, #42A5F5
- **Text**: #FFFFFF (primary), #B0BEC5 (secondary)
- **Accent**: #FFC107 (warning), #EF5350 (error)

### 타이포그래피 (IVI 가이드라인)
- **Extra Large**: 32sp (포인트 팝업)
- **Large Title**: 28sp (화면 제목)
- **Title**: 24sp (섹션 제목)
- **Subtitle**: 20sp (부제목)
- **Body**: 18sp (본문)
- **Body Medium**: 16sp
- **Caption**: 14sp
- **Caption Small**: 12sp

### 터치 타겟
- **최소**: 48dp (IVI 가이드라인)
- **권장**: 88dp (네비게이션 버튼)

## 📦 주요 라이브러리

```kotlin
// Jetpack Compose
androidx.compose.ui:ui
androidx.compose.material3:material3

// Navigation
androidx.navigation:navigation-compose:2.7.5

// ViewModel & Lifecycle
androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2

// Coroutines
org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3

// Room Database
androidx.room:room-ktx:2.6.0

// Retrofit (HTTP)
com.squareup.retrofit2:retrofit:2.9.0

// OkHttp (WebSocket)
com.squareup.okhttp3:okhttp:4.12.0

// Charts
com.github.PhilJay:MPAndroidChart:v3.1.0

// Coil (이미지)
io.coil-kt:coil-compose:2.5.0
```

## 🚀 시작하기

### 1. 환경 설정
```bash
# Android Studio: Hedgehog (2023.1.1) 이상
# Kotlin: 1.9.0
# Gradle: 8.1.0
# Min SDK: 31 (Android 12)
# Target SDK: 34
```

### 2. 서버 URL 설정
`util/Constants.kt`에서 VM 서버 주소 변경:
```kotlin
const val BASE_URL = "http://your-vm-server:8080/"
const val WEBSOCKET_URL = "ws://your-vm-server:8080/ws/events"
```

### 3. 빌드 및 실행
```bash
./gradlew assembleDebug
./gradlew installDebug
```

## 📐 IVI 디스플레이 가이드라인 준수

### A. 해상도 및 레이아웃
- ✅ 1920x720 해상도
- ✅ 상단 80px Safe Zone
- ✅ 활성 영역 1920x640
- ✅ 좌측 네비게이션 140px

### B. 실시간 이벤트 피드백
- ✅ WebSocket으로 운전 이벤트 수신
- ✅ Dialog/Snackbar 화면 피드백
- 🔲 TTS API 음성 안내 (TODO)
- ✅ 식물 성장 애니메이션 (게임화)

### C. 데이터 통신 및 신뢰성
- ✅ Repository 패턴으로 데이터 소스 추상화
- ✅ ViewModel은 Repository만 의존
- ✅ 네트워크 불안정 시 마지막 유효 값 유지
- ✅ 에러 상태 명시적 알림

## 🎯 주요 화면

### 1. Splash Screen
- 3초 표시
- 로고 애니메이션
- 로딩 인디케이터

### 2. Main Dashboard
- 중앙: 식물 성장 애니메이션 (3단계)
- 우측: 피드백 패널 (오늘의 리워드, 적립 내역)
- 상단: 날짜/날씨 정보
- WebSocket 이벤트 실시간 반영

### 3. Point Management
- 탭: 포인트 내역 / 리포트 / 교환
- 통계 카드 (현재 보유, 오늘 적립, 주간 적립)
- 거래 내역 리스트
- 주간 적립 추이 차트

### 4. Driver Analysis
- 피드백 카드 (인라인)
- 주간 캘린더 (64x64px 요일 박스)
- 운전 패턴 분석 바 차트
- 에코 포인트/속도 추이 듀얼 라인 차트

## 📝 구현 상태

### ✅ 완료
- [x] 프로젝트 구조 설계
- [x] 데이터 모델 정의
- [x] Room Database + DAO
- [x] SharedPreferences 래퍼
- [x] WebSocket Manager (Flow 기반)
- [x] Retrofit API Service
- [x] Repository 패턴 구현
- [x] 테마 및 색상 시스템
- [x] Navigation Graph
- [x] Splash Screen
- [x] SideNav Component
- [x] MainDashboardViewModel

### 🔲 TODO
- [ ] MainDashboardScreen Composable (PlantScene, FeedbackSidePanel)
- [ ] PointManagementScreen + ViewModel
- [ ] DriverAnalysisScreen + ViewModel
- [ ] 차트 컴포넌트 (MPAndroidChart 연동)
- [ ] TTS API 연동 (음성 안내)
- [ ] 식물 성장 애니메이션 상세 구현
- [ ] 물뿌리개 애니메이션
- [ ] A/C 제어 제안 다이얼로그
- [ ] 단위 테스트 작성
- [ ] UI 테스트 작성

## 🔧 개발 팁

### ViewModel 생성
```kotlin
// Manual DI 예시
val apiService = EcoApiService.create()
val database = AppDatabase.getDatabase(context)
val prefs = AppPreferences(context)
val webSocketManager = WebSocketManager()

val ecoPointRepo = EcoPointRepository(
    apiService, webSocketManager, 
    database.pointEntryDao(), prefs
)

val weatherRepo = WeatherRepository(apiService, prefs)

val viewModel = MainDashboardViewModel(ecoPointRepo, weatherRepo)
```

### WebSocket 이벤트 수신
```kotlin
viewModelScope.launch {
    repository.observeCloudEvents().collect { event ->
        when (event) {
            is WebSocketEvent.EventReceived -> {
                // 이벤트 처리
            }
        }
    }
}
```

### Short Polling
```kotlin
viewModelScope.launch {
    weatherRepository.observeWeatherUpdates().collect { result ->
        when (result) {
            is WeatherResult.Success -> updateUI(result.data)
            is WeatherResult.CachedData -> showCachedData(result.data)
        }
    }
}
```

## 📄 라이선스

Copyright (c) 2025 KATECH

---

**Note**: 이 코드는 React 웹 프로토타입을 기반으로 Android Kotlin/Compose로 변환한 것입니다. 일부 컴포넌트는 구현이 필요하며, 실제 VM 서버 주소와 API 엔드포인트를 설정해야 합니다.
