import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

class BusSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedTerminal: '',
      selectedDate: new Date(),
      showDatePicker: false,
      TerminalInfo: null,
      BusInfo: null,
      loading: false,
    };
  }

  handleInputChange = (text) => {
    this.setState({ inputValue: text });
  };

  handleTerminalChange = (terminal) => {
    this.setState({ selectedTerminal: terminal });
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

    return `${year}${month}${day}${hours}${minutes}`;
  };

  generateAPIUrl = () => {
    const { selectedTerminal, selectedDate } = this.state;
    if (!selectedTerminal || !selectedDate) {
      console.error("도착터미널, 날짜를 선택해주세요.");
      return null;
    }

    const baseUrl = 'https://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo?serviceKey=lg684aDIcnOKaJWsrwOKHl%2BMIrtxenNFx1Elb6Y36W5ZgBmw%2FJIFrJZDaT23%2F3d8JmnYmZPtwxVIl8eq2aNl9w%3D%3D&';

    const params = new URLSearchParams({
      depTerminalId: 'NAEK310',
      arrTerminalId: selectedTerminal,
      depPlandTime: selectedDate.toISOString().slice(0, 10).replace(/-/g, ''),
      numOfRows: '100',
      pageNo: '1',
      _type: 'json'
    });

    return `${baseUrl}${params.toString()}`;
  };

  fetchBusInfo = async () => {
    this.setState({ loading: true });
    const currentTime = this.getCurrentTime();
    const apiUrl = this.generateAPIUrl();
    console.log(apiUrl)
    if (!apiUrl) {
      this.setState({ loading: false });
      return;
    }
    try {
      const response = await fetch(apiUrl);

      const data = await response.json();
      const items = data?.response?.body?.items?.item;
      if (!items) {
        console.error('조회 결과가 없습니다.');
        this.setState({ loading: false });
        return;
      }

      const BusInfo = items
        .filter(item => new Date(item.depPlandTime) > currentTime)
        .map(item => ({
          depPlace: item.depPlaceNm,
          depPlandTime: this.formatDateTime(item.depPlandTime),
          arrPlace: item.arrPlaceNm,
          arrPlandTime: this.formatDateTime(item.arrPlandTime),
          fare: item.charge,
          gradeName: item.gradeNm,
        }));

      console.log('API 호출 결과:', BusInfo);
      this.setState({ BusInfo: BusInfo, loading: false });
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      this.setState({ loading: false });
    }
  };

  terminalUrl = () => {
    const { inputValue } = this.state;
    const baseUrl = 'http://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=lg684aDIcnOKaJWsrwOKHl%2BMIrtxenNFx1Elb6Y36W5ZgBmw%2FJIFrJZDaT23%2F3d8JmnYmZPtwxVIl8eq2aNl9w%3D%3D&';

    const params = new URLSearchParams({
      terminalNm: inputValue,
      numOfRows: '100',
      pageNo: '1',
      _type: 'json'
    });

    return `${baseUrl}${params.toString()}`;
  }

  fetchTerminalInfo = async () => {
    this.setState({ loading: true });
    const apiTUrl = this.terminalUrl();
    try {
      const response = await fetch(apiTUrl);
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

      const TerminalInfo = items.map(item => ({
        terminalId: item.terminalId,
        terminalNm: item.terminalNm,
      }));

      console.log('API 호출 결과:', TerminalInfo);
      this.setState({ TerminalInfo: TerminalInfo, loading: false });
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
    const { selectedTerminal, inputValue, selectedDate, showDatePicker, BusInfo, TerminalInfo, loading } = this.state;

    const showResults = BusInfo && BusInfo.length > 0;

    return (
      <View style={styles.container}>
        <Text style={styles.text}></Text>
        <View style={styles.PickerContainer}>
          <Text style={styles.text}>도착 터미널:</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={this.handleInputChange}
            placeholder="도착 터미널의 이름을 검색 하세요."
          />
          <TouchableOpacity onPress={this.fetchTerminalInfo}>
            <View style={styles.Button}>
              <Text style={styles.label}>터미널 검색</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.PickerContainer}>
          {TerminalInfo ? (
            <Picker
              style={styles.input}
              selectedValue={selectedTerminal}
              onValueChange={this.handleTerminalChange}>
              {TerminalInfo.map((terminal, index) => (
                <Picker.Item key={index} label={terminal.terminalNm} value={terminal.terminalId} />
              ))}
            </Picker>
          ) : (
            <Picker
              style={styles.input}
              selectedValue={selectedTerminal}
              onValueChange={this.handleTerminalChange}>
              <Picker.Item label="도착 터미널" value="" />
              </Picker>
          )
          }
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
              <View style={styles.Button}>
                <Text style={styles.label}>출발 날짜 선택</Text>
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
          </View>
          <TouchableOpacity onPress={this.fetchBusInfo}>
            <View style={styles.Button}>
              <Text style={styles.label}>검색</Text>
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
            {BusInfo.map((info, index) => (
              <View key={index} style={styles.BusItem}>
                <Text>출발터미널: {info.depPlace} </Text>
                <Text>출발시각: {info.depPlandTime}</Text>
                <Text>도착터미널: {info.arrPlace}</Text>
                <Text>도착시각: {info.arrPlandTime}</Text>
                <Text>운임: {info.fare} : {info.gradeName}</Text>
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
    padding: 17,
    borderRadius: 5,
    marginLeft: 1
  },
  ButtonContainer: {
    flexDirection: 'row',
  },
  PickerContainer: {
    width: '90%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    padding: 17,
  },
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center'
  },
  input: {
    height: 55,
    flex: 1,
    padding: 16,
  },
  dateContainer: {
    
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  BusItem: {
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

export default BusSchedule;
