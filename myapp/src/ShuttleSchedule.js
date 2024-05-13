import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const ShuttleSchedule = ({ navigation }) => {
  const [selectedStation, setSelectedStation] = useState(1);
  const [showStationList, setShowStationList] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const [stations] = useState([
    { id: 1, name: '천안아산역' },
    { id: 2, name: '천안역' },
  ]);

  const scheduleData = [
    { 
      id: 1, //1
      time: '8:10', 
      middleTime: '8:25', 
      arrivalTime: '8:40', 
      status: '' 
    },
    { 
      id: 1, //2
      time: 'X', 
      middleTime: '8:35', 
      arrivalTime: '8:50', 
      status: '금(X)' 
    },
    { 
      id: 1, //3
      time: 'X', 
      middleTime: '8:45', 
      arrivalTime: '9:00', 
      status: '금(X)' 
    },
    { 
      id: 1, //4
      time: 'X', 
      middleTime: '8:50', 
      arrivalTime: '9:05', 
      status: '금(X)' 
    },
    { 
      id: 1, //5
      time: 'X', 
      middleTime: '8:55', 
      arrivalTime: '9:10', 
      status: '' 
    },
    { 
      id: 1, //6
      time: 'X', 
      middleTime: '9:00', 
      arrivalTime: '9:15', 
      status: '금(X)' 
    },
    { 
      id: 1, //7
      time: 'X', 
      middleTime: '9:05', 
      arrivalTime: '9:20', 
      status: '' 
    },
    { 
      id: 1, //8
      time: 'X', 
      middleTime: '9:10', 
      arrivalTime: '9:25', 
      status: '금(X)' 
    },
    { 
      id: 1, //9
      time: '9:30', 
      middleTime: '9:45', 
      arrivalTime: '10:00', 
      status: '금(X)' 
    },
    { 
      id: 1, //10
      time: '9:45', 
      middleTime: '10:00', 
      arrivalTime: '10:15', 
      status: '' 
    },
    { 
      id: 1, //11
      time: '10:30', 
      middleTime: '10:45', 
      arrivalTime: '11:00', 
      status: '금(X)' 
    },
    { 
      id: 1, //12
      time: '10:55', 
      middleTime: '11:10', 
      arrivalTime: '11:20', 
      status: '' 
    },
    { 
      id: 1, //13
      time: '11:00', 
      middleTime: '11:15', 
      arrivalTime: '11:30', 
      status: '' 
    },
    { 
      id: 1, //14
      time: '11:30', 
      middleTime: '11:45', 
      arrivalTime: '12:00', 
      status: '금(X)' 
    },
    { 
      id: 1, //15
      time: '11:40', 
      middleTime: '11:55', 
      arrivalTime: '12:10', 
      status: '' 
    },
    { 
      id: 1, //16
      time: '11:50', 
      middleTime: '12:05', 
      arrivalTime: '12:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //17
      time: '12:30', 
      middleTime: '12:45', 
      arrivalTime: '13:00', 
      status: '' 
    },
    { 
      id: 1, //18
      time: '12:50', 
      middleTime: '13:05', 
      arrivalTime: '13:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //19
      time: '13:30', 
      middleTime: '13:45', 
      arrivalTime: '14:00', 
      status: '' 
    },
    { 
      id: 1, //20
      time: '13:40', 
      middleTime: '13:55', 
      arrivalTime: '14:10', 
      status: '' 
    },
    { 
      id: 1, //21
      time: '13:50', 
      middleTime: '14:05', 
      arrivalTime: '14:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //22
      time: '14:30', 
      middleTime: '14:45', 
      arrivalTime: '15:00', 
      status: '' 
    },
    { 
      id: 1, //23
      time: '14:40', 
      middleTime: '14:55', 
      arrivalTime: '15:10', 
      status: '' 
    },
    { 
      id: 1, //24
      time: '14:50', 
      middleTime: '15:05', 
      arrivalTime: '15:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //25
      time: '15:30', 
      middleTime: '15:45', 
      arrivalTime: '16:00', 
      status: '' 
    },
    { 
      id: 1, //26
      time: '15:40', 
      middleTime: '15:55', 
      arrivalTime: '16:10', 
      status: '' 
    },
    { 
      id: 1, //27
      time: '15:50', 
      middleTime: '16:05', 
      arrivalTime: '16:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //28
      time: '16:30', 
      middleTime: '16:45', 
      arrivalTime: '17:00', 
      status: '금(X)' 
    },
    { 
      id: 1, //29
      time: '16:40', 
      middleTime: '16:55', 
      arrivalTime: '17:10', 
      status: '' 
    },
    { 
      id: 1, //30
      time: '16:50', 
      middleTime: '17:05', 
      arrivalTime: '17:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //31
      time: '17:00', 
      middleTime: '17:15', 
      arrivalTime: '17:30', 
      status: '금(X)' 
    },
    { 
      id: 1, //32
      time: '17:30', 
      middleTime: '17:45', 
      arrivalTime: '18:00', 
      status: '' 
    },
    { 
      id: 1, //33
      time: '17:40', 
      middleTime: '17:55', 
      arrivalTime: '18:10', 
      status: '' 
    },
    { 
      id: 1, //34
      time: '17:50', 
      middleTime: '18:05', 
      arrivalTime: '18:20', 
      status: '금(X)' 
    },
    { 
      id: 1, //35
      time: '18:50', 
      middleTime: '18:45', 
      arrivalTime: '19:00', 
      status: '' 
    },
    { 
      id: 1, //36
      time: '18:40', 
      middleTime: '18:55', 
      arrivalTime: '19:10', 
      status: '' 
    },
    { 
      id: 1, //37
      time: '18:50', 
      middleTime: '19:05', 
      arrivalTime: '19:20', 
      status: '금(X)' 
    },
    { 
      id: 2,  //1
      time: '7:40', 
      middleTime: '8:10',
      approximately: '5~10m',
      arrivalTime: '8:35', 
      status: '' 
    },
    { 
      id: 2,  //2
      time: 'X', 
      middleTime: '8:20',
      approximately: '5~10m',
      arrivalTime: '8:40', 
      status: '금(X)' 
    },
    { 
      id: 2,  //3
      time: 'X', 
      middleTime: '8:30',
      approximately: '5~10m',
      arrivalTime: '9:00', 
      status: '금(X)' 
    },
    { 
      id: 2,  //4
      time: 'X', 
      middleTime: '8:35',
      approximately: '5~10m',
      arrivalTime: '9:05', 
      status: '' 
    },
    { 
      id: 2,  //5
      time: 'X', 
      middleTime: '8:40',
      approximately: '5~10m',
      arrivalTime: '9:10', 
      status: '' 
    },
    { 
      id: 2,  //6
      time: 'X', 
      middleTime: '8:45',
      approximately: '5~10m',
      arrivalTime: '9:15', 
      status: '금(X)' 
    },
    { 
      id: 2,  //7
      time: 'X', 
      middleTime: '8:50',
      approximately: '5~10m',
      arrivalTime: '9:20', 
      status: '' 
    },
    { 
      id: 2,  //8
      time: 'X', 
      middleTime: '8:55',
      approximately: '5~10m',
      arrivalTime: '9:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //9
      time: 'X', 
      middleTime: '9:05',
      approximately: '5~10m',
      arrivalTime: '9:30', 
      status: '금(X)' 
    },
    { 
      id: 2,  //10
      time: '9:30', 
      middleTime: '9:55',
      approximately: '5~10m',
      arrivalTime: '10:20', 
      status: '' 
    },
    { 
      id: 2,  //11
      time: '9:35', 
      middleTime: '10:00',
      approximately: '5~10m',
      arrivalTime: '10:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //12
      time: '10:30', 
      middleTime: '10:55',
      approximately: '5~10m',
      arrivalTime: '11:20', 
      status: '' 
    },
    { 
      id: 2,  //13
      time: '10:35', 
      middleTime: '11:00',
      approximately: '5~10m',
      arrivalTime: '11:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //14
      time: '10:40', 
      middleTime: '11:05',
      approximately: '5~10m',
      arrivalTime: '11:30', 
      status: '' 
    },
    { 
      id: 2,  //15
      time: '11:25', 
      middleTime: '11:50',
      approximately: '5~10m',
      arrivalTime: '12:15', 
      status: '' 
    },
    { 
      id: 2,  //16
      time: '11:30', 
      middleTime: '11:55',
      approximately: '5~10m',
      arrivalTime: '12:20', 
      status: '' 
    },
    { 
      id: 2,  //17
      time: '11:35', 
      middleTime: '12:00',
      approximately: '5~10m',
      arrivalTime: '12:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //18
      time: '12:25', 
      middleTime: '12:50',
      approximately: '5~10m',
      arrivalTime: '13:15', 
      status: '' 
    },
    { 
      id: 2,  //19
      time: '12:35', 
      middleTime: '13:00',
      approximately: '5~10m',
      arrivalTime: '13:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //20
      time: '13:30', 
      middleTime: '13:55',
      approximately: '5~10m',
      arrivalTime: '14:20', 
      status: '' 
    },
    { 
      id: 2,  //21
      time: '13:35', 
      middleTime: '14:00',
      approximately: '5~10m',
      arrivalTime: '14:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //22
      time: '14:30', 
      middleTime: '14:55',
      approximately: '5~10m',
      arrivalTime: '15:20', 
      status: '' 
    },
    { 
      id: 2,  //23
      time: '14:35', 
      middleTime: '15:00',
      approximately: '5~10m',
      arrivalTime: '15:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //24
      time: '15:30', 
      middleTime: '15:55',
      approximately: '5~10m',
      arrivalTime: '16:20', 
      status: '' 
    },
    { 
      id: 2,  //25
      time: '15:35', 
      middleTime: '16:00',
      approximately: '5~10m',
      arrivalTime: '16:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //26
      time: '15:45', 
      middleTime: '16:10',
      approximately: 'X(하교 전용 차량)',
      arrivalTime: 'X(하교 전용 차량)', 
      status: '금(X)' 
    },
    { 
      id: 2,  //27
      time: '16:30', 
      middleTime: '16:55',
      approximately: '5~10m',
      arrivalTime: '17:20', 
      status: '' 
    },
    { 
      id: 2,  //28
      time: '16:35', 
      middleTime: '17:00',
      approximately: '5~10m',
      arrivalTime: '17:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //29
      time: '16:45', 
      middleTime: '17:10',
      approximately: 'X(하교 전용 차량)',
      arrivalTime: 'X(하교 전용 차량)', 
      status: '금(X)' 
    },
    { 
      id: 2,  //30
      time: '17:30', 
      middleTime: '17:55',
      approximately: '5~10m',
      arrivalTime: '18:20', 
      status: '' 
    },
    { 
      id: 2,  //31
      time: '17:35', 
      middleTime: '18:00',
      approximately: '5~10m',
      arrivalTime: '18:25', 
      status: '금(X)' 
    },
    { 
      id: 2,  //32
      time: '18:30', 
      middleTime: '18:55',
      approximately: '5~10m',
      arrivalTime: '19:20', 
      status: '' 
    },
    { 
      id: 2,  //33
      time: '18:40', 
      middleTime: '19:05',
      approximately: '5~10m',
      arrivalTime: '19:30', 
      status: '' 
    },
    { 
      id: 2,  //34
      time: '18:50', 
      middleTime: '19:15',
      approximately: 'X(하교 전용 차량)',
      arrivalTime: 'X(하교 전용 차량)', 
      status: '금(X)' 
    },
    { 
       
    },
  ]

  const headers = {
    1: ['아산 캠퍼스', '천안 아산역', '아산 캠퍼스', '금요일 운행 여부'],
    2: ['아산 캠퍼스', '천안역', '하이렉 스파 건너편/    용암 마을', '아산 캠퍼스', '금요일 운행 여부'],
  };

  const filteredScheduleData = scheduleData.filter(item => item.id === selectedStation);

  const renderScheduleItem = ({ item }) => {
    let textStyle = styles.cell;
    let scheduleTime;
  
    // time이 'X'가 아니고 현재 시간 이전의 시간들에 대해 색상 변경
    if (item.time !== 'X') {
      scheduleTime = new Date();
      const [hours, minutes] = item.time.split(':');
      scheduleTime.setHours(parseInt(hours, 10));
      scheduleTime.setMinutes(parseInt(minutes, 10));
  
      if (scheduleTime < currentTime) {
        textStyle = [styles.cell, { color: '#dddddd' }];
      }
    } else {
      // time이 'X'인 경우에도 색상 변경
      textStyle = [styles.cell, { color: '#dddddd' }];
    }
  
    // approximately에 대해서도 동일한 색상 변경 적용
    if (item.approximately === 'X') {
      textStyle = [styles.cell, { color: '#dddddd' }];
    }
  
    const onPressHandler = item.time !== 'X' ? () => navigation.navigate('TrainSchedule', { scheduleItem: item }) : null;
  
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={onPressHandler}
        disabled={item.time === 'X'}
      >
        
        <Text style={textStyle}>{item.time}</Text>
        <Text style={textStyle}>{item.middleTime}</Text>
        {/* id가 2인 경우에만 approximately 표시 */}
        {selectedStation === 2 && <Text style={textStyle}>{item.approximately}</Text>}
        <Text style={textStyle}>{item.arrivalTime}</Text>
        <Text style={textStyle}>{item.status}</Text>
      </TouchableOpacity>
    );
  };
  

  const handleStationSelect = () => {
    setShowStationList(true);
  };

  const handleStationChange = (station) => {
    setSelectedStation(station.id);
    setShowStationList(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.stationSelectButton} onPress={handleStationSelect}>
        <Text style={styles.stationSelectButtonText}>{stations.find(station => station.id === selectedStation).name}</Text>
      </TouchableOpacity>

      <View style={[styles.row, { marginTop: 30 }]}>
        {headers[selectedStation].map((header, index) => (
          <Text key={index} style={styles.cellHeader}>{header}</Text>
        ))}
      </View>

      <FlatList
        data={filteredScheduleData}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scheduleList}
      />

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
    paddingVertical: 5,
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
    zIndex: 1,
  },
  stationSelectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
