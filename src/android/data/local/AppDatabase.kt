package com.katech.ecodrive.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.katech.ecodrive.data.local.dao.DrivingRecordDao
import com.katech.ecodrive.data.local.dao.PointEntryDao
import com.katech.ecodrive.data.model.DrivingRecord
import com.katech.ecodrive.data.model.PointEntry
import com.katech.ecodrive.util.Constants

/**
 * Room Database 정의
 * - 포인트 내역 캐싱
 * - 주행 기록 저장
 * - 리포트 데이터 로컬 저장
 */
@Database(
    entities = [
        PointEntry::class,
        DrivingRecord::class
    ],
    version = Constants.Database.VERSION,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun pointEntryDao(): PointEntryDao
    abstract fun drivingRecordDao(): DrivingRecordDao
    
    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    Constants.Database.NAME
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}

/**
 * Room TypeConverter
 * Date, Enum 등을 DB에 저장 가능한 형태로 변환
 */
class Converters {
    @androidx.room.TypeConverter
    fun fromTimestamp(value: Long?): java.util.Date? {
        return value?.let { java.util.Date(it) }
    }
    
    @androidx.room.TypeConverter
    fun dateToTimestamp(date: java.util.Date?): Long? {
        return date?.time
    }
    
    @androidx.room.TypeConverter
    fun fromPointEntryType(value: com.katech.ecodrive.data.model.PointEntryType): String {
        return value.name
    }
    
    @androidx.room.TypeConverter
    fun toPointEntryType(value: String): com.katech.ecodrive.data.model.PointEntryType {
        return com.katech.ecodrive.data.model.PointEntryType.valueOf(value)
    }
}
