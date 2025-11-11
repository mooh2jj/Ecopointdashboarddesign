package com.katech.ecodrive.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

/**
 * 에코 포인트 모델
 * Room Entity로도 사용 가능
 */
@Entity(tableName = "eco_points")
data class EcoPoint(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: String,
    val totalPoints: Int,
    val dailyPoints: Int,
    val weeklyPoints: Int,
    val lastUpdated: Date = Date()
)

/**
 * 포인트 내역 모델
 */
@Entity(tableName = "point_entries")
data class PointEntry(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val type: PointEntryType,
    val category: String,
    val points: Int,
    val description: String,
    val timestamp: Date = Date(),
    val iconColor: String
)

enum class PointEntryType {
    EARNED,  // 획득
    SPENT    // 사용
}

/**
 * 포인트 교환 아이템
 */
data class ExchangeItem(
    val id: Long,
    val name: String,
    val pointsRequired: Int,
    val iconName: String,
    val available: Boolean
)
