const ranges = [
  {
    id: 'range1',
    points: [
      { latitude: 36.79553, longitude: 127.069628 },
      { latitude: 36.801026, longitude: 127.078431 },
    ],
  },
  {
    id: 'range2',
    points: [
      { latitude: 36.796549, longitude: 127.078013 },
      { latitude: 36.798365, longitude: 127.085943 },
    ],
  },
  {
    id: 'range3',
    points: [
      { latitude: 36.793945, longitude: 127.085378 },
      { latitude: 36.798051, longitude: 127.087746 },
    ],
  },
  {
    id: 'range4',
    points: [
      { latitude: 36.797144, longitude: 127.084574 },
      { latitude: 36.800991, longitude: 127.087364 },
    ],
  },
  {
    id: 'range5',
    points: [
      { latitude: 36.79395, longitude: 127.087102 },
      { latitude: 36.797648, longitude: 127.09261 },
    ],
  },
  {
    id: 'range6',
    points: [
      { latitude: 36.796404, longitude: 127.090982 },
      { latitude: 36.799312, longitude: 127.094173 },
    ],
  },
  {
    id: 'range7', //천안터미널
    points: [
      { latitude: 36.802526, longitude: 127.103735 },
      { latitude: 36.808486, longitude: 127.109459 },
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
      { latitude: 36.824083, longitude: 127.14064 },
      { latitude: 36.825964, longitude: 127.151807 },
    ],
  },
  {
    id: 'range15',
    points: [
      { latitude: 36.823008, longitude: 127.15075 },
      { latitude: 36.825593, longitude: 127.156845 },
    ],
  },
  {
    id: 'range16',
    points: [
      { latitude: 36.823038, longitude: 127.15603 },
      { latitude: 36.825357, longitude: 127.161588 },
    ],
  },
  {
    id: 'range17',
    points: [
      { latitude: 36.818845, longitude: 127.159751 },
      { latitude: 36.824409, longitude: 127.164246 },
    ],
  },
  {
    id: 'range18',
    points: [
      { latitude: 36.817746, longitude: 127.156225 },
      { latitude: 36.820481, longitude: 127.160454 },
    ],
  },
  {
    id: 'range19',
    points: [
      { latitude: 36.817291, longitude: 127.152669 },
      { latitude: 36.820138, longitude: 127.15673 },
    ],
  },
  {
    id: 'range20',
    points: [
      { latitude: 36.817509, longitude: 127.150342 },
      { latitude: 36.820672, longitude: 127.153191 },
    ],
  },
  {
    id: 'range21', //천텀
    points: [
      { latitude: 36.819827, longitude: 127.150753 },
      { latitude: 36.824084, longitude: 127.154156 },
    ],
  },
  {
    id: 'range101', //천안 아산,천안
    points: [
      { latitude: 36.797486, longitude: 127.093628 },
      { latitude: 36.801106, longitude: 127.099763 },
    ],
  },
  {
    id: 'range102',
    points: [
      { latitude: 36.798736, longitude: 127.098421 },
      { latitude: 36.802515, longitude: 127.104944 },
    ],
  },
  {
    id: 'range103',
    points: [
      { latitude: 36.799953, longitude: 127.104184 },
      { latitude: 36.803659, longitude: 127.112242 },
    ],
  },
  {
    id: 'range104',
    points: [
      { latitude: 36.800139, longitude: 127.110121 },
      { latitude: 36.803117, longitude: 127.117679 },
    ],
  },
  {
    id: 'range105',
    points: [
      { latitude: 36.799859, longitude: 127.11553 },
      { latitude: 36.801763, longitude: 127.123636 },
    ],
  },
  {
    id: 'range106',
    points: [
      { latitude: 36.797998, longitude: 127.122044 },
      { latitude: 36.801558, longitude: 127.129481 },
    ],
  },
  {
    id: 'range107',
    points: [
      { latitude: 36.795332, longitude: 127.126641 },
      { latitude: 36.799649, longitude: 127.134117 },
    ],
  },
  {
    id: 'range108',
    points: [
      { latitude: 36.799044, longitude: 127.129805 },
      { latitude: 36.80799, longitude: 127.134037 },
    ],
  },
  {
    id: 'range109',
    points: [
      { latitude: 36.805864, longitude: 127.132803 },
      { latitude: 36.808451, longitude: 127.141263 },
    ],
  },
  {
    id: 'range110',
    points: [
      { latitude: 36.80605, longitude: 127.137412 },
      { latitude: 36.810756, longitude: 127.143082 },
    ],
  },
  {
    id: 'range111',
    points: [
      { latitude: 36.808897, longitude: 127.139315 },
      { latitude: 36.81137, longitude: 127.145292 },
    ],
  },
  {
    id: 'range112',
    points: [
      { latitude: 36.798723, longitude: 127.132579 },
      { latitude: 36.802149, longitude: 127.138571 },
    ],
  },
  {
    id: 'range113',
    points: [
      { latitude: 36.800604, longitude: 127.13615 },
      { latitude: 36.803964, longitude: 127.14445 },
    ],
  },
  {
    id: 'range114', //천안역
    points: [
      { latitude: 36.801849, longitude: 127.141977 },
      { latitude: 36.810837, longitude: 127.144726 },
    ],
  },
  {
    id: 'range115',
    points: [
      { latitude: 36.787473, longitude: 127.085788 },
      { latitude: 36.796229, longitude: 127.088935 },
    ],
  },
  {
    id: 'range116',
    points: [
      { latitude: 36.788288, longitude: 127.08727 },
      { latitude: 36.791129, longitude: 127.094168 },
    ],
  },
  {
    id: 'range117',
    points: [
      { latitude: 36.789462, longitude: 127.09236 },
      { latitude: 36.791821, longitude: 127.098042 },
    ],
  },
  {
    id: 'range118',
    points: [
      { latitude: 36.791186, longitude: 127.094239 },
      { latitude: 36.794373, longitude: 127.098053 },
    ],
  },
  {
    id: 'range119',
    points: [
      { latitude: 36.793071, longitude: 127.096245 },
      { latitude: 36.796491, longitude: 127.100338 },
    ],
  },
  {
    id: 'range120',
    points: [
      { latitude: 36.79433, longitude: 127.099147 },
      { latitude: 36.797522, longitude: 127.101497 },
    ],
  },
  {
    id: 'range121',
    points: [
      { latitude: 36.795202, longitude: 127.100848 },
      { latitude: 36.798123, longitude: 127.10611 },
    ],
  },
  {
    id: 'range122',
    points: [
      { latitude: 36.795507, longitude: 127.103567 },
      { latitude: 36.799004, longitude: 127.110257 },
    ],
  },
  {
    id: 'range123',
    points: [
      { latitude: 36.796993, longitude: 127.107939 },
      { latitude: 36.800223, longitude: 127.116095 },
    ],
  },
  {
    id: 'range201',
    points: [
      { latitude: 36.793538, longitude: 127.097041 },
      { latitude: 36.802309, longitude: 127.105558 },
    ],
  },
  {
    id: 'range202',
    points: [
      { latitude: 36.790634, longitude: 127.098394 },
      { latitude: 36.797743, longitude: 127.106947 },
    ],
  },
  {
    id: 'on_bus_a1_Cheonan Asan Station', //천안아산역
    points: [
      { latitude: 36.792831, longitude: 127.10273 },
      { latitude: 36.795473, longitude: 127.104271 },
    ],
  },
  {
    id: 'off_bus_a2_Cheonan Asan Station', //천안아산역
    points: [
      { latitude: 36.792831, longitude: 127.10273 },
      { latitude: 36.795473, longitude: 127.104271 },
    ],
  },
  {
    id: 'on_bus_b1_Cheonan', //천안역(승차장)
    points: [
      { latitude: 36.810011, longitude: 127.14234 },
      { latitude: 36.810313, longitude: 127.143145 },
    ],
  },
  {
    id: 'off_bus_b2_Cheonan', //천안역(하차장)
    points: [
      { latitude: 36.810011, longitude: 127.14234 },
      { latitude: 36.810313, longitude: 127.143145 },
    ],
  },
  {
    id: 'on_bus_b3_cheonan station', //천안역(용암마을 승차장)
    points: [
      { latitude: 36.801169, longitude: 127.117163 },
      { latitude: 36.801796, longitude: 127.118724 },
    ],
  },
  {
    id: 'off_bus_b4_cheonan station', //천안역(월봉청솔 하차장)
    points: [
      { latitude: 36.800841, longitude: 127.115388 },
      { latitude: 36.8016, longitude: 127.1172 },
    ],
  },
  {
    id: 'on_bus_b5_cheonan station', //천안역(하이렉스파 건너편 승차장)
    points: [
      { latitude: 36.799969, longitude: 127.124125 },
      { latitude: 36.800673, longitude: 127.126131 },
    ],
  },
  {
    id: 'off_bus_b6_cheonan station', //천안역(쌍용동 하이마트 하차장)
    points: [
      { latitude: 36.799264, longitude: 127.126476 },
      { latitude: 36.799711, longitude: 127.127577 },
    ],
  },
  {
    id: 'on_bus_SUNMOONUNI1', //선문대(공학관 옆 승차장)
    points: [
      { latitude: 36.800134, longitude: 127.070749 },
      { latitude: 36.800661, longitude: 127.072235 },
    ],
  },
  {
    id: 'off_bus_SUNMOONUNI1', //선문대(오렌지식당 뒤 하차장)
    points: [
      { latitude: 36.797887, longitude: 127.071936 },
      { latitude: 36.798245, longitude: 127.072672 },
    ],
  },
  {
    id: 'on_bus_SUNMOONUNI2', //선문대(학관 앞 승차장)
    points: [
      { latitude: 36.797781, longitude: 127.077244 },
      { latitude: 36.798126, longitude: 127.078109 },
    ],
  },
  {
    id: 'off_bus_SUNMOONUNI2', //선문대(본관 앞 하차장)
    points: [
      { latitude: 36.799279, longitude: 127.074063 },
      { latitude: 36.79972, longitude: 127.075892 },
    ],
  },
  {
    id: 'off_bus_SUNMOONUNI3', //선문대(의료관 앞 하차장)
    points: [
      { latitude: 36.79845, longitude: 127.077774 },
      { latitude: 36.799311, longitude: 127.078478 },
    ],
  },
  {
    id: 'on_bus_c1_Cheonan Terminal', //천안터미널(승차장)
    points: [
      { latitude: 36.818661, longitude: 127.152441 },
      { latitude: 36.819219, longitude: 127.154037 },
    ],
  },
  {
    id: 'off_bus_c1_Cheonan Terminal', //천안터미널(하차장)
    points: [
      { latitude: 36.818661, longitude: 127.152441 },
      { latitude: 36.819219, longitude: 127.154037 },
    ],
  },
];

module.exports = ranges;
