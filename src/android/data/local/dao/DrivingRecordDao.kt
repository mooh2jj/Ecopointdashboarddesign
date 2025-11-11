package com.katech.ecodrive.data.local.dao

import androidx.room.*
import com.katech.ecodrive.data.model.DrivingRecord
import kotlinx.coroutines.flow.Flow

/**
 * DrivingRecord DAO
 * 주행 기록 CRUD 작업
 */
@Dao
interface DrivingRecordDao {
    
    @Query("SELECT * FROM driving_records ORDER BY date DESC")
    fun getAllRecords(): Flow<List<DrivingRecord>>
    
    @Query("SELECT * FROM driving_records WHERE date >= :startDate AND date <= :endDate ORDER BY date ASC")
    fun getRecordsInRange(startDate: String, endDate: String): Flow<List<DrivingRecord>>
    
    @Query("SELECT * FROM driving_records WHERE date = :date")
    suspend fun getRecordByDate(date: String): DrivingRecord?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecord(record: DrivingRecord)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecords(records: List<DrivingRecord>)
    
    @Query("DELETE FROM driving_records WHERE date < :cutoffDate")
    suspend fun deleteOldRecords(cutoffDate: String)
    
    @Query("DELETE FROM driving_records")
    suspend fun deleteAll()
}
