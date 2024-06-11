const ranges = [
  {
    id: 'on_bus1', //bus_stop1 타는 곳
    points: [
      { latitude: 36.800642, longitude: 127.070844 },
      { latitude: 36.80026, longitude: 127.072132 },
    ],
  },
  /*{ // 도서관 위치
    id: "test1",
    points: [
      { latitude: 36.797005, longitude: 127.075645 },
      { latitude: 36.797882, longitude: 127.076233 }
    ]
  },*/
  /*{ // 인문관 위치
    id: "test2",
    points: [
      { latitude: 36.798337, longitude: 127.075637 },
      { latitude: 36.799305, longitude: 127.076220 }
    ]
  },*/
  {
    id: 'range1',
    points: [
      { latitude: 36.800743, longitude: 127.070258 },
      { latitude: 36.79691, longitude: 127.079217 },
    ],
  },
  {
    id: 'off_bus1', //bus_stop2
    points: [
      { latitude: 36.798251, longitude: 127.071979 },
      { latitude: 36.798049, longitude: 127.072532 },
    ],
  },
  {
    id: 'on_bus2', //bus_stop3
    points: [
      { latitude: 36.797997, longitude: 127.077213 },
      { latitude: 36.797787, longitude: 127.077798 },
    ],
  },
  {
    id: 'off_bus2', //bus_stop4
    points: [
      { latitude: 36.799634, longitude: 127.074279 },
      { latitude: 36.799355, longitude: 127.07588 },
    ],
  },
  {
    id: 'off_bus3', //더 크게 bus_stop5
    points: [
      { latitude: 36.799032, longitude: 127.077969 },
      { latitude: 36.798676, longitude: 127.078264 },
    ],
  },
  {
    id: 'range2',
    points: [
      { latitude: 36.798324, longitude: 127.077969 },
      { latitude: 36.796575, longitude: 127.082202 },
    ],
  },
  {
    id: 'range3',
    points: [
      { latitude: 36.797924, longitude: 127.08158 },
      { latitude: 36.794738, longitude: 127.087667 },
    ],
  },
  {
    id: 'range4',
    points: [
      { latitude: 36.800771, longitude: 127.085068 },
      { latitude: 36.797204, longitude: 127.087765 },
    ],
  },
  {
    id: 'range5',
    points: [
      { latitude: 36.797806, longitude: 127.08703 },
      { latitude: 36.794757, longitude: 127.09318 },
    ],
  },
  {
    id: 'range6',
    points: [
      { latitude: 36.796425, longitude: 127.091158 },
      { latitude: 36.799312, longitude: 127.094151 },
    ],
  },
  {
    id: 'range7',
    points: [
      { latitude: 36.808989, longitude: 127.104971 },
      { latitude: 36.803278, longitude: 127.109761 },
    ],
  },
  {
    id: 'range8',
    points: [
      { latitude: 36.807416, longitude: 127.105055 },
      { latitude: 36.813197, longitude: 127.111342 },
    ],
  },
  {
    id: 'range9',
    points: [
      { latitude: 36.812492, longitude: 127.106611 },
      { latitude: 36.81774, longitude: 127.113391 },
    ],
  },
  {
    id: 'range10',
    points: [
      { latitude: 36.817156, longitude: 127.107585 },
      { latitude: 36.822699, longitude: 127.114044 },
    ],
  },
  {
    id: 'range11',
    points: [
      { latitude: 36.821505, longitude: 127.110069 },
      { latitude: 36.825518, longitude: 127.126508 },
    ],
  },
  {
    id: 'range12',
    points: [
      { latitude: 36.822684, longitude: 127.124668 },
      { latitude: 36.827843, longitude: 127.133062 },
    ],
  },
  {
    id: 'range13',
    points: [
      { latitude: 36.824, longitude: 127.132327 },
      { latitude: 36.828186, longitude: 127.142509 },
    ],
  },
  {
    id: 'range14',
    points: [
      { latitude: 36.826409, longitude: 127.141543 },
      { latitude: 36.823434, longitude: 127.151579 },
    ],
  },
  {
    id: 'range15',
    points: [
      { latitude: 36.825882, longitude: 127.150704 },
      { latitude: 36.822776, longitude: 127.156684 },
    ],
  },
  {
    id: 'range16',
    points: [
      { latitude: 36.825341, longitude: 127.156284 },
      { latitude: 36.823086, longitude: 127.162288 },
    ],
  },
  {
    id: 'range17',
    points: [
      { latitude: 36.824061, longitude: 127.159853 },
      { latitude: 36.819444, longitude: 127.162889 },
    ],
  },
  {
    id: 'range18',
    points: [
      { latitude: 36.820481, longitude: 127.160454 },
      { latitude: 36.817746, longitude: 127.156225 },
    ],
  },
  {
    id: 'range19',
    points: [
      { latitude: 36.820138, longitude: 127.15673 },
      { latitude: 36.817291, longitude: 127.152669 },
    ],
  },
  {
    id: '_bus', //천안터미널 정류장 내리는건가?
    points: [
      { latitude: 36.819219, longitude: 127.154037 },
      { latitude: 36.818661, longitude: 127.152441 },
    ],
  },
  {
    id: 'range20',
    points: [
      { latitude: 36.818141, longitude: 127.154358 },
      { latitude: 36.821491, longitude: 127.150601 },
    ],
  },
  {
    id: 'range21',
    points: [
      { latitude: 36.820349, longitude: 127.15389 },
      { latitude: 36.823144, longitude: 127.150966 },
    ],
  },
  {
    id: 'range101',
    points: [
      { latitude: 36.79795, longitude: 127.093802 },
      { latitude: 36.800983, longitude: 127.099845 },
    ],
  },
  {
    id: 'range102',
    points: [
      { latitude: 36.803009, longitude: 127.098048 },
      { latitude: 36.79962, longitude: 127.105226 },
    ],
  },
  {
    id: 'range103',
    points: [
      { latitude: 36.803933, longitude: 127.103962 },
      { latitude: 36.800045, longitude: 127.111899 },
    ],
  },
  {
    id: 'range104',
    points: [
      { latitude: 36.802987, longitude: 127.110172 },
      { latitude: 36.798715, longitude: 127.117411 },
    ],
  },
  {
    id: 'range104',
    points: [
      { latitude: 36.802987, longitude: 127.110172 },
      { latitude: 36.798715, longitude: 127.117411 },
    ],
  },
  {
    id: 'range105',
    points: [
      { latitude: 36.802916, longitude: 127.116161 },
      { latitude: 36.799456, longitude: 127.123393 },
    ],
  },
  {
    id: '_bus', //용암마을 까먹었다 내리는건가?
    points: [
      { latitude: 36.801768, longitude: 127.117101 },
      { latitude: 36.801192, longitude: 127.118619 },
    ],
  },
  {
    id: 'range106',
    points: [
      { latitude: 36, longitude: 127 },
      { latitude: 36, longitude: 127 },
    ],
  },
  {
    id: 'range201',
    points: [
      { latitude: 36.799845, longitude: 127.098462 },
      { latitude: 36.795684, longitude: 127.10253 },
    ],
  },
  {
    id: 'range202',
    points: [
      { latitude: 36.796595, longitude: 127.099381 },
      { latitude: 36.791001, longitude: 127.104761 },
    ],
  },
  {
    id: '_bus', //천안아산역 타고 내리는거 둘 다인가?
    points: [
      { latitude: 36.795318, longitude: 127.102765 },
      { latitude: 36.793016, longitude: 127.104364 },
    ],
  },
  //여기 이후로 안상찬씨가 채워주세요. 천안역 남았습니다
];

module.exports = ranges;
