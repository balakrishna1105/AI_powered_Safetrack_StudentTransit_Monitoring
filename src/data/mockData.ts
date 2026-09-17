import { Student, Waypoint, BusTrip, SafetyAlert, HistoricalTrip } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WSZfqfnciSc2DhmodyB8p4DVl3aoyzdpr6vgIcilkCAoJIuC3oPmK0hd4qBERzdSUldiddKsoqdBoEvG5ZPKL4H3mJAYZcYX84T5i5Q736UbRqcFqLH84MIDtjJ-HQHcAMzQp8f6AEkBJKT8-FVCpKVHkyq-F2Dw_SY0azysmqJdO8X7NIzual8MvrxI37d4cupTyjUcqDta13TYGTMpM3acdrj7lgATdLLGKH4kMSNMqKFB4xjwv8lw',
  sarahGuardian: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQfOOBJb4Fs5GW21E-ecVjtaypGV_lhgnt5yecVf8u2pSe40V0j0iZfe0rnIQ4nMs1Glcow3wdq8wqANqcItd4FB6sxc5gGUiIROvNS6qfPayJOGu6hwsN3qml7vnQPv9KgejQu-5cjKo8IN2zRQWGk0sIXEziiCzT0fwgNn7uiohrAo899cfkkSIJldKuik2g1GkDYsjartLqMYcPqg4QCpR6umMQDoUoOpM6mZZa76DgNL9Jtzw',
  rahulStudent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgVm6s_Q54yGZHlH2y3Ex8DLQfuw6R5CTBc5xfXxthclmqhAFc7-IWMFkw69U3WuBP8rCCXY7ZnlgWJHcauj4-p-tciKSTPN1LIT_uB0uEhXAucwv5xv-Auk9CcA0GknYnDMC1K14maWgnHxZCyoNgwO-Ro3vW3HVeedIG4UJlBpvsquL_25ZUgzJuQOs-qVetwucenQkoFb_lWl-BCf_FWfnmHRELoorFYa_bC4O1DwYhbgR9P-4',
  aaravStudent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOV-rOQDFKXf8Q6yTJQ4_uRtOz9rue4qev4RM96c_N53wBdW23-y0QyUjRRh78r8pow3nCA1CxnJPwmSkVJju0UeG0uXpWNVWHi9VRgsEilG9KbuI5AEKoORHhS93BUfC_qsz9rpzK_xCJFw-sCcvBAbwTOQ2c8gHRELrRzgmkp0QLqV5qtz7g9VimwmtWIJuxRIO4PONlAcMsIVtOFY1duasQuEn2RRmUNcpKW4-5wu18U2MNaUU',
  anyaStudent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkJur3U5I2u0CaibMoyirntIrb0Kg3VD0jZ1jDpyMGwYKLRGIHGApLEvD4YxWDVxVA-74rpZe9SqieNaF1e_ChlI4xdTakBV6B2NjyCjTQB-0A5mH-h02PT_GNPiXdxuCQZSlSRBpGa2DaEdiLioR8uKKSf2s3RLZEk-cRc0qkL29q0cPbSr92QBNzIoCbbIemQwDgSb2LVFzkdYnBwBESyB8_wmqdeAGXf5a3pIk4Mi95SM12ZOw',
  devStudent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPFoEm98GrZ67yPgU-n06_CJtD2UNOYESVr3F6WyQZ53jeB6HjixbTEP52pdKstFTfSnhIyaY7Q2GYrMBn2JUPSQapEk_awgSVD2rZr5CsoQgseN0HTuKRj-Jlg3eQTCBs5cWx8rqJooRkEYEgJmyMi5ME-WFcU6v_sYqYEnXOn1X3kXdwSNUK1hszruZqXHlkmmxWkhga4DUybDUUdfCV9qe1lHlru5WAT8lrN3aEZh-zEfmup2c',
  zaraStudent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4TWcxWvbdJWwv83SUvDSbLCQkNXpFQ-Z_9dFABUva-OdHTOdnzcEjvJopu5fSLlIoQuvZB_fVfKGAZC12OFxpivvEJdy56kSxZdfZmXwHfhYteRGVAYG7roQOzrt2Cix9l0278PxrbgEcWeY-lR5xEvT5F2Bqrh0qHEqbn-HJQicB3_dqh3AvVfOtQT_WbHigiPMN8fYm0ZDXxM2yjCR4g2qpQjdI0dJS1qk6YpLz4rMQSN3aBNA',
  rajeshDriver: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiFabUE9TRUMqROzzuFhkYIj_nECI-7diActgRlyfsVfmePpuM51-EqDI75YyxDrOvt1YN_Vc55D4cK-9XqAyKPH_fFA7FDKkuMVO4sd8iqaSgk5vRhsFn_KeUlI87l0hsGW2peVT8hxS2uy2L784TmtXxglpZRZYRwQBuW5h2dNCcTzjLIRSVYh2s3ttlSPOaBtoDIWyQC3bcUiiWLcQXEFansLWrnYIwQShb9MutUpPsqTk5J0',
  rajeshDriverCloseUp: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7GDOjCkzOeCqj8vI0qfZsaIuFjVrM6j3J7NZzcfv2E1oxB1P3f5GA-b-1Ul9WBdpCbBeTm7eO4Bt2uJATTLVIMY16GyXfmrA232zMrU6L0IUghvyECR8zLW771FSy0N3VQ5ktLUeBI3Sy8v6JLfNUrMBcJ5aALMffrRZPzRMXIFnoHrnjFOu4aIc4MxP-57sLylUFWV0L9VgK-JvMQ1Tc7qIOW89xd3fif5rNxsOKHg6oam5yd9Y',
  mapRouteBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwcckjJsqS5vIKSeRq7ujz34SWMURYPvfX-3oMojEq5VXZ96aidTyhZkHgQzqBGsRj1pPgOdeWCE0XFFOs2LJrUwQWyPB8qcaMq-Eq8u2RiSFdpLN8LqWREl3ybgy_a0-IEB20jre_42UnwKrbO4VUbrEpJ4touumIA4d4z7o4GTpyO-mL-HAJ0tFoGMYTIZaDlNOnQhgrC8dhIV_PlLFATXCvIE51Vv0nxVjtsrRulvLa-m-up-I',
  fleetMapBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1IHDbALZ5AVdAUDK7OSW4tKFeNQRPaII3u6xFvm4LdnM1N2Uuq-sqWzXj0Ju2WgIe2e3qzKZqWuFSgumdR5Hr5piQWwxfSoJNdep4lIbhQ3CWb5flshJfWM5wqcJHNlkr7hAQAhp9bx0LIkADMKLh0Mob6vJF3HiIuXNzLufzVcqv88VO-imeAUpR1Hq_E7eIfy6FKRL_7gOmuXpXCT5bonEaYTFClEPX6W4R5NrZE8SgW5X7EIo'
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'student-1',
    name: 'Rahul G',
    grade: 'Grade 7-B',
    studentId: 'SR-7821',
    school: 'Oakwood International High',
    avatar: ASSETS.rahulStudent,
    status: 'On Route',
    seatNumber: '08',
    rfidTag: '#4892',
    pickupCode: '8342',
    stopName: 'Greenwood Heights Gate 1',
    stopTime: '4:32 PM',
    scanTime: '3:48 PM',
    guardianName: 'Sarah',
    guardianPhone: '+1 (555) 019-2831'
  },
  {
    id: 'student-2',
    name: 'Anya Sharma',
    grade: 'Grade 6-A',
    studentId: 'SR-7809',
    school: 'Oakwood International High',
    avatar: ASSETS.anyaStudent,
    status: 'Dropped Off',
    seatNumber: '12',
    rfidTag: '#4102',
    pickupCode: '6190',
    stopName: 'Sector 4 Crossway',
    stopTime: '4:12 PM',
    scanTime: '3:47 PM',
    guardianName: 'Pooja Sharma',
    guardianPhone: '+1 (555) 018-9922'
  },
  {
    id: 'student-3',
    name: 'Dev Patel',
    grade: 'Grade 8-C',
    studentId: 'SR-7920',
    school: 'Oakwood International High',
    avatar: ASSETS.devStudent,
    status: 'On Route',
    seatNumber: '14',
    rfidTag: '#5109',
    pickupCode: '4481',
    stopName: 'Greenwood Heights Gate 1',
    stopTime: '4:32 PM',
    scanTime: '3:49 PM',
    guardianName: 'Vikram Patel',
    guardianPhone: '+1 (555) 017-3841'
  },
  {
    id: 'student-4',
    name: 'Zara Khan',
    grade: 'Grade 7-B',
    studentId: 'SR-7734',
    school: 'Oakwood International High',
    avatar: ASSETS.zaraStudent,
    status: 'Near Home',
    seatNumber: '04',
    rfidTag: '#3991',
    pickupCode: '9021',
    stopName: 'Pine Crest (Approaching)',
    stopTime: '4:22 PM',
    scanTime: '3:48 PM',
    guardianName: 'Tariq Khan',
    guardianPhone: '+1 (555) 014-7221'
  }
];

export const INITIAL_BUS_TRIP: BusTrip = {
  busNumber: 'Bus 12',
  routeNumber: 'DL-01-SB-4421',
  routeName: 'Route A-East',
  driverName: 'Mr. Rajesh Kumar',
  driverRating: 4.96,
  driverPhone: '+1 (555) 019-283',
  driverAvatar: ASSETS.rajeshDriver,
  licensePlate: 'DL-01-SB-4421',
  vehicleSpeed: 28,
  distanceRemaining: '2.4 km',
  etaMinutes: 14,
  etaTime: '4:32 PM',
  dropOffLocation: 'Gate 1, Greenwood Heights',
  acTemp: '22°C',
  seatsOccupied: 14,
  totalSeats: 28,
  dashcamStatus: 'Dual Dashcam Live',
  studentsOnboardCount: 3,
  totalStudentsCount: 4,
  tripDurationSeconds: 37 * 60 + 17,
  delayMinutes: 0,
  status: 'on-schedule'
};

export const ROUTE_WAYPOINTS: Waypoint[] = [
  {
    id: 1,
    label: 'Oakwood High (Origin)',
    time: '3:30 PM',
    description: 'Campus assembly hall check-in and boarding completed.',
    status: 'completed',
    x: 45,
    y: 45,
    speed: '0 km/h',
    heading: 'Stationary',
    eta: '3:48 PM',
    distance: '3.8 km',
    progressPercent: 10
  },
  {
    id: 2,
    label: 'School Geofence Boundary',
    time: '3:55 PM',
    description: 'Exited Oakwood perimeter corridor onto Sector Expressway.',
    status: 'completed',
    x: 105,
    y: 90,
    speed: '42 km/h',
    heading: 'NE 38°',
    eta: '3:55 PM',
    distance: '3.1 km',
    progressPercent: 35
  },
  {
    id: 3,
    label: 'Sector 4 Crossway Signal (Current)',
    time: '4:10 PM',
    description: 'Crossed underpass. Next halt approaching in 3 mins.',
    status: 'active',
    x: 160,
    y: 140,
    speed: '32 km/h',
    heading: 'NE 42°',
    eta: '4:18 PM',
    distance: '2.1 km',
    progressPercent: 65
  },
  {
    id: 4,
    label: 'Pine Crest (Stop 1)',
    time: '4:22 PM',
    description: 'Zara Khan scheduled drop-off with NFC parent verification.',
    status: 'pending',
    x: 250,
    y: 205,
    speed: '22 km/h',
    heading: 'E 82°',
    eta: '4:22 PM',
    distance: '1.2 km',
    progressPercent: 82
  },
  {
    id: 5,
    label: 'Greenwood Heights Gate 1 (Home Stop)',
    time: '4:32 PM',
    description: 'Final home stop for Rahul G & Dev Patel. Dynamic OTP handover.',
    status: 'pending',
    x: 345,
    y: 325,
    speed: '0 km/h',
    heading: 'Target Home',
    eta: '4:32 PM',
    distance: '0.0 km',
    progressPercent: 100
  }
];

export const INITIAL_ALERTS: SafetyAlert[] = [
  {
    id: 'alert-1',
    title: 'Boarding Verified (RFID/QR)',
    timestamp: '3:48 PM',
    description: 'Rahul scanned badge and boarded Bus #12 at Oakwood Gate 2.',
    type: 'verified',
    read: true,
    busNumber: 'Bus 12',
    studentName: 'Rahul G'
  },
  {
    id: 'alert-2',
    title: 'School Geofence Exited',
    timestamp: '3:55 PM',
    description: 'Bus #12 safely crossed school boundary onto Sector Expressway.',
    type: 'geofence',
    read: true,
    busNumber: 'Bus 12'
  },
  {
    id: 'alert-3',
    title: 'Approaching Sector 4',
    timestamp: '4:10 PM',
    description: 'Vehicle entered Sector 4 perimeter. 3 stops ahead of home drop-off.',
    type: 'proximity',
    read: false,
    busNumber: 'Bus 12'
  },
  {
    id: 'alert-4',
    title: 'Traffic Advisory Broadcast',
    timestamp: '4:15 PM',
    description: 'Route B-North reported moderate slow-down on Highway Flyover. Route A-East unaffected.',
    type: 'delay',
    read: false,
    busNumber: 'Bus 18'
  }
];

export const FLEET_BUSES = [
  {
    busNumber: 'Bus 12',
    routeName: 'Route A-East',
    driver: 'Rajesh Kumar',
    checkedIn: '28/30 Checked in',
    status: 'On Route',
    statusColor: 'tertiary',
    eta: 'ETA 4:32 PM',
    speed: '38 km/h',
    location: 'Sector 42 Crossing',
    securityStatus: 'All Clear',
    delayMinutes: 0
  },
  {
    busNumber: 'Bus 18',
    routeName: 'Route B-North',
    driver: 'Sunil Verma',
    checkedIn: '24 Students',
    status: '+12 min Delay',
    statusColor: 'secondary',
    eta: 'ETA revised 4:50 PM',
    speed: '14 km/h',
    location: 'Flyover construction hold-up',
    securityStatus: 'Traffic Bottleneck',
    delayMinutes: 12
  },
  {
    busNumber: 'Bus 07',
    routeName: 'Route C-West',
    driver: 'Amit Roy',
    checkedIn: '32 Scheduled',
    status: 'Boarding: Gate 1',
    statusColor: 'primary',
    eta: 'Departs in 8 min',
    speed: '0 km/h',
    location: 'Campus Depot Gate 1',
    securityStatus: '26 of 32 Boarded (81%)',
    delayMinutes: 0
  }
];

export const HISTORICAL_TRIPS: HistoricalTrip[] = [
  {
    id: 'hist-1',
    date: 'Today, Sep 17',
    route: 'Route A-East (Morning Inbound)',
    busNumber: 'Bus 12',
    departureTime: '7:15 AM',
    arrivalTime: '7:52 AM',
    onTime: true,
    driver: 'Rajesh Kumar',
    status: 'Completed',
    distance: '14.2 km',
    duration: '37 mins'
  },
  {
    id: 'hist-2',
    date: 'Yesterday, Sep 16',
    route: 'Route A-East (Evening Departure)',
    busNumber: 'Bus 12',
    departureTime: '3:45 PM',
    arrivalTime: '4:29 PM',
    onTime: true,
    driver: 'Rajesh Kumar',
    status: 'Completed',
    distance: '13.8 km',
    duration: '44 mins'
  },
  {
    id: 'hist-3',
    date: 'Yesterday, Sep 16',
    route: 'Route A-East (Morning Inbound)',
    busNumber: 'Bus 12',
    departureTime: '7:18 AM',
    arrivalTime: '7:55 AM',
    onTime: true,
    driver: 'Rajesh Kumar',
    status: 'Completed',
    distance: '14.1 km',
    duration: '37 mins'
  },
  {
    id: 'hist-4',
    date: 'Mon, Sep 15',
    route: 'Route A-East (Evening Departure)',
    busNumber: 'Bus 12',
    departureTime: '3:50 PM',
    arrivalTime: '4:38 PM',
    onTime: false,
    driver: 'Rajesh Kumar',
    status: 'Delayed',
    distance: '14.0 km',
    duration: '48 mins'
  }
];
