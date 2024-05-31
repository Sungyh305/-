import socketIOClient from 'socket.io-client'; // Socket.IO 클라이언트 라이브러리 가져오기

const SERVER_URL = 'https://advanced-sawfish-faithful.ngrok-free.app/'; // 서버 URL
const globalSocket = socketIOClient(SERVER_URL); // 전역 Socket.IO 클라이언트 인스턴스

export default globalSocket;