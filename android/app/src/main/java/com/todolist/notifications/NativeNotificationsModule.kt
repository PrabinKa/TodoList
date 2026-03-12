package com.todolist.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.todolist.NativeNotificationsSpec
import java.util.*

@ReactModule(name = NativeNotificationsModule.NAME)
class NativeNotificationsModule(
    private val reactContext: ReactApplicationContext
) : NativeNotificationsSpec(reactContext), TurboModule {

    companion object {
        const val NAME = "NativeNotifications"
        const val CHANNEL_ID = "todo_reminder_channel"
    }

    private fun getNotificationManager(): NotificationManager {
        return reactContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    }

    private fun createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Todo Reminders",
                NotificationManager.IMPORTANCE_HIGH
            )
            getNotificationManager().createNotificationChannel(channel)
        }
    }

    override fun scheduleNotification(id: String, title: String, body: String, timestamp: Double) {
        createChannel()

        val notificationIntent = Intent(reactContext, reactContext::class.java)
        val pendingIntent = PendingIntent.getActivity(
            reactContext,
            id.hashCode(),
            notificationIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(reactContext, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(body)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()

        // Schedule using AlarmManager
        val alarmManager = reactContext.getSystemService(Context.ALARM_SERVICE) as android.app.AlarmManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (!alarmManager.canScheduleExactAlarms()) {
                val intent = Intent(android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                reactContext.startActivity(intent)
            return
            }
        }

        val triggerTime = timestamp.toLong()
        val intent = Intent(reactContext, NotificationReceiver::class.java)
        intent.putExtra("title", title)
        intent.putExtra("body", body)
        val alarmIntent = PendingIntent.getBroadcast(
            reactContext,
            id.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        alarmManager.setExactAndAllowWhileIdle(android.app.AlarmManager.RTC_WAKEUP, triggerTime, alarmIntent)
    }

    override fun cancelNotification(id: String) {
        val alarmManager = reactContext.getSystemService(Context.ALARM_SERVICE) as android.app.AlarmManager
        val intent = Intent(reactContext, NotificationReceiver::class.java)
        val pendingIntent = PendingIntent.getBroadcast(
            reactContext,
            id.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        alarmManager.cancel(pendingIntent)
    }

    override fun initialize() {}

    override fun invalidate() {}
}