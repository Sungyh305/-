import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { CityStationData } from './CityStationData';

class TrainSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: '',
      selectedStation: '',
      selectedDepCity: '',
      selectedDate: new Date(),
      showDatePicker: false,
      trainInfo: null,
      loading: false,
      cityStationData: [],
    };

    this.cityStationData = new CityStationData(); // 인스턴스 생성
  }

  handleCityChange = (city) => {
    this.setState({ selectedCity: city, selectedStation: '' });
  };

  handleDepCityChange = (city) => {
    this.setState({ selectedDepCity: city, selectedCity: '', selectedStation: '' }, () => {
      if (city === 'NATH10960') {
        this.setState({ cityStationData: this.cityStationData.getKtx() });
      } else if (city === 'NAT010971') {
        this.setState({ cityStationData: this.cityStationData.getTrain() });
      }
    });
  };

  handleStationChange = (station) => {
    this.setState({ selectedStation: station });
  };

  handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      this.setState({ selectedDate: selectedDate, showDatePicker: false });
    } else {
      this.setState({ showDatePicker: false });
    }
  };

  getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return year + month + day + hours + minutes + seconds;
  };

  generateAPIUrl = () => {
    const { selectedDepCity, selectedCity, selectedStation, selectedDate } = this.state;
    if (!selectedCity || !selectedStation || !selectedDate) {
      console.error("도시, 기차역, 날짜를 선택해주세요.");
      return;
    }

    const baseUrl = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=lg684aDIcnOKaJWsrwOKHl%2BMIrtxenNFx1Elb6Y36W5ZgBmw%2FJIFrJZDaT23%2F3d8JmnYmZPtwxVIl8eq2aNl9w%3D%3D&';

    const params = new URLSearchParams({
      depPlaceId: selectedDepCity,
      arrPlaceId: selectedStation,
      depPlandTime: selectedDate.toISOString().slice(0, 10).replace(/-/g, ''),
      numOfRows: '100',
      pageNo: '1',
      _type: 'json'
    });

    return `${baseUrl}${params.toString()}`;
  };

  fetchTrainInfo = async () => {
    this.setState({ loading: true });
    const currentTime = this.getCurrentTime();
    const apiUrl = this.generateAPIUrl();
    try {
      const response = await fetch(apiUrl);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('올바른 응답 형식이 아닙니다.');
        this.setState({ loading: false });
        return;
      }

      const data = await response.json();
      const items = data?.response?.body?.items?.item;
      if (!items) {
        console.error('조회 결과가 없습니다.');
        this.setState({ loading: false });
        return;
      }

      const trainInfo = items
        .filter(item => new Date(item.depplandtime) > currentTime)
        .map(item => ({
          depPlace: item.depplacename,
          depPlandTime: this.formatDateTime(item.depplandtime),
          arrPlace: item.arrplacename,
          arrPlandTime: this.formatDateTime(item.arrplandtime),
          fare: item.adultcharge,
          trainName: item.traingradename,
          trainNo: item.trainno
        }));

      console.log('API 호출 결과:', trainInfo);
      this.setState({ trainInfo: trainInfo, loading: false });
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      this.setState({ loading: false });
    }
  };

  formatDateTime = (dateTimeString) => {
    dateTimeString = String(dateTimeString); 
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hours = dateTimeString.slice(8, 10);
    const minutes = dateTimeString.slice(10, 12);
    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  render() {
    const { selectedDepCity, selectedCity, selectedStation, selectedDate, showDatePicker, trainInfo, loading, cityStationData } = this.state;

    const showResults = trainInfo && trainInfo.length > 0;

    return (
      <View style={styles.container}>
        <Text
        style={styles.text}>

        </Text>
        <View style={styles.PickerContainer}>
        <Picker
          style={styles.input}
          selectedValue={selectedDepCity}
          onValueChange={this.handleDepCityChange}>
          <Picker.Item label="출발 도시" value="" />
          <Picker.Item label="천안아산역" value="NATH10960" />
          <Picker.Item label="천안역" value="NAT010971" />
        </Picker>
        </View>
        <View style={styles.PickerContainer}>
        {selectedDepCity ? (
          <Picker
            style={styles.input}
            selectedValue={selectedCity}
            onValueChange={this.handleCityChange}>
            <Picker.Item label="도착 도시" value="" />
            {cityStationData.map((city, index) => (
              <Picker.Item key={index} label={city.cityName} value={city.cityName} />
            ))}
          </Picker>
          ) : (
            <Picker
            style={styles.input}
            selectedValue={selectedCity}
            onValueChange={this.handleCityChange}>
            <Picker.Item label="도착 도시" value="" />
            </Picker>
          )
          }
          {selectedCity ? (
            <Picker
              style={styles.input}
              selectedValue={selectedStation}
              onValueChange={this.handleStationChange}>
              <Picker.Item label="도착 기차역" value="" />
              {cityStationData.find(city => city.cityName === selectedCity).stations.map((station, index) => (
                <Picker.Item key={index} label={station.nodeName} value={station.nodeId} />
              ))}
            </Picker>
          ) : (
            <Picker
            style={styles.input}
            selectedValue={selectedCity}
            onValueChange={this.handleCityChange}>
            <Picker.Item label="도착 기차역" value="" />
            </Picker>
          )
          }
        </View>
        <View style={styles.ButtonContainer}>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
            <View style={styles.Button}>
              <Text style={styles.text}>출발 날짜 선택</Text>
            </View>
          </TouchableOpacity>
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
        </View >
        <TouchableOpacity onPress={this.fetchTrainInfo}>
          <View style={styles.SearchButton}>
            <Text style={styles.text}>검색</Text>
          </View>
        </TouchableOpacity>
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>시간표 검색 중...</Text>
          </View>
        )}
        {showResults && (
          <ScrollView style={styles.scrollContainer}>
            {trainInfo.map((info, index) => (
              <View key={index} style={styles.trainItem}>
                <Text>출발역: {info.depPlace} {(info.trainName)}</Text>
                <Text>출발시각: {info.depPlandTime}</Text>
                <Text>도착역: {info.arrPlace}</Text>
                <Text>도착시각: {info.arrPlandTime}</Text>
                <Text>운임: {info.fare} 기차번호: {info.trainNo}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Button: {
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: 7,
    borderRadius: 5,
    borderColor : 'gray',
  },
  SearchButton: {
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: 7,
    borderRadius: 5,
    borderColor : 'gray',
    width: 100,
    marginLeft: 10
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'top'
  },
  PickerContainer: {
    width: '90%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center'
  },
  input: {
    height: 40,
    flex: 1,
  },
  dateContainer: {
    
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  trainItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrainSchedule;

