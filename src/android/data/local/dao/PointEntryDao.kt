package com.katech.ecodrive.data.local.dao

import androidx.room.*
import com.katech.ecodrive.data.model.PointEntry
import kotlinx.coroutines.flow.Flow

/**
 * PointEntry DAO
 * 포인트 내역 CRUD 작업
 */
@Dao
interface PointEntryDao {
    
    @Query("SELECT * FROM point_entries ORDER BY timestamp DESC")
    fun getAllEntries(): Flow<List<PointEntry>>
    
    @Query("SELECT * FROM point_entries WHERE timestamp >= :startDate ORDER BY timestamp DESC")
    fun getEntriesSince(startDate: java.util.Date): Flow<List<PointEntry>>
    
    @Query("SELECT * FROM point_entries ORDER BY timestamp DESC LIMIT :limit")
    fun getRecentEntries(limit: Int = 10): Flow<List<PointEntry>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEntry(entry: PointEntry)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEntries(entries: List<PointEntry>)
    
    @Query("DELETE FROM point_entries WHERE timestamp < :cutoffDate")
    suspend fun deleteOldEntries(cutoffDate: java.util.Date)
    
    @Query("DELETE FROM point_entries")
    suspend fun deleteAll()
}
