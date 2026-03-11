package com.todolist

import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.HapticFeedbackConstants
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class NativeHapticsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NativeHaptics"

private fun getVibrator(): Vibrator? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        val vibratorManager =
            reactApplicationContext.getSystemService(VibratorManager::class.java)
        vibratorManager?.defaultVibrator
    } else {
        @Suppress("DEPRECATION")
        reactApplicationContext.getSystemService(Vibrator::class.java)
    }
}

    @ReactMethod
    fun impact(style: String) {
        val vibrator = getVibrator()
        try {
            val effect = when (style) {
                "light" -> VibrationEffect.createOneShot(10, 50)
                "medium" -> VibrationEffect.createOneShot(20, 150)
                "heavy" -> VibrationEffect.createOneShot(30, 255)
                "soft" -> VibrationEffect.createOneShot(10, 30)
                "rigid" -> VibrationEffect.createOneShot(30, 255)
                else -> VibrationEffect.createOneShot(20, 150)
            }
            vibrator?.vibrate(effect)
        } catch (e: Exception) {
            // Fallback to legacy vibration
            @Suppress("DEPRECATION")
            vibrator?.vibrate(20)
        }
    }

    @ReactMethod
    fun notification(type: String) {
        val vibrator = getVibrator()
        try {
            val effect = when (type) {
                "success" -> VibrationEffect.createWaveform(longArrayOf(0, 30, 50, 30), -1)
                "warning" -> VibrationEffect.createWaveform(longArrayOf(0, 30, 30, 30), -1)
                "error" -> VibrationEffect.createWaveform(longArrayOf(0, 50, 50, 50), -1)
                else -> VibrationEffect.createOneShot(30, 200)
            }
            vibrator?.vibrate(effect)
        } catch (e: Exception) {
            // Fallback to legacy vibration
            @Suppress("DEPRECATION")
            vibrator?.vibrate(30)
        }
    }

    @ReactMethod
    fun selection() {
        try {
            reactApplicationContext.currentActivity
                ?.window
                ?.decorView
                ?.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP)
        } catch (e: Exception) {
            // Ignore
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for RN event emitter
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required for RN event emitter
    }
}
