import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const ShuttleSchedule = () => {
  const [selectedStation, setSelectedStation] = useState(1); // 초기 선택된 역의 id
  const [showStationList, setShowStationList] = useState(false); // 역 선택 리스트 모달 표시 여부
  const [stations] = useState([
    { id: 1, name: '천안아산역' },
    { id: 2, name: '아산역' },
    // 다른 역 추가
  ]);

  // 역 선택 버튼이 눌렸을 때 실행되는 함수
  const handleStationSelect = () => {
    setShowStationList(true); // 역 선택 리스트 모달 표시
  };

  // 역 선택 리스트에서 역을 선택했을 때 실행되는 함수
  const handleStationChange = (station) => {
    setSelectedStation(station.id); // 선택된 역의 id 업데이트
    setShowStationList(false); // 역 선택 리스트 모달 닫기
  };

  // 시간표 데이터 예시
  const scheduleData = [
    { id: 1, station: '천안아산역', time: '8:10', destination: '아산역', arrivalTime: '8:25', status: '운행 중' },
    { id: 2, station: '아산역', time: '8:20', destination: '천안아산역', arrivalTime: '8:35', status: '운행 중' },
    // 다른 시간표 데이터 추가
  ];

  // 선택된 역의 시간표만 필터링하는 함수
  const filteredScheduleData = scheduleData.filter(item => item.station === stations.find(station => station.id === selectedStation).name);

  // 시간표 아이템 렌더링 함수
  const renderScheduleItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.station}</Text>
      <Text style={styles.cell}>{item.time}</Text>
      <Text style={styles.cell}>{item.destination}</Text>
      <Text style={styles.cell}>{item.arrivalTime}</Text>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 역 선택 버튼 */}
      <TouchableOpacity style={styles.stationSelectButton} onPress={handleStationSelect}>
        <Text style={styles.stationSelectButtonText}>{stations.find(station => station.id === selectedStation).name}</Text>
      </TouchableOpacity>

      {/* 셔틀 시간표 헤더 */}
      <View style={[styles.row, { marginTop: 30 }]}>
        <Text style={styles.cellHeader}>출발지</Text>
        <Text style={styles.cellHeader}></Text>
        <Text style={styles.cellHeader}>도착 및 출발</Text>
        <Text style={styles.cellHeader}></Text>
        <Text style={styles.cellHeader}>운행 여부</Text>
      </View>

      {/* 시간표 목록 */}
      <FlatList
        data={filteredScheduleData}
        renderItem={renderScheduleItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scheduleList}
      />

      {/* 역 선택 리스트 모달 */}
      <Modal visible={showStationList} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={stations}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.stationListItem} onPress={() => handleStationChange(item)}>
                  <Text style={styles.stationListItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5, // 여백 조정
  },
  cellHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  stationSelectButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 1, // 텍스트 위로 버튼을 올리기 위한 설정
  },
  stationSelectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  stationListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stationListItemText: {
    fontSize: 18,
  },
  scheduleList: {
    marginTop: 10,
  },
});

export default ShuttleSchedule;
