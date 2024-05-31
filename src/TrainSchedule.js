import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';

class TrainSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: '',
      selectedStation: '',
      selectedDate: new Date(),
      cityStationData: [
        {
          cityName: '서울특별시',
          cityCode: '11',
          stations: [
            { nodeName: '서울역', nodeId: 'NAT010000' },
            { nodeName: '영등포역', nodeId: 'NAT010091' },
            { nodeName: '용산역', nodeId: 'NAT010032' },
            { nodeName: '청량리역', nodeId: 'NAT130126' },
            { nodeName: '상봉역', nodeId: 'NAT020040' },
          ],
        },
        {
          cityName: '부산광역시',
          cityCode: '21',
          stations: [
            { nodeName: '구포역', nodeId: 'NAT014281' },
            { nodeName: '부산역', nodeId: 'NAT014445' },
          ],
        },
        {
          cityName: '대구광역시',
          cityCode: '22',
          stations: [
            { nodeName: '서대구역', nodeId: 'NAT013189' },
            { nodeName: '동대구역', nodeId: 'NAT013271' },
          ],
        },
        {
          cityName: '광주광역시',
          cityCode: '24',
          stations: [{ nodeName: '광주송정역', nodeId: 'NAT031857' }],
        },
        {
          cityName: '대전광역시',
          cityCode: '25',
          stations: [
            { nodeName: '대전역', nodeId: 'NAT011668' },
            { nodeName: '서대전역', nodeId: 'NAT030057' },
          ],
        },
        {
          cityName: '울산광역시',
          cityCode: '26',
          stations: [{ nodeName: '울산역', nodeId: 'NATH13717' }],
        },
        {
          cityName: '경기도',
          cityCode: '31',
          stations: [
            { nodeName: '가남역', nodeId: 'NAT280090' },
            { nodeName: '광명역', nodeId: 'NATH10219' },
            { nodeName: '덕소역', nodeId: 'NAT020178' },
            { nodeName: '부발역', nodeId: 'NAT250428' },
            { nodeName: '수원역', nodeId: 'NAT010415' },
            { nodeName: '양평역', nodeId: 'NAT020524' },
            { nodeName: '신판교역', nodeId: 'NAT250007' },
            { nodeName: '행신역', nodeId: 'NAT110147' },
          ],
        },
        {
          cityName: '강원도',
          cityCode: '32',
          stations: [
            { nodeName: '강릉역', nodeId: 'NAT601936' },
            { nodeName: '동해역', nodeId: 'NAT601485' },
            { nodeName: '둔내역', nodeId: 'NATN10428' },
            { nodeName: '만종역', nodeId: 'NAT021033' },
            { nodeName: '묵호역', nodeId: 'NAT601545' },
            { nodeName: '서원주역', nodeId: 'NAT020864' },
            { nodeName: '원주역', nodeId: 'NAT020947' },
            { nodeName: '정동진역', nodeId: 'NAT601774' },
            { nodeName: '진부(오대산)역', nodeId: 'NATN10787' },
            { nodeName: '평창역', nodeId: 'NATN10625' },
            { nodeName: '횡성역', nodeId: 'NATN10230' },
          ],
        },
        {
          cityName: '충청북도',
          cityCode: '33',
          stations: [
            { nodeName: '감곡장호원역', nodeId: 'NAT280212' },
            { nodeName: '단양역', nodeId: 'NAT021784' },
            { nodeName: '양성온천역', nodeId: 'NAT280358' },
            { nodeName: '오송역', nodeId: 'NAT050044' },
            { nodeName: '제천역', nodeId: 'NAT021549' },
            { nodeName: '충주역', nodeId: 'NAT050827' },
          ],
        },
        {
          cityName: '충청남도',
          cityCode: '34',
          stations: [
            { nodeName: '공주역', nodeId: 'NATH20438' },
            { nodeName: '계룡역', nodeId: 'NAT030254' },
            { nodeName: '논산역', nodeId: 'NAT030508' },
            { nodeName: '천안아산역', nodeId: 'NATH10960' },
          ],
        },
        {
          cityName: '전라북도',
          cityCode: '35',
          stations: [
            { nodeName: '남원역', nodeId: 'NAT040868' },
            { nodeName: '익산역', nodeId: 'NAT030879' },
            { nodeName: '전주역', nodeId: 'NAT040257' },
            { nodeName: '정읍역', nodeId: 'NAT031314' },
          ],
        },
        {
          cityName: '전라남도',
          cityCode: '36',
          stations: [
            { nodeName: '곡성역', nodeId: 'NAT041072' },
            { nodeName: '구례구역', nodeId: 'NAT041285' },
            { nodeName: '나주역', nodeId: 'NAT031998' },
            { nodeName: '목포역', nodeId: 'NAT032563' },
            { nodeName: '순천역', nodeId: 'NAT041595' },
            { nodeName: '여수엑스포역', nodeId: 'NAT041993' },
            { nodeName: '여천역', nodeId: 'NAT041866' },
          ],
        },
        {
          cityName: '경상북도',
          cityCode: '37',
          stations: [
            { nodeName: '경주역', nodeId: 'NATH13421' },
            { nodeName: '김천구미역', nodeId: 'NATH12383' },
            { nodeName: '안동역', nodeId: 'NAT022558' },
            { nodeName: '영주역', nodeId: 'NAT022188' },
            { nodeName: '포항역', nodeId: 'NAT8B0351' },
            { nodeName: '풍기역', nodeId: 'NAT022053' },
          ],
        },
        {
          cityName: '경상남도',
          cityCode: '38',
          stations: [
            { nodeName: '마산역', nodeId: 'NAT880345' },
            { nodeName: '밀양역', nodeId: 'NAT013841' },
            { nodeName: '진영역', nodeId: 'NAT880177' },
            { nodeName: '진주역', nodeId: 'NAT881014' },
            { nodeName: '창원역', nodeId: 'NAT880310' },
            { nodeName: '창원중앙역', nodeId: 'NAT880281' },
          ],
        },
      ],
      showDatePicker: false,
      trainInfo: null,
    };
  }

  handleCityChange = (city) => {
    this.setState({ selectedCity: city, selectedStation: '' });
  };

  handleStationChange = (station) => {
    this.setState({ selectedStation: station });
  };

  handleDateChange = (event, selectedDate) => {
    this.setState({ selectedDate: selectedDate, showDatePicker: false }, () => {
      const apiUrl = this.generateAPIUrl();
    });
  };

  getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return year + month + day + hours + minutes + seconds;
  };

  generateAPIUrl = () => {
    const { selectedCity, selectedStation, selectedDate } = this.state;
    if (!selectedCity || !selectedStation || !selectedDate) {
      console.error('도시, 기차역, 날짜를 선택해주세요.');
      return;
    }

    // API 요청에 필요한 기본 URL과 인증 키
    const baseUrl =
      'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=lg684aDIcnOKaJWsrwOKHl%2BMIrtxenNFx1Elb6Y36W5ZgBmw%2FJIFrJZDaT23%2F3d8JmnYmZPtwxVIl8eq2aNl9w%3D%3D&';

    // API 요청에 필요한 파라미터
    const params = new URLSearchParams({
      depPlaceId: 'NATH10960',
      arrPlaceId: selectedStation,
      depPlandTime: selectedDate.toISOString().slice(0, 10).replace(/-/g, ''),
      trainGradeCode: '00', // 기본 값
      numOfRows: '100', // 기본 값
      pageNo: '1', // 기본 값
      _type: 'json', // JSON 형식으로 변경
    });

    // 완성된 API 주소 반환
    return `${baseUrl}${params.toString()}`;
  };

  fetchTrainInfo = async () => {
    const currentTime = this.getCurrentTime();
    const apiUrl = this.generateAPIUrl();
    try {
      const response = await fetch(apiUrl);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('올바른 응답 형식이 아닙니다.');
        return;
      }

      const data = await response.json();

      const items = data?.response?.body?.items?.item;
      if (!items) {
        Alert.alert('알림', '더 이상 기차가 없습니다.');
        return;
      }

      const trainInfo = items
        .filter((item) => new Date(item.depplandtime) > currentTime)
        .map((item) => ({
          depPlace: item.depplacename,
          depPlandTime: this.formatDateTime(item.depplandtime),
          arrPlace: item.arrplacename,
          arrPlandTime: this.formatDateTime(item.arrplandtime),
          fare: item.adultcharge,
        }));

      console.log('API 호출 결과:', trainInfo);
      this.setState({ trainInfo: trainInfo });
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      Alert.alert(
        '에러',
        `데이터를 불러오는 중 오류가 발생했습니다:${
          error.message
        }\n상세 정보: ${JSON.stringify(error)}`
      );
    }
  };

  formatDateTime = (dateTimeString) => {
    dateTimeString = String(dateTimeString); // 문자열로 변환
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hours = dateTimeString.slice(8, 10);
    const minutes = dateTimeString.slice(10, 12);
    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  render() {
    const {
      cityStationData,
      selectedCity,
      selectedStation,
      selectedDate,
      showDatePicker,
      trainInfo,
    } = this.state;
    const selectedCityData = cityStationData.find(
      (city) => city.cityName === selectedCity
    );

    // 검색 버튼을 눌렀을 때 결과 목록을 보여줄지 여부를 결정하는 변수
    const showResults = trainInfo && trainInfo.length > 0;

    return (
      <View style={styles.container}>
        {/* 검색 조건 입력 */}
        {!showResults && (
          <>
            <Text style={styles.text}>출발역: 천안아산역</Text>
            <View style={styles.PickerContainer}>
              <Picker
                style={styles.input}
                selectedValue={selectedCity}
                onValueChange={this.handleCityChange}
              >
                <Picker.Item label="도착 도시 선택" value="" />
                {cityStationData.map((city, index) => (
                  <Picker.Item
                    key={index}
                    label={city.cityName}
                    value={city.cityName}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.PickerContainer}>
              {selectedCityData && (
                <Picker
                  style={styles.input}
                  selectedValue={selectedStation}
                  onValueChange={this.handleStationChange}
                >
                  <Picker.Item label="도착 기차역 선택" value="" />
                  {selectedCityData.stations.map((station, index) => (
                    <Picker.Item
                      key={index}
                      label={station.nodeName}
                      value={station.nodeId}
                    />
                  ))}
                </Picker>
              )}
            </View>
            <View style={styles.dateContainer}>
              <Button
                title="출발 날짜 선택"
                onPress={() => this.setState({ showDatePicker: true })}
                style={styles.dateButton}
              />
              {showDatePicker && (
                <DateTimePicker
                  testID="datePicker"
                  value={selectedDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={this.handleDateChange}
                />
              )}
            </View>
            <Button
              title="검색"
              onPress={this.fetchTrainInfo}
              style={styles.searchButton}
            />
          </>
        )}
        {/* 결과 목록 출력 */}
        {showResults && (
          <ScrollView style={styles.scrollContainer}>
            {trainInfo.map((info, index) => (
              <View key={index} style={styles.trainItem}>
                <Text>출발역: {info.depPlace}</Text>
                <Text>출발시각: {info.depPlandTime}</Text>
                <Text>도착역: {info.arrPlace}</Text>
                <Text>도착시각: {info.arrPlandTime}</Text>
                <Text>운임: {info.fare}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchButton: {
    marginBottom: 10,
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  dateButton: {
    marginBottom: 10,
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  PickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    width: 250,
    marginTop: 20,
    maxHeight: 500, // Adjust the height as needed
  },
  trainItem: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});

export default TrainSchedule;
