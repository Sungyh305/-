const ranges = [
  {
    id: "bus_stop1",
    points: [
      { latitude: 36.800334, longitude: 127.071074 },
      { latitude: 36.800560, longitude: 127.072097 }
    ]
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
    id: "range1",
    points: [
      { latitude: 36.799575, longitude: 127.070862 },
      { latitude: 36.800333, longitude: 127.071870 }
    ]
  },
  {
    id: "range2",
    points: [
      { latitude: 36.797856, longitude: 127.071675 },
      { latitude: 36.799574, longitude: 127.071975 }
    ]
  },
  {
    id: "range3",
    points: [
      { latitude: 36.797856, longitude: 127.071976 },
      { latitude: 36.798184, longitude: 127.078138 }
    ]
  },
  {
    id: "range4",
    points: [
      { latitude: 36.799379, longitude: 127.073908 },
      { latitude: 36.799569, longitude: 127.078138 }
    ]
  },
  {
    id: "range5",
    points: [
      { latitude: 36.798185, longitude: 127.077816 },
      { latitude: 36.799378, longitude: 127.078138 }
    ]
  },
  {
    id: "range6",
    points: [
      { latitude: 36.797494, longitude: 127.078139 },
      { latitude: 36.798145, longitude: 127.079176 }
    ]
  },
  {
    id: "range7",
    points: [
      { latitude: 36.797494, longitude: 127.079177 },
      { latitude: 36.797855, longitude: 127.081586 }
    ]
  },
  {
    id: "range8",
    points: [
      { latitude: 36.797428, longitude: 127.081587 },
      { latitude: 36.797650, longitude: 127.085760 }
    ]
  },
  {
    id: "range9",
    points: [
      { latitude: 36.797805, longitude: 127.085800 },
      { latitude: 36.797185, longitude: 127.086250 }
    ]
  },
  {
    id: "range10",
    points: [
      { latitude: 37.797808, longitude: 127.086280 },
      { latitude: 36.799798, longitude: 127.085875 }
    ]
  },
  {
    id: "range11",
    points: [
      { latitude: 36.799844, longitude: 127.085991 },
      { latitude: 36.800246, longitude: 127.085618 }
    ]
  },
  {
    id: "range12",
    points: [
      { latitude: 36.800246, longitude: 127.085618 },
      { latitude: 36.800477, longitude: 127.086715 }
    ]
  },
  {
    id: "range13",
    points: [
      { latitude: 36.800477, longitude: 127.086715 },
      { latitude: 36.797924, longitude: 127.087310 }
    ]
  },
  {
    id: "range14",
    points: [
      { latitude: 36.797920, longitude: 127.087028 },
      { latitude: 36.797000, longitude: 127.087574}
    ]
  },
  {
    id: "range15",
    points: [
      { latitude: 36.796976, longitude: 127.087537 },
      { latitude: 36.795857, longitude: 127.087780}
    ]
  },
  {
    id: "range16",
    points: [
      { latitude: 36.795860, longitude: 127.087786 },
      { latitude: 36.795307, longitude: 127.087174}
    ]
  },
  {
    id: "range17",
    points: [
      { latitude: 36.797190, longitude: 127.086169 },
      { latitude: 36.796397, longitude: 127.085773}
    ]
  },
  {
    id: "range18",
    points: [
      { latitude: 36.796400, longitude: 127.085915},
      { latitude: 36.795444, longitude: 127.085711}
    ]
  },
  {
    id: "range19",
    points: [
      { latitude: 36.795427, longitude: 127.085420},
      { latitude: 36.794314, longitude: 127.086050}
    ]
  },
  {
    id: "range20",
    points: [
      { latitude: 36.794834, longitude: 127.086004},
      { latitude: 36.795311, longitude: 127.086630}
    ]
  },
  {
    id: "range21",
    points: [
      { latitude: 36.795158, longitude: 127.086661},
      { latitude: 36.795698, longitude: 127.087167}
    ]
  },
  {
    id: "range22",
    points: [
      { latitude: 36.795688, longitude: 127.087811},
      { latitude: 36.796356, longitude: 127.088446}
    ]
  },
  {
    id: "range23",
    points: [
      { latitude: 36.796022, longitude: 127.088526},
      { latitude: 36.796829, longitude: 127.089348}
    ]
  },
  {
    id: "range24",
    points: [
      { latitude: 36.796424, longitude: 127.089365},
      { latitude: 36.796893, longitude: 127.089463}
    ]
  },
  {
    id: "range25",
    points: [
      { latitude: 36.796633, longitude: 127.089730},
      { latitude: 36.797213, longitude: 127.090089}
    ]
  },
  {
    id: "range26",
    points: [
      { latitude: 36.797334, longitude: 127.091084},
      { latitude: 36.797874, longitude: 127.091364}
    ]
  },
  {
    id: "range27",
    points: [
      { latitude: 36.797522, longitude: 127.091439},
      { latitude: 36.797629, longitude: 127.090893}
    ]
  },
  {
    id: "range28",
    points: [
      { latitude: 36.797270, longitude: 127.090955},
      { latitude: 36.797828, longitude: 127.091278}
    ]
  },
  {
    id: "range29",
    points: [
      { latitude: 36.797490, longitude: 127.091362},
      { latitude: 36.798084, longitude: 127.091766}
    ]
  },
  {
    id: "range30",
    points: [
      { latitude: 36.797743, longitude: 127.091846},
      { latitude: 36.798266, longitude: 127.092144}
    ]
  },
  {
    id: "range31",
    points: [
      { latitude: 36.797931, longitude: 127.092197},
      { latitude: 36.798507, longitude: 127.092619}
    ]
  },
  {
    id: "range32",
    points: [
      { latitude: 36.798127, longitude: 127.092628},
      { latitude: 36.798646, longitude: 127.092944}
    ]
  },
  {
    id: "range33",
    points: [
      { latitude: 36.798283, longitude: 127.092935},
      { latitude: 36.798841, longitude: 127.093334}
    ]
  },
  {
    id: "range34",
    points: [
      { latitude: 36.798521, longitude: 127.093392},
      { latitude: 36.799038, longitude: 127.093772}
    ]
  },
  {
    id: "range35",
    points: [
      { latitude: 36.798714, longitude: 127.093782},
      { latitude: 36.799188, longitude: 127.094175}
    ]
  },
  {
    id: "range36",
    points: [
      { latitude: 36.798867, longitude: 127.094206},
      { latitude: 36.799483, longitude: 127.094924}
    ]
  },
  {
    id: "range37",
    points: [
      { latitude: 36.799177, longitude: 127.094979},
      { latitude: 36.799613, longitude: 127.095369}
    ]
  },
  {
    id: "range38",
    points: [
      { latitude: 36.799312, longitude: 127.095411},
      { latitude: 36.799677, longitude: 127.095576}
    ]
  },
  {
    id: "range39",
    points: [
      { latitude: 36.799373, longitude: 127.095628},
      { latitude: 36.799818, longitude: 127.096115}
    ]
  },
  {
    id: "range40",
    points: [
      { latitude: 36.799500, longitude: 127.096149},
      { latitude: 36.799975, longitude: 127.096667}
    ]
  },
  {
    id: "range41",
    points: [
      { latitude: 36.799649, longitude: 127.096719},
      { latitude: 36.800086, longitude: 127.097077}
    ]
  },
  {
    id: "range42",
    points: [
      { latitude: 36.799754, longitude: 127.097112},
      { latitude: 36.800213, longitude: 127.097554}
    ]
  },
  {
    id: "range43",
    points: [
      { latitude: 36.799901, longitude: 127.097625},
      { latitude: 36.800282, longitude: 127.097984}
    ]
  },
  {
    id: "range44",
    points: [
      { latitude: 36.799972, longitude: 127.098008},
      { latitude: 36.800351, longitude: 127.098401}
    ]
  },
  {
    id: "range45",
    points: [
      { latitude: 36.800030, longitude: 127.098435},
      { latitude: 36.800434, longitude: 127.098898}
    ]
  },
  {
    id: "range46",
    points: [
      { latitude: 36.800099, longitude: 127.098922},
      { latitude: 36.800525, longitude: 127.099494}
    ]
  },
  {
    id: "range47",
    points: [
      { latitude: 36.800525 ,longitude: 127.099494},
      { latitude: 36.799970, longitude: 127.100153}
    ]
  },
  {
    id: "range48",
    points: [
      { latitude: 36.799953 ,longitude: 127.099618},
      { latitude: 36.799547, longitude: 127.100243}
    ]
  },
  {
    id: "range49",
    points: [
      { latitude: 36.799539 ,longitude: 127.099739},
      { latitude: 36.798917, longitude: 127.100394}
    ]
  },
  {
    id: "range50",
    points: [
      { latitude: 36.798908 ,longitude: 127.099902},
      { latitude: 36.798051, longitude: 127.100588}
    ]
  },
  {
    id: "range51",
    points: [
      { latitude: 36.798054 ,longitude: 127.100225},
      { latitude: 36.797449, longitude: 127.100753}
    ]
  },
  {
    id: "range52",
    points: [
      { latitude: 36.797414 ,longitude: 127.100362},
      { latitude: 36.799783, longitude: 127.100923}
    ]
  },
  {
    id: "range53",
    points: [
      { latitude: 36.796780 ,longitude: 127.100519},
      { latitude: 36.796117, longitude: 127.101085}
    ]
  },
  {
    id: "range54",
    points: [
      { latitude: 36.796108 ,longitude: 127.100681},
      { latitude: 36.795396, longitude: 127.101270}
    ]
  },
  {
    id: "range55",
    points: [
      { latitude: 36.795370 ,longitude: 127.100838},
      { latitude: 36.795134, longitude: 127.101327}
    ]
  },
  {
    id: "range56",
    points: [
      { latitude: 36.795154,longitude: 127.100873},
      { latitude: 36.794527,longitude: 127.101490}
    ]
  },
];

module.exports = ranges;