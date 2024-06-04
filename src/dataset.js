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
  {
    id: "range57",
    points: [
      { latitude: 36.794501,longitude: 127.101029},
      { latitude: 36.793895,longitude: 127.101667}
    ]
  },
  {
    id: "range58",
    points: [
      { latitude: 36.793861,longitude: 127.101200},
      { latitude: 36.793240,longitude: 127.101833}
    ]
  },
  {
    id: "range59",
    points: [
      { latitude: 36.793189,longitude: 127.101388},
      { latitude: 36.792596,longitude: 127.102021}
    ]
  },
  {
    id: "range60",
    points: [
      { latitude: 36.792536,longitude: 127.101581},
      { latitude: 36.791861,longitude: 127.102236}
    ]
  },
  {
    id: "range61",
    points: [
      { latitude: 36.792351,longitude: 127.102236},
      { latitude: 36.792583,longitude: 127.102514}
    ]
  },
  {
    id: "range62",
    points: [
      { latitude: 36.792437,longitude: 127.102547},
      { latitude: 36.792682,longitude: 127.103029}
    ]
  },
  {
    id: "range63",
    points: [
      { latitude: 36.792531,longitude: 127.103029},
      { latitude: 36.792780,longitude: 127.103491}
    ]
  },
  {
    id: "range64",
    points: [
      { latitude: 36.792613,longitude: 127.103523},
      { latitude: 36.792866,longitude: 127.103888}
    ]
  },
  {
    id: "range65",
    points: [
      { latitude: 36.792879,longitude: 127.103609},
      { latitude: 36.792952,longitude: 127.103941}
    ]
  },
  {
    id: "range66",
    points: [
      { latitude: 36.792952,longitude: 127.103941},
      { latitude: 36.793296,longitude: 127.103614}
    ]
  },
  {
    id: "bus_stop2",
    points: [
      { latitude: 36.793313,longitude: 127.103984},
      { latitude: 36.793605,longitude: 127.103518}
    ]
  },
  {
    id: "bus_stop3",
    points: [
      { latitude: 36.793652,longitude: 127.103893},
      { latitude: 36.794297,longitude: 127.103319}
    ]
  },
  {
    id: "bus_stop4",
    points: [
      { latitude: 36.794357,longitude: 127.103689},
      { latitude: 36.794593,longitude: 127.103244}
    ]
  },
  {
    id: "bus_stop5",
    points: [
      { latitude: 36.794632,longitude: 127.103609},
      { latitude: 36.795126,longitude: 127.103099}
    ]
  },
  {
    id: "range 67",
    points: [
      { latitude: 36.795139,longitude: 127.103442},
      { latitude: 36.795306,longitude: 127.103036}
    ]
  },
  {
    id: "range 68",
    points: [
      { latitude: 36.795319,longitude: 127.103331},
      { latitude: 36.795590,longitude: 127.102950}
    ]
  },
  {
    id: "range 69",
    points: [
      { latitude: 36.795590,longitude: 127.102950},
      { latitude: 36.795371,longitude: 127.101931}
    ]
  },
  {
    id: "range 70",
    points: [
      { latitude: 36.795499,longitude: 127.101909},
      { latitude: 36.795259,longitude: 127.101319}
    ]
  },
  {
    id: "range 71",
    points: [
      { latitude: 36.801686 ,longitude: 127.105239},
      { latitude: 36.802046, longitude: 127.105758}
    ]
  },
  {
    id: "range72",
    points: [
      { latitude: 36.802099 ,longitude: 127.105359},
      { latitude: 36.802518, longitude: 127.105869}
    ]
  },
  {
    id: "range73",
    points: [
      { latitude: 36.802531 ,longitude: 127.105454},
      { latitude: 36.802818, longitude: 127.105936}
    ]
  },
  {
    id: "range74",
    points: [
      { latitude: 36.802986 ,longitude: 127.105576},
      { latitude: 36.803597, longitude: 127.106212}
    ]
  },
  {
    id: "range75",
    points: [
      { latitude: 36.803631 ,longitude: 127.105778},
      { latitude: 36.804168, longitude: 127.106404}
    ]
  },
  {
    id: "range76",
    points: [
      { latitude: 36.804188 ,longitude: 127.105983},
      { latitude: 36.804694, longitude: 127.106563}
    ]
  },
  {
    id: "range77",
    points: [
      { latitude: 36.804714 ,longitude: 127.106104},
      { latitude: 36.805409, longitude: 127.106752}
    ]
  },
  {
    id: "range78",
    points: [
      { latitude: 36.805403 ,longitude: 127.106418},
      { latitude: 36.806122, longitude: 127.106968}
    ]
  },
  {
    id: "range79",
    points: [
      { latitude: 36.806147 ,longitude: 127.106642},
      { latitude: 36.807043, longitude: 127.107247}
    ]
  },
  {
    id: "range80",
    points: [
      { latitude: 36.807043 ,longitude: 127.106906},
      { latitude: 36.808200, longitude: 127.107603}
    ]
  },
  {
    id: "range81",
    points: [
      { latitude: 36.808225 ,longitude: 127.107258},
      { latitude: 36.809394, longitude: 127.107971}
     ]
  },
  {
    id: "range82",
    points: [
      { latitude: 36.809394 ,longitude: 127.107628},
      { latitude: 36.810001, longitude: 127.108131}
    ]
  },
  {
    id: "range83",
    points: [
      { latitude: 36.809981 ,longitude: 127.107780},
      { latitude: 36.810581, longitude: 127.108321}
    ]
  },
  {
    id: "range84",
    points: [
      { latitude: 36.810590 ,longitude: 127.107997},
      { latitude: 36.811296, longitude: 127.108522}
    ]
  },
  {
    id: "range85",
    points: [
      { latitude: 36.811285 ,longitude: 127.108206},
      { latitude: 36.812499, longitude: 127.108882}
    ]
  },
  {
    id: "range86",
    points: [
      { latitude: 36.812495 ,longitude: 127.108559},
      { latitude: 36.813025, longitude: 127.109046}
    ]
  },
  {
    id: "range87",
    points: [
      { latitude: 36.813040 ,longitude: 127.108718},
      { latitude: 36.813384, longitude: 127.109167}
    ]
  },
  {
    id: "range88",
    points: [
      { latitude: 36.813403 ,longitude: 127.108839},
      { latitude: 36.815147, longitude: 127.109714}
    ]
  },
  {
    id: "range89",
    points: [
      { latitude: 36.815163 ,longitude: 127.109370},
      { latitude: 36.815679, longitude: 127.109886}
    ]
  },
  {
    id: "range90",
    points: [
      { latitude: 36.815691 ,longitude: 127.109529},
      { latitude: 36.816220, longitude: 127.110041}
    ]
  },
  {
    id: "range91",
    points: [
      { latitude: 36.816237 ,longitude: 127.109712},
      { latitude: 36.816728, longitude: 127.110202}
    ]
  },
  {
    id: "range92",
    points: [
      { latitude: 36.816741 ,longitude: 127.109837},
      { latitude: 36.817539, longitude: 127.110454}
    ]
  },
  {
    id: "range93",
    points: [
      { latitude: 36.817591 ,longitude: 127.109944},
      { latitude: 36.818288, longitude: 127.110632}
    ]
  },
  {
    id: "range94",
    points: [
      { latitude: 36.818306 ,longitude: 127.110379},
      { latitude: 36.819121, longitude: 127.110950}
    ]
  },
  {
    id: "range95",
    points: [
      { latitude: 36.819160 ,longitude: 127.110582},
      { latitude: 36.819946, longitude: 127.111188}
    ]
  },
  {
    id: "range96",
    points: [
      { latitude: 36.819963 ,longitude: 127.110837},
      { latitude: 36.820702, longitude: 127.111483}
    ]
  },
  {
    id: "range97",
    points: [
      { latitude: 36.820738 ,longitude: 127.111100},
      { latitude: 36.821597, longitude: 127.111741}
    ]
  },
  {
    id: "range98",
    points: [
      { latitude: 36.821618 ,longitude: 127.111343},
      { latitude: 36.822488, longitude: 127.111983}
    ]
  },
  {
    id: "range99",
    points: [
      { latitude: 36.822500 ,longitude: 127.111562},
      { latitude: 36.823029, longitude: 127.112275}
    ]
  },
  {
    id: "range100",
    points: [
      { latitude: 36.823022 ,longitude: 127.112301},
      { latitude: 36.822635, longitude: 127.112881}
    ]
  },
  {
    id: "range101",
    points: [
      { latitude: 36.822927 ,longitude: 127.112891},
      { latitude: 36.822640, longitude: 127.113508}
    ]
  },
  {
    id: "range102",
    points: [
      { latitude: 36.822640 ,longitude: 127.113508},
      { latitude: 36.822842, longitude: 127.114104}
    ]
  },
  {
    id: "range103",
    points: [
      { latitude: 36.822837 ,longitude: 127.114131},
      { latitude: 36.822665, longitude: 127.114887}
    ]
  },
  {
    id: "range104",
    points: [
      { latitude: 36.822806 ,longitude: 127.114911},
      { latitude: 36.822665, longitude: 127.115534}
    ]
  },
  {
    id: "range105",
    points: [
      { latitude: 36.822665 ,longitude: 127.115534},
      { latitude: 36.822793, longitude: 127.116205}
    ]
  },
  {
    id: "range106",
    points: [
      { latitude: 36.822793 ,longitude: 127.116205},
      { latitude: 36.822701, longitude: 127.116607}
    ]
  },
  {
    id: "range107",
    points: [
      { latitude: 36.822700 ,longitude: 127.116634},
      { latitude: 36.822877, longitude: 127.117270}
    ]
  },
  {
    id: "range108",
    points: [
      { latitude: 36.822772 ,longitude: 127.117288},
      { latitude: 36.823059, longitude: 127.118103}
    ]
  },
  {
    id: "range109",
    points: [
      { latitude: 36.822846 ,longitude: 127.118167},
      { latitude: 36.823110, longitude: 127.119210}
    ]
  },
  {
    id: "range110",
    points: [
      { latitude: 36.823004 ,longitude: 127.119252},
      { latitude: 36.823408, longitude: 127.121399}
    ]
  },
  {
    id: "range111",
    points: [
      { latitude: 36.823305 ,longitude: 127.121422},
      { latitude: 36.823532, longitude: 127.122530}
    ]
  },
  {
    id: "range112",
    points: [
      { latitude: 36.823426 ,longitude: 127.122545},
      { latitude: 36.823706, longitude: 127.123808}
    ]
  },
  {
    id: "range113",
    points: [
      { latitude: 36.823526 ,longitude: 127.123827},
      { latitude: 36.823876, longitude: 127.124331}
    ]
  },
  {
    id: "range114",
    points: [
      { latitude: 36.823778 ,longitude: 127.124381},
      { latitude: 36.824114, longitude: 127.125109}
    ]
  },
  {
    id: "range115",
    points: [
      { latitude: 36.823994 ,longitude: 127.125120},
      { latitude: 36.824487, longitude: 127.126268}
    ]
  },
  {
    id: "range116",
    points: [
      { latitude: 36.824359 ,longitude: 127.126284},
      { latitude: 36.824818, longitude: 127.127260}
    ]
  },
  {
    id: "range117",
    points: [
      { latitude: 36.824686 ,longitude: 127.127243},
      { latitude: 36.825169, longitude: 127.128439}
    ]
  },
  {
    id: "range118",
    points: [
      { latitude: 36.825064 ,longitude: 127.128458},
      { latitude: 36.825538, longitude: 127.129646}
    ]
  },
  {
    id: "range119",
    points: [
      { latitude: 36.825435 ,longitude: 127.129651},
      { latitude: 36.826009, longitude: 127.131100}
    ]
  },
  {
    id: "range120",
    points: [
      { latitude: 36.825908 ,longitude: 127.131124},
      { latitude: 36.826575, longitude: 127.133055}
    ]
  },
  {
    id: "range121",
    points: [
      { latitude: 36.826575 ,longitude: 127.133055},
      { latitude: 36.826073, longitude: 127.135306}
    ]
  },
  {
    id: "range122",
    points: [
      { latitude: 36.826311 ,longitude: 127.135249},
      { latitude: 36.825796, longitude: 127.137108}
    ]
  },
  {
    id: "range123",
    points: [
      { latitude: 36.826056 ,longitude: 127.137137},
      { latitude: 36.825693, longitude: 127.138149}
    ]
  },
  {
    id: "range124",
    points: [
      { latitude: 36.825800 ,longitude: 127.138141},
      { latitude: 36.825611, longitude: 127.139160}
    ]
  },
  {
    id: "range125",
    points: [
      { latitude: 36.825850 ,longitude: 127.139152},
      { latitude: 36.825562, longitude: 127.140230}
    ]
  },
  {
    id: "range126",
    points: [
      { latitude: 36.825562 ,longitude: 127.140230},
      { latitude: 36.825682, longitude: 127.140970}
    ]
  },
  {
    id: "range127",
    points: [
      { latitude: 36.825644 ,longitude: 127.140970},
      { latitude: 36.825412, longitude: 127.142725}
    ]
  },
  {
    id: "range128",
    points: [
      { latitude: 36.825502 ,longitude: 127.142725},
      { latitude: 36.825264, longitude: 127.144479}
    ]
  },
  {
    id: "range129",
    points: [
      { latitude: 36.825401 ,longitude: 127.144500},
      { latitude: 36.825085, longitude: 127.145203}
    ]
  },
  {
    id: "range130",
    points: [
      { latitude: 36.825420 ,longitude: 127.145222},
      { latitude: 36.824865, longitude: 127.147951}
    ]
  },
  {
    id: "range131",
    points: [
      { latitude: 36.825217 ,longitude: 127.147959},
      { latitude: 36.824767, longitude: 127.149464}
    ]
  },
  {
    id: "range132",
    points: [
      { latitude: 36.825509 ,longitude: 127.149488},
      { latitude: 36.824494, longitude: 127.152409}
    ]
  },
  {
    id: "range133",
    points: [
      { latitude: 36.824494 ,longitude: 127.152409},
      { latitude: 36.824861, longitude: 127.152688}
    ]
  },
  {
    id: "range134",
    points: [
      { latitude: 36.824541 ,longitude: 127.153026},
      { latitude: 36.824861, longitude: 127.156054}
    ]
  },
  {
    id: "range135",
    points: [
      { latitude: 36.824606 ,longitude: 127.156070},
      { latitude: 36.824874, longitude: 127.158790}
    ]
  },
  {
    id: "range136",
    points: [
      { latitude: 36.824874 ,longitude: 127.158790},
      { latitude: 36.824704, longitude: 127.159241}
    ]
  },
  {
    id: "range137",
    points: [
      { latitude: 36.824803 ,longitude: 127.159238},
      { latitude: 36.824556, longitude: 127.159595}
    ]
  },
  {
    id: "range138",
    points: [
      { latitude: 36.824668 ,longitude: 127.159597},
      { latitude: 36.824341, longitude: 127.159965}
    ]
  },
  {
    id: "range139",
    points: [
      { latitude: 36.824449 ,longitude: 127.159978},
      { latitude: 36.824163, longitude: 127.160196}
    ]
  },
  {
    id: "range140",
    points: [
      { latitude: 36.824103 ,longitude: 127.160410},
      { latitude: 36.823707, longitude: 127.160713}
    ]
  },
  {
    id: "range141",
    points: [
      { latitude: 36.823708 ,longitude: 127.160553},
      { latitude: 36.823473, longitude: 127.160968}
    ]
  },
  {
    id: "range142",
    points: [
      { latitude: 36.823451 ,longitude: 127.160697},
      { latitude: 36.823159, longitude: 127.161283}
    ]
  },
  {
    id: "range143",
    points: [
      { latitude: 36.823188 ,longitude: 127.160855},
      { latitude: 36.822787, longitude: 127.161572}
    ]
  },
  {
    id: "range144",
    points: [
      { latitude: 36.822780 ,longitude: 127.161162},
      { latitude: 36.822451, longitude: 127.161852}
    ]
  },
  {
    id: "range145",
    points: [
      { latitude: 36.822437 ,longitude: 127.161459},
      { latitude: 36.821956, longitude: 127.162245}
    ]
  },
  {
    id: "range146",
    points: [
      { latitude: 36.821946 ,longitude: 127.161854},
      { latitude: 36.821653, longitude: 127.162510}
    ]
  },
  {
    id: "range147",
    points: [
      { latitude: 36.821665 ,longitude: 127.162501},
      { latitude: 36.820916, longitude: 127.162018}
    ]
  },
  {
    id: "range148",
    points: [
      { latitude: 36.821334 ,longitude: 127.162501},
      { latitude: 36.820637, longitude: 127.161565}
    ]
  },
  {
    id: "range149",
    points: [
      { latitude: 36.820984 ,longitude: 127.161557},
      { latitude: 36.820372, longitude: 127.161133}
    ]
  },
  {
    id: "range150",
    points: [
      { latitude: 36.820712 ,longitude: 127.161098},
      { latitude: 36.820098, longitude: 127.160685}
    ]
  },
  {
    id: "range151",
    points: [
      { latitude: 36.820452 ,longitude: 127.160667},
      { latitude: 36.819808, longitude: 127.160200}
    ]
  },
  {
    id: "range152",
    points: [
      { latitude: 36.820179 ,longitude: 127.160219},
      { latitude: 36.819554, longitude: 127.159763}
    ]
  },
  {
    id: "range153",
    points: [
      { latitude: 36.819913 ,longitude: 127.159760},
      { latitude: 36.819286, longitude: 127.159307}
    ]
  },
  {
    id: "range154",
    points: [
      { latitude: 36.819638 ,longitude: 127.159293},
      { latitude: 36.818940, longitude: 127.158658}
    ]
  },
  {
    id: "range155",
    points: [
      { latitude: 36.819267 ,longitude: 127.158644},
      { latitude: 36.818856, longitude: 127.157775}
    ]
  },
  {
    id: "range156",
    points: [
      { latitude: 36.819144 ,longitude: 127.157789},
      { latitude: 36.818690, longitude: 127.155013}
    ]
  },

   {
    id: "range157",
    points: [
      { latitude: 36.818982 ,longitude: 127.155002},
      { latitude: 36.818523, longitude: 127.152934}
    ]
  },
  {
    id: "range158",
    points: [
      { latitude: 36.818628 ,longitude: 127.152931},
      { latitude: 36.818860, longitude: 127.152001}
    ]
  },
  {
    id: "range159",
    points: [
      { latitude: 36.818869 ,longitude: 127.152121},
      { latitude: 36.819038, longitude: 127.151899}
    ]
  },
  {
    id: "range160",
    points: [
      { latitude: 36.819041 ,longitude: 127.152019},
      { latitude: 36.819324, longitude: 127.151719}
    ]
  },
  {
    id: "range161",
    points: [
      { latitude: 36.819346 ,longitude: 127.151826},
      { latitude: 36.819572, longitude: 127.151606}
    ]
  },
  {
    id: "range162",
    points: [
      { latitude: 36.819572 ,longitude: 127.151606},
      { latitude: 36.820553, longitude: 127.152000}
    ]
  },
  {
    id: "range163",
    points: [
      { latitude: 36.820546 ,longitude: 127.151900},
      { latitude: 36.820926, longitude: 127.152114}
    ]
  },
  {
    id: "range164",
    points: [
      { latitude: 36.821337 ,longitude: 127.152114},
      { latitude: 36.821373, longitude: 127.152232}
    ]
  },
  {
    id: "range165",
    points: [
      { latitude: 36.821381 ,longitude: 127.152109},
      { latitude: 36.821922, longitude: 127.152369}
    ]
  },
  {
    id: "range166",
    points: [
      { latitude: 36.821918 ,longitude: 127.152254},
      { latitude: 36.822455, longitude: 127.152495}
    ]
  },
  {
    id: "range167",
    points: [
      { latitude: 36.822459 ,longitude: 127.152380},
      { latitude: 36.823176, longitude: 127.152677}
    ]
  },
  {
    id: "range168",
    points: [
      { latitude: 36.823193 ,longitude: 127.152559},
      { latitude: 36.823550, longitude: 127.152774}
    ]
  },
  {
    id: "range169",
    points: [
      { latitude: 36.823552 ,longitude: 127.152643},
      { latitude: 36.824464, longitude: 127.153010}
    ]
  },

];

module.exports = ranges;