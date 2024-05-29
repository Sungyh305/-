import React, { useState, useRef } from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Modal} from 'react-native';

const Notice = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayheaderText, setDisplayheaderText] = useState("");
  const [inquirymodalVisible, setInquiryModalVisible] = useState(false);
  const key = useRef(null);

  const noticeText = () => {
    if(key.current == '1') {
      setDisplayText("1. 회원가입 및 로그인\n2. 셔틀 버스 시간표 및 KTX 시간표 확인 가능\n\
3. 지정된 위치 안에서 GPS 위치 전송 버튼을 누를 시 포인트 지급\n\
4. 지급 된 포인트로 포인트 상점의 상품을 구매 가능\n");
    } else if(key.current == '2') {
      setDisplayText("- 포인트가 지급되지 않던 버그제거\n\
- 지도가 느리게 렌더링되는 문제 수정\n- 마커가 두 개로 겹쳐 보이는 문제 수정\n");
    }
  }
  const noticeHeaderText = () => {
    if(key.current == '1') {
      setDisplayheaderText("버스! 어디가? 사용설명서(필독)");
    } else if(key.current == '2') {
      setDisplayheaderText("버스! 어디가? 정기 업데이트");
    }
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.box_view} onPress={() => {
          key.current = 1
          noticeHeaderText()
          noticeText()
          setModalVisible(true)}}>
          <View style={styles.header_view}>
            <Text style={styles.header_text}>버스! 어디가? 사용설명서(필독)</Text>
            <Text style={styles.date_text}>2024-05-17(금)</Text>
          </View>
          <Text style={styles.body_text}>
            1. 회원가입 및 로그인{'\n'}
            2. 셔틀 버스 시간표 및 KTX 시간표 확인 가능{'\n'}
            3. 지정된 위치 안에서 GPS 위치 전송 버튼을 누를 시 포인트 지급   ...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box_view} onPress={() => {
          key.current = 2
          noticeHeaderText()
          noticeText()
          setModalVisible(true)}}>
          <View style={styles.header_view}>
            <Text style={styles.header_text}>버스! 어디가? 정기 업데이트</Text>
            <Text style={styles.date_text}>2024-05-17(금)</Text>
          </View>
          <Text style={styles.body_text}>
            - 포인트가 지급되지 않던 버그 제거{'\n'}
            - 지도가 느리게 렌더링되는 문제 수정{'\n'}
            - ...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inquiry_view} onPress={() => {
          setInquiryModalVisible(true)}}>
          <Text style={styles.inquiry_text}>1:1 및 버그 문의</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal_view}>
            <View style={styles.modal_content}>
              <View style={styles.modal_header_view}>
                <Text style={styles.header_text}>{displayheaderText}</Text>
                <Text style={styles.date_text}>2024-05-17(금)</Text>
              </View>
              <Text style={styles.modal_body_text}>{displayText}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.button_text}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={inquirymodalVisible}
          onRequestClose={() => {
            setModalVisible(!inquirymodalVisible);
          }}
        >
          <View style={styles.modal_view}>
            <View style={styles.modal_content}>
              <Text style={styles.modal_inquiry_text}>jikolp89@naver.com {'\n'}이메일로 문의주시기 바랍니다.</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setInquiryModalVisible(false)}
              >
                <Text style={styles.button_text}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
  },
  box_view: {
    width: 320,
    height: 220,
    borderRadius: 8,
    paddingTop: 10,
    backgroundColor: '#86CC57',
    marginBottom: 20,
    overflow: 'hidden', // 뷰를 벗어나는 내용 숨김
  },
  header_view: {
    width: 300,
    height: 60,
    borderRadius: 8,
    marginLeft: 10,
    backgroundColor: '#CCBEA7',
  },
  inquiry_view: {
    alignItems: 'flex-end',
    marginTop: 155,
    marginStart: 190,
  },
  header_text: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  date_text: {
    fontSize: 17,
    textAlign: 'right',
    paddingTop: 4,
    paddingEnd: 5
  },
  body_text: {
    fontSize: 17,
    padding: 10,
    lineHeight: 30,
    textAlign: 'left',
    flexWrap: 'wrap', // 텍스트 줄바꿈 허용
  },
  modal_body_text: {
    width: 350,
    fontSize: 17,
    padding: 15,
    lineHeight: 30,
    textAlign: 'left',
  },
  inquiry_text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  modal_inquiry_text: {
    width: 350,
    fontSize: 17,
    padding: 15,
    lineHeight: 30,
    textAlign: 'center',
  },
  button_text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    width: 80,
    padding: 15,
    backgroundColor: '#4BB863',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_header_view: {
    width: 330,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#CCBEA7',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  modal_content: {
    width: 350,
    borderRadius: 8,
    paddingTop: 10,
    backgroundColor: '#86CC57',
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
})