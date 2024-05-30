package com.hyeonu.myapp;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

// LocationForegroundService라는 프로그램을 만듦
public class LocationForegroundService extends Service {
    private static final String TAG = "LocationFgService";

    @Override
    public void onCreate() {
        super.onCreate();
        // 이 프로그램이 처음 생성될 때 로그를 남김
        Log.d(TAG, "LocationForegroundService created");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // 이 프로그램이 시작할 때 로그를 남김
        Log.d(TAG, "LocationForegroundService started");
        return START_STICKY; // 서비스가 종료되면 다시 시작하도록 설정
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // 이 프로그램이 종료될 때 로그를 남김
        Log.d(TAG, "LocationForegroundService destroyed");
    }

    @Override
    public IBinder onBind(Intent intent) {
        // 이 프로그램은 바인딩을 지원하지 않음
        return null;
    }
}