//Expo의 AndroidManifest.xml 파일을 수정할 수 있는 플러그인을 가져옵니다.
const { withAndroidManifest } = require('@expo/config-plugins');

const LOCATION_SERVICE_NAME = 'com.hyeonu.myapp.LocationForegroundService';

//이 모듈이 Expo 설정을 수정하도록 정의
module.exports = function (config) {
  //AndroidManifest.xml 파일을 수정하는 함수를 호출
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;

    // 만약 androidManifest에 서비스라는 섹션이 없으면, 빈 배열로 초기화
    if (!androidManifest.manifest.application[0].service) {
      androidManifest.manifest.application[0].service = [];
    }

    // AndroidManifest.xml에 foreground 서비스 추가
    androidManifest.manifest.application[0].service.push({
      $: {
        'android:name': LOCATION_SERVICE_NAME,
        'android:foregroundServiceType': 'location',
      },
    });

    return config;
  });
};
