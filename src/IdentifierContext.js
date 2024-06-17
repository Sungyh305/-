// App.js와 GoogleMap.js에서 식별자를 읽고 상태 업데이트
// 식별자와 식별자 업데이트 함수
import React, { createContext, useState } from 'react';

export const IdentifierContext = createContext(); //상태를 공유할 수 있게 함

export const IdentifierProvider = ({ children }) => {
  const [selectedIdentifier, setSelectedIdentifier] = useState('1');

  return (
    // 하위 컴포넌트에 상태와 상태 업데이트 함수를 전달
    <IdentifierContext.Provider
      value={{ selectedIdentifier, setSelectedIdentifier }}
    >
      {children}
    </IdentifierContext.Provider>
  );
};