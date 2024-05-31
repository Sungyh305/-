const ranges = [
  {
    id: 'bus_stop1',
    points: [
      { latitude: 36.800334, longitude: 127.071074 },
      { latitude: 36.80056, longitude: 127.072097 },
    ],
  },
  {
    // 도서관 위치
    id: 'test1',
    points: [
      { latitude: 36.797005, longitude: 127.075645 },
      { latitude: 36.797882, longitude: 127.076233 },
    ],
  },
  /*{ // 인문관 위치
    id: "test2",
    points: [
      { latitude: 36.798337, longitude: 127.075637 },
      { latitude: 36.799305, longitude: 127.076220 }
    ]
  },*/
  /*{
    // 기숙사 위치
    id: 'test3',
    points: [
      { latitude: 36.795632, longitude: 127.068843 },
      { latitude: 36.796646, longitude: 127.070119 },
    ],
  },*/
  {
    id: 'range1',
    points: [
      { latitude: 36.799575, longitude: 127.070862 },
      { latitude: 36.800333, longitude: 127.07187 },
    ],
  },
  {
    id: 'range2',
    points: [
      { latitude: 36.797856, longitude: 127.071675 },
      { latitude: 36.799574, longitude: 127.071975 },
    ],
  },
  {
    id: 'range3',
    points: [
      { latitude: 36.797856, longitude: 127.071976 },
      { latitude: 36.798184, longitude: 127.078138 },
    ],
  },
  {
    id: 'range4',
    points: [
      { latitude: 36.799379, longitude: 127.073908 },
      { latitude: 36.799569, longitude: 127.078138 },
    ],
  },
  {
    id: 'range5',
    points: [
      { latitude: 36.798185, longitude: 127.077816 },
      { latitude: 36.799378, longitude: 127.078138 },
    ],
  },
  {
    id: 'range6',
    points: [
      { latitude: 36.797494, longitude: 127.078139 },
      { latitude: 36.798145, longitude: 127.079176 },
    ],
  },
  {
    id: 'range7',
    points: [
      { latitude: 36.797494, longitude: 127.079177 },
      { latitude: 36.797855, longitude: 127.081586 },
    ],
  },
  {
    id: 'range8',
    points: [
      { latitude: 36.797428, longitude: 127.081587 },
      { latitude: 36.79765, longitude: 127.08576 },
    ],
  },
  {
    id: 'range9',
    points: [
      { latitude: 36.797805, longitude: 127.0858 },
      { latitude: 36.797185, longitude: 127.08625 },
    ],
  },
  {
    id: 'range10',
    points: [
      { latitude: 37.797808, longitude: 127.08628 },
      { latitude: 36.799798, longitude: 127.085875 },
    ],
  },
  {
    id: 'range11',
    points: [
      { latitude: 36.799844, longitude: 127.085991 },
      { latitude: 36.800246, longitude: 127.085618 },
    ],
  },
  {
    id: 'range12',
    points: [
      { latitude: 36.800246, longitude: 127.085618 },
      { latitude: 36.800477, longitude: 127.086715 },
    ],
  },
  {
    id: 'range13',
    points: [
      { latitude: 36.800477, longitude: 127.086715 },
      { latitude: 36.797924, longitude: 127.08731 },
    ],
  },
  {
    id: 'range14',
    points: [
      { latitude: 36.79792, longitude: 127.087028 },
      { latitude: 36.797, longitude: 127.087574 },
    ],
  },
  {
    id: 'range15',
    points: [
      { latitude: 36.796976, longitude: 127.087537 },
      { latitude: 36.795857, longitude: 127.08778 },
    ],
  },
  {
    id: 'range16',
    points: [
      { latitude: 36.79586, longitude: 127.087786 },
      { latitude: 36.795307, longitude: 127.087174 },
    ],
  },
  {
    id: 'range17',
    points: [
      { latitude: 36.79719, longitude: 127.086169 },
      { latitude: 36.796397, longitude: 127.085773 },
    ],
  },
  {
    id: 'range18',
    points: [
      { latitude: 36.7964, longitude: 127.085915 },
      { latitude: 36.795444, longitude: 127.085711 },
    ],
  },
  {
    id: 'range19',
    points: [
      { latitude: 36.795427, longitude: 127.08542 },
      { latitude: 36.794314, longitude: 127.08605 },
    ],
  },
  {
    id: 'range20',
    points: [
      { latitude: 36.794834, longitude: 127.086004 },
      { latitude: 36.795311, longitude: 127.08663 },
    ],
  },
  {
    id: 'range21',
    points: [
      { latitude: 36.795158, longitude: 127.086661 },
      { latitude: 36.795698, longitude: 127.087167 },
    ],
  },
  {
    id: 'range22',
    points: [
      { latitude: 36.795688, longitude: 127.087811 },
      { latitude: 36.796356, longitude: 127.088446 },
    ],
  },
  {
    id: 'range23',
    points: [
      { latitude: 36.796022, longitude: 127.088526 },
      { latitude: 36.796829, longitude: 127.089348 },
    ],
  },
  {
    id: 'range24',
    points: [
      { latitude: 36.796424, longitude: 127.089365 },
      { latitude: 36.796893, longitude: 127.089463 },
    ],
  },
  {
    id: 'range25',
    points: [
      { latitude: 36.796633, longitude: 127.08973 },
      { latitude: 36.797213, longitude: 127.090089 },
    ],
  },
  {
    id: 'range26',
    points: [
      { latitude: 36.797334, longitude: 127.091084 },
      { latitude: 36.797874, longitude: 127.091364 },
    ],
  },
  {
    id: 'range27',
    points: [
      { latitude: 36.797522, longitude: 127.091439 },
      { latitude: 36.797629, longitude: 127.090893 },
    ],
  },
  {
    id: 'range28',
    points: [
      { latitude: 36.79727, longitude: 127.090955 },
      { latitude: 36.797828, longitude: 127.091278 },
    ],
  },
  {
    id: 'range29',
    points: [
      { latitude: 36.79749, longitude: 127.091362 },
      { latitude: 36.798084, longitude: 127.091766 },
    ],
  },
  {
    id: 'range30',
    points: [
      { latitude: 36.797743, longitude: 127.091846 },
      { latitude: 36.798266, longitude: 127.092144 },
    ],
  },
  {
    id: 'range31',
    points: [
      { latitude: 36.797931, longitude: 127.092197 },
      { latitude: 36.798507, longitude: 127.092619 },
    ],
  },
  {
    id: 'range32',
    points: [
      { latitude: 36.798127, longitude: 127.092628 },
      { latitude: 36.798646, longitude: 127.092944 },
    ],
  },
  {
    id: 'range33',
    points: [
      { latitude: 36.798283, longitude: 127.092935 },
      { latitude: 36.798841, longitude: 127.093334 },
    ],
  },
  {
    id: 'range34',
    points: [
      { latitude: 36.798521, longitude: 127.093392 },
      { latitude: 36.799038, longitude: 127.093772 },
    ],
  },
  {
    id: 'range35',
    points: [
      { latitude: 36.798714, longitude: 127.093782 },
      { latitude: 36.799188, longitude: 127.094175 },
    ],
  },
  {
    id: 'range36',
    points: [
      { latitude: 36.798867, longitude: 127.094206 },
      { latitude: 36.799483, longitude: 127.094924 },
    ],
  },
  {
    id: 'range37',
    points: [
      { latitude: 36.799177, longitude: 127.094979 },
      { latitude: 36.799613, longitude: 127.095369 },
    ],
  },
  {
    id: 'range38',
    points: [
      { latitude: 36.799312, longitude: 127.095411 },
      { latitude: 36.799677, longitude: 127.095576 },
    ],
  },
  {
    id: 'range39',
    points: [
      { latitude: 36.799373, longitude: 127.095628 },
      { latitude: 36.799818, longitude: 127.096115 },
    ],
  },
  {
    id: 'range40',
    points: [
      { latitude: 36.7995, longitude: 127.096149 },
      { latitude: 36.799975, longitude: 127.096667 },
    ],
  },
  {
    id: 'range41',
    points: [
      { latitude: 36.799649, longitude: 127.096719 },
      { latitude: 36.800086, longitude: 127.097077 },
    ],
  },
  {
    id: 'range42',
    points: [
      { latitude: 36.799754, longitude: 127.097112 },
      { latitude: 36.800213, longitude: 127.097554 },
    ],
  },
  {
    id: 'range43',
    points: [
      { latitude: 36.799901, longitude: 127.097625 },
      { latitude: 36.800282, longitude: 127.097984 },
    ],
  },
  {
    id: 'range44',
    points: [
      { latitude: 36.799972, longitude: 127.098008 },
      { latitude: 36.800351, longitude: 127.098401 },
    ],
  },
  {
    id: 'range45',
    points: [
      { latitude: 36.80003, longitude: 127.098435 },
      { latitude: 36.800434, longitude: 127.098898 },
    ],
  },
  {
    id: 'range46',
    points: [
      { latitude: 36.800099, longitude: 127.098922 },
      { latitude: 36.800525, longitude: 127.099494 },
    ],
  },
  {
    id: 'range47',
    points: [
      { latitude: 36.800525, longitude: 127.099494 },
      { latitude: 36.79997, longitude: 127.100153 },
    ],
  },
  {
    id: 'range48',
    points: [
      { latitude: 36.799953, longitude: 127.099618 },
      { latitude: 36.799547, longitude: 127.100243 },
    ],
  },
  {
    id: 'range49',
    points: [
      { latitude: 36.799539, longitude: 127.099739 },
      { latitude: 36.798917, longitude: 127.100394 },
    ],
  },
  {
    id: 'range50',
    points: [
      { latitude: 36.798908, longitude: 127.099902 },
      { latitude: 36.798051, longitude: 127.100588 },
    ],
  },
  {
    id: 'range51',
    points: [
      { latitude: 36.798054, longitude: 127.100225 },
      { latitude: 36.797449, longitude: 127.100753 },
    ],
  },
  {
    id: 'range52',
    points: [
      { latitude: 36.797414, longitude: 127.100362 },
      { latitude: 36.799783, longitude: 127.100923 },
    ],
  },
  {
    id: 'range53',
    points: [
      { latitude: 36.79678, longitude: 127.100519 },
      { latitude: 36.796117, longitude: 127.101085 },
    ],
  },
  {
    id: 'range54',
    points: [
      { latitude: 36.796108, longitude: 127.100681 },
      { latitude: 36.795396, longitude: 127.10127 },
    ],
  },
  {
    id: 'range55',
    points: [
      { latitude: 36.79537, longitude: 127.100838 },
      { latitude: 36.795134, longitude: 127.101327 },
    ],
  },
  {
    id: 'range56',
    points: [
      { latitude: 36.795154, longitude: 127.100873 },
      { latitude: 36.794527, longitude: 127.10149 },
    ],
  },
  {
    id: 'range57',
    points: [
      { latitude: 36.794501, longitude: 127.101029 },
      { latitude: 36.793895, longitude: 127.101667 },
    ],
  },
  {
    id: 'range58',
    points: [
      { latitude: 36.793861, longitude: 127.1012 },
      { latitude: 36.79324, longitude: 127.101833 },
    ],
  },
  {
    id: 'range59',
    points: [
      { latitude: 36.793189, longitude: 127.101388 },
      { latitude: 36.792596, longitude: 127.102021 },
    ],
  },
  {
    id: 'range60',
    points: [
      { latitude: 36.792536, longitude: 127.101581 },
      { latitude: 36.791861, longitude: 127.102236 },
    ],
  },
  {
    id: 'range61',
    points: [
      { latitude: 36.792351, longitude: 127.102236 },
      { latitude: 36.792583, longitude: 127.102514 },
    ],
  },
  {
    id: 'range62',
    points: [
      { latitude: 36.792437, longitude: 127.102547 },
      { latitude: 36.792682, longitude: 127.103029 },
    ],
  },
  {
    id: 'range63',
    points: [
      { latitude: 36.792531, longitude: 127.103029 },
      { latitude: 36.79278, longitude: 127.103491 },
    ],
  },
  {
    id: 'range64',
    points: [
      { latitude: 36.792613, longitude: 127.103523 },
      { latitude: 36.792866, longitude: 127.103888 },
    ],
  },
  {
    id: 'range65',
    points: [
      { latitude: 36.792879, longitude: 127.103609 },
      { latitude: 36.792952, longitude: 127.103941 },
    ],
  },
  {
    id: 'range66',
    points: [
      { latitude: 36.792952, longitude: 127.103941 },
      { latitude: 36.793296, longitude: 127.103614 },
    ],
  },
  {
    id: 'bus_stop2',
    points: [
      { latitude: 36.793313, longitude: 127.103984 },
      { latitude: 36.793605, longitude: 127.103518 },
    ],
  },
  {
    id: 'bus_stop3',
    points: [
      { latitude: 36.793652, longitude: 127.103893 },
      { latitude: 36.794297, longitude: 127.103319 },
    ],
  },
  {
    id: 'bus_stop4',
    points: [
      { latitude: 36.794357, longitude: 127.103689 },
      { latitude: 36.794593, longitude: 127.103244 },
    ],
  },
  {
    id: 'bus_stop5',
    points: [
      { latitude: 36.794632, longitude: 127.103609 },
      { latitude: 36.795126, longitude: 127.103099 },
    ],
  },
  {
    id: 'range 67',
    points: [
      { latitude: 36.795139, longitude: 127.103442 },
      { latitude: 36.795306, longitude: 127.103036 },
    ],
  },
  {
    id: 'range 68',
    points: [
      { latitude: 36.795319, longitude: 127.103331 },
      { latitude: 36.79559, longitude: 127.10295 },
    ],
  },
  {
    id: 'range 69',
    points: [
      { latitude: 36.79559, longitude: 127.10295 },
      { latitude: 36.795371, longitude: 127.101931 },
    ],
  },
  {
    id: 'range 70',
    points: [
      { latitude: 36.795499, longitude: 127.101909 },
      { latitude: 36.795259, longitude: 127.101319 },
    ],
  },
  // 천안역 불당대로 사거리(펜타포트 위 부터)
  {
    id: 'range a',
    points: [
      { latitude: 36.800203, longitude: 127.100145 },
      { latitude: 36.800834, longitude: 127.101127 },
    ],
  },
  {
    id: 'range b',
    points: [
      { latitude: 36.800491, longitude: 127.101153 },
      { latitude: 36.800942, longitude: 127.101703 },
    ],
  },
  {
    id: 'range c',
    points: [
      { latitude: 36.800603, longitude: 127.10173 },
      { latitude: 36.801058, longitude: 127.102241 },
    ],
  },
  {
    id: 'range d',
    points: [
      { latitude: 36.800705, longitude: 127.102256 },
      { latitude: 36.801147, longitude: 127.102739 },
    ],
  },
  {
    id: 'range e',
    points: [
      { latitude: 36.800817, longitude: 127.102771 },
      { latitude: 36.801302, longitude: 127.103467 },
    ],
  },
  {
    id: 'range f',
    points: [
      { latitude: 36.80095, longitude: 127.103499 },
      { latitude: 36.801434, longitude: 127.104252 },
    ],
  },
  {
    id: 'range g',
    points: [
      { latitude: 36.801129, longitude: 127.104268 },
      { latitude: 36.801613, longitude: 127.105117 },
    ],
  },
  {
    id: 'range h',
    points: [
      { latitude: 36.801286, longitude: 127.105122 },
      { latitude: 36.801764, longitude: 127.106049 },
    ],
  },
  {
    id: 'range i',
    points: [
      { latitude: 36.801463, longitude: 127.106012 },
      { latitude: 36.801893, longitude: 127.106772 },
    ],
  },
  {
    id: 'range j',
    points: [
      { latitude: 36.80158, longitude: 127.106751 },
      { latitude: 36.801974, longitude: 127.107254 },
    ],
  },
  {
    id: 'range k',
    points: [
      { latitude: 36.80158, longitude: 127.106751 },
      { latitude: 36.801974, longitude: 127.107254 },
    ],
  },
  {
    id: 'range l',
    points: [
      { latitude: 36.801718, longitude: 127.107611 },
      { latitude: 36.802087, longitude: 127.108142 },
    ],
  },
  {
    id: 'range m',
    points: [
      { latitude: 36.801769, longitude: 127.108148 },
      { latitude: 36.802143, longitude: 127.108963 },
    ],
  },
  {
    id: 'range n',
    points: [
      { latitude: 36.801838, longitude: 127.108958 },
      { latitude: 36.802169, longitude: 127.109585 },
    ],
  },
  {
    id: 'range o',
    points: [
      { latitude: 36.801859, longitude: 127.10958 },
      { latitude: 36.80216, longitude: 127.109929 },
    ],
  },
  {
    id: 'range p',
    points: [
      { latitude: 36.801846, longitude: 127.109929 },
      { latitude: 36.802143, longitude: 127.110648 },
    ],
  },
  {
    id: 'range q',
    points: [
      { latitude: 36.802143, longitude: 127.110648 },
      { latitude: 36.801808, longitude: 127.111662 },
    ],
  },
  {
    id: 'range r',
    points: [
      { latitude: 36.802096, longitude: 127.111667 },
      { latitude: 36.801718, longitude: 127.112665 },
    ],
  },
  {
    id: 'range s',
    points: [
      { latitude: 36.802001, longitude: 127.112681 },
      { latitude: 36.801627, longitude: 127.113389 },
    ],
  },
  {
    id: 'range t',
    points: [
      { latitude: 36.80192, longitude: 127.113367 },
      { latitude: 36.801537, longitude: 127.114108 },
    ],
  },
  {
    id: 'range u',
    points: [
      { latitude: 36.801821, longitude: 127.114156 },
      { latitude: 36.801468, longitude: 127.114709 },
    ],
  },
  {
    id: 'range v',
    points: [
      { latitude: 36.801756, longitude: 127.114725 },
      { latitude: 36.801352, longitude: 127.11554 },
    ],
  },
  {
    id: 'range w',
    points: [
      { latitude: 36.80164, longitude: 127.115561 },
      { latitude: 36.801266, longitude: 127.116307 },
    ],
  },
  {
    id: 'range x',
    points: [
      { latitude: 36.801554, longitude: 127.116318 },
      { latitude: 36.801163, longitude: 127.117063 },
    ],
  },
  {
    id: 'range y',
    points: [
      { latitude: 36.801465, longitude: 127.1171 },
      { latitude: 36.801108, longitude: 127.117652 },
    ],
  },
  {
    id: 'range z',
    points: [
      { latitude: 36.801405, longitude: 127.117679 },
      { latitude: 36.801027, longitude: 127.118248 },
    ],
  },
  {
    id: 'range a2',
    points: [
      { latitude: 36.801323, longitude: 127.11828 },
      { latitude: 36.800915, longitude: 127.119047 },
    ],
  },
  {
    id: 'range a3',
    points: [
      { latitude: 36.801215, longitude: 127.119062 },
      { latitude: 36.800874, longitude: 127.119499 },
    ],
  },
  {
    id: 'range a4',
    points: [
      { latitude: 36.801162, longitude: 127.11952 },
      { latitude: 36.800792, longitude: 127.120062 },
    ],
  },
  {
    id: 'range a5',
    points: [
      { latitude: 36.801078, longitude: 127.120078 },
      { latitude: 36.800711, longitude: 127.12068 },
    ],
  },
  {
    id: 'range a6',
    points: [
      { latitude: 36.801003, longitude: 127.120706 },
      { latitude: 36.800651, longitude: 127.121066 },
    ],
  },
  {
    id: 'range a7',
    points: [
      { latitude: 36.800947, longitude: 127.121082 },
      { latitude: 36.800578, longitude: 127.121527 },
    ],
  },
  {
    id: 'range a8',
    points: [
      { latitude: 36.80087, longitude: 127.121552 },
      { latitude: 36.800509, longitude: 127.121981 },
    ],
  },
  {
    id: 'range a9',
    points: [
      { latitude: 36.80081, longitude: 127.122008 },
      { latitude: 36.800389, longitude: 127.122694 },
    ],
  },
  {
    id: 'range a10',
    points: [
      { latitude: 36.80069, longitude: 127.122732 },
      { latitude: 36.800329, longitude: 127.12307 },
    ],
  },
  {
    id: 'range a11',
    points: [
      { latitude: 36.800612, longitude: 127.123091 },
      { latitude: 36.800256, longitude: 127.123456 },
    ],
  },
  {
    id: 'range a12',
    points: [
      { latitude: 36.800561, longitude: 127.123462 },
      { latitude: 36.800157, longitude: 127.124068 },
    ],
  },
  {
    id: 'range a13',
    points: [
      { latitude: 36.800441, longitude: 127.124089 },
      { latitude: 36.80005, longitude: 127.124706 },
    ],
  },
  {
    id: 'range a14',
    points: [
      { latitude: 36.800333, longitude: 127.124738 },
      { latitude: 36.79999, longitude: 127.125071 },
    ],
  },
  {
    id: 'range a15',
    points: [
      { latitude: 36.800264, longitude: 127.125103 },
      { latitude: 36.799874, longitude: 127.125693 },
    ],
  },
  {
    id: 'range a16',
    points: [
      { latitude: 36.800157, longitude: 127.125725 },
      { latitude: 36.799831, longitude: 127.126074 },
    ],
  },
  {
    id: 'range a17',
    points: [
      { latitude: 36.800086, longitude: 127.126085 },
      { latitude: 36.799622, longitude: 127.126933 },
    ],
  },
  {
    id: 'range a18',
    points: [
      { latitude: 36.799906, longitude: 127.126975 },
      { latitude: 36.799519, longitude: 127.127394 },
    ],
  },
  {
    id: 'range a19',
    points: [
      { latitude: 36.799751, longitude: 127.127444 },
      { latitude: 36.799342, longitude: 127.127856 },
    ],
  },
  {
    id: 'range a20',
    points: [
      { latitude: 36.7996775, longitude: 127.1278855 },
      { latitude: 36.799103, longitude: 127.128382 },
    ],
  },
  {
    id: 'range a21',
    points: [
      { latitude: 36.799618, longitude: 127.128404 },
      { latitude: 36.798798, longitude: 127.128865 },
    ],
  },
  {
    id: 'range a21',
    points: [
      { latitude: 36, longitude: 127 },
      { latitude: 36, longitude: 127 },
    ],
  },
  {
    id: 'range a22',
    points: [
      { latitude: 36.799154, longitude: 127.128935 },
      { latitude: 36.798458, longitude: 127.129305 },
    ],
  },
  {
    id: 'range a23',
    points: [
      { latitude: 36.798858, longitude: 127.129385 },
      { latitude: 36.79805, longitude: 127.129831 },
    ],
  },
  {
    id: 'range a24',
    points: [
      { latitude: 36.798458, longitude: 127.129927 },
      { latitude: 36.797466, longitude: 127.130957 },
    ],
  },
  {
    id: 'range a25',
    points: [
      { latitude: 36.798493, longitude: 127.130705 },
      { latitude: 36.798643, longitude: 127.131065 },
    ],
  },
  {
    id: 'range a26',
    points: [
      { latitude: 36.798683, longitude: 127.130817 },
      { latitude: 36.799095, longitude: 127.131337 },
    ],
  },
  {
    id: 'range a27',
    points: [
      { latitude: 36.799156, longitude: 127.131122 },
      { latitude: 36.799472, longitude: 127.131368 },
    ],
  },
  {
    id: 'range a28',
    points: [
      { latitude: 36.799096, longitude: 127.131332 },
      { latitude: 36.799376, longitude: 127.131718 },
    ],
  },
  {
    id: 'range a29',
    points: [
      { latitude: 36.799285, longitude: 127.131723 },
      { latitude: 36.79956, longitude: 127.132222 },
    ],
  },
  {
    id: 'range a30',
    points: [
      { latitude: 36.799444, longitude: 127.132238 },
      { latitude: 36.799732, longitude: 127.132705 },
    ],
  },
  {
    id: 'range a31',
    points: [
      { latitude: 36.799741, longitude: 127.132726 },
      { latitude: 36.799882, longitude: 127.13314 },
    ],
  },
  {
    id: 'range a32',
    points: [
      { latitude: 36.799771, longitude: 127.133161 },
      { latitude: 36.800003, longitude: 127.133547 },
    ],
  },
  {
    id: 'range a33',
    points: [
      { latitude: 36.799908, longitude: 127.133563 },
      { latitude: 36.800127, longitude: 127.133912 },
    ],
  },
  {
    id: 'range a34',
    points: [
      { latitude: 36.800026, longitude: 127.133933 },
      { latitude: 36.134144, longitude: 127.134144 },
    ],
  },
  {
    id: 'range a35',
    points: [
      { latitude: 36.800108, longitude: 127.134187 },
      { latitude: 36.800366, longitude: 127.134638 },
    ],
  },
  {
    id: 'range a36',
    points: [
      { latitude: 36.800239, longitude: 127.134631 },
      { latitude: 36.800557, longitude: 127.135119 },
    ],
  },
  {
    id: 'range a37',
    points: [
      { latitude: 36.800432, longitude: 127.13513 },
      { latitude: 36.800925, longitude: 127.135945 },
    ],
  },
  {
    id: 'range a38',
    points: [
      { latitude: 36.800835, longitude: 127.135981 },
      { latitude: 36.801148, longitude: 127.13633 },
    ],
  },
  {
    id: 'range a39',
    points: [
      { latitude: 36.801033, longitude: 127.13634 },
      { latitude: 36.801359, longitude: 127.136763 },
    ],
  },
  {
    id: 'range a40',
    points: [
      { latitude: 36.801243, longitude: 127.13679 },
      { latitude: 36.801557, longitude: 127.137134 },
    ],
  },
  {
    id: 'range a41',
    points: [
      { latitude: 36.801428, longitude: 127.137144 },
      { latitude: 36.801793, longitude: 127.137627 },
    ],
  },
  {
    id: 'range a42',
    points: [
      { latitude: 36.801682, longitude: 127.137638 },
      { latitude: 36.801964, longitude: 127.138152 },
    ],
  },
  {
    id: 'range a43',
    points: [
      { latitude: 36.801861, longitude: 127.138163 },
      { latitude: 36.802149, longitude: 127.138715 },
    ],
  },
  {
    id: 'range a44',
    points: [
      { latitude: 36.802029, longitude: 127.138704 },
      { latitude: 36.802318, longitude: 127.139273 },
    ],
  },
  {
    id: 'range a45',
    points: [
      { latitude: 36.802206, longitude: 127.139268 },
      { latitude: 36.802469, longitude: 127.13995 },
    ],
  },
  {
    id: 'range a46',
    points: [
      { latitude: 36.802362, longitude: 127.139961 },
      { latitude: 36.802603, longitude: 127.140975 },
    ],
  },
  {
    id: 'range a47',
    points: [
      { latitude: 36.802487, longitude: 127.14098 },
      { latitude: 36.802714, longitude: 127.141817 },
    ],
  },
  {
    id: 'range a48',
    points: [
      { latitude: 36.802618, longitude: 127.14181 },
      { latitude: 36.802854, longitude: 127.14277 },
    ],
  },
  {
    id: 'range a49',
    points: [
      { latitude: 36.802747, longitude: 127.14277 },
      { latitude: 36.803039, longitude: 127.143489 },
    ],
  },
  {
    id: 'range a50',
    points: [
      { latitude: 36.803056, longitude: 127.143538 },
      { latitude: 36.804272, longitude: 127.14276 },
    ],
  },
  {
    id: 'range a51',
    points: [
      { latitude: 36.804349, longitude: 127.1435 },
      { latitude: 36.804834, longitude: 127.142679 },
    ],
  },
  {
    id: 'range a52',
    points: [
      { latitude: 36.804859, longitude: 127.143423 },
      { latitude: 36.805705, longitude: 127.142559 },
    ],
  },
  {
    id: 'range a53',
    points: [
      { latitude: 36.805709, longitude: 127.143283 },
      { latitude: 36.806691, longitude: 127.14242 },
    ],
  },
  {
    id: 'range a54',
    points: [
      { latitude: 36.806678, longitude: 127.143278 },
      { latitude: 36.808855, longitude: 127.142264 },
    ],
  },
  {
    id: 'range a55',
    points: [
      { latitude: 36.808855, longitude: 127.142264 },
      { latitude: 36.809426, longitude: 127.142505 },
    ],
  },
  {
    id: 'range a56',
    points: [
      { latitude: 36.808838, longitude: 127.143058 },
      { latitude: 36.809345, longitude: 127.143364 },
    ],
  },
  {
    id: 'range a57',
    points: [
      { latitude: 36.809435, longitude: 127.142404 },
      { latitude: 36.809998, longitude: 127.142581 },
    ],
  },
  {
    id: 'range a58',
    points: [
      { latitude: 36.809371, longitude: 127.143235 },
      { latitude: 36.809985, longitude: 127.143423 },
    ],
  },
  {
    id: 'range a59',
    points: [
      { latitude: 36.809422, longitude: 127.143444 },
      { latitude: 36.810127, longitude: 127.144013 },
    ],
  },
  {
    id: 'bus_stop6',
    points: [
      { latitude: 36.809968, longitude: 127.143439 },
      { latitude: 36.810234, longitude: 127.1425 },
    ],
  },
  {
    id: 'range a60',
    points: [
      { latitude: 36.79952, longitude: 127.128868 },
      { latitude: 36.799348, longitude: 127.129431 },
    ],
  },
  {
    id: 'range a61',
    points: [
      { latitude: 36.799348, longitude: 127.129431 },
      { latitude: 36.799549, longitude: 127.129977 },
    ],
  },
  {
    id: 'range a62',
    points: [
      { latitude: 36.799435, longitude: 127.12998 },
      { latitude: 36.799676, longitude: 127.130484 },
    ],
  },
  {
    id: 'range a63',
    points: [
      { latitude: 36.799557, longitude: 127.130516 },
      { latitude: 36.799802, longitude: 127.130988 },
    ],
  },
  {
    id: 'range a64',
    points: [
      { latitude: 36.799471, longitude: 127.130998 },
      { latitude: 36.799944, longitude: 127.131583 },
    ],
  },
  {
    id: 'range a65',
    points: [
      { latitude: 36.799922, longitude: 127.131165 },
      { latitude: 36.800627, longitude: 127.131701 },
    ],
  },
  {
    id: 'range a66',
    points: [
      { latitude: 36.800653, longitude: 127.131331 },
      { latitude: 36.801215, longitude: 127.131728 },
    ],
  },
  {
    id: 'range a67',
    points: [
      { latitude: 36.80122, longitude: 127.131524 },
      { latitude: 36.801757, longitude: 127.131782 },
    ],
  },
  {
    id: 'range a68',
    points: [
      { latitude: 36.801787, longitude: 127.131631 },
      { latitude: 36.802357, longitude: 127.131878 },
    ],
  },
  {
    id: 'range a69',
    points: [
      { latitude: 36.802356, longitude: 127.131737 },
      { latitude: 36.802791, longitude: 127.131957 },
    ],
  },
];

module.exports = ranges;
