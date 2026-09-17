export type UserRole = 'parent' | 'driver' | 'admin';

export type NavigationTab = 'child' | 'map' | 'alerts' | 'history' | 'privacy';

export interface Student {
  id: string;
  name: string;
  grade: string;
  studentId: string;
  school: string;
  avatar: string;
  status: 'At School' | 'Boarded' | 'On Route' | 'Near Home' | 'Dropped Off';
  seatNumber: string;
  rfidTag: string;
  pickupCode: string;
  stopName: string;
  stopTime: string;
  scanTime?: string;
  guardianName: string;
  guardianPhone: string;
}

export interface Waypoint {
  id: number;
  label: string;
  time: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  x: number;
  y: number;
  speed: string;
  heading: string;
  eta: string;
  distance: string;
  progressPercent: number;
}

export interface BusTrip {
  busNumber: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverRating: number;
  driverPhone: string;
  driverAvatar: string;
  licensePlate: string;
  vehicleSpeed: number;
  distanceRemaining: string;
  etaMinutes: number;
  etaTime: string;
  dropOffLocation: string;
  acTemp: string;
  seatsOccupied: number;
  totalSeats: number;
  dashcamStatus: string;
  studentsOnboardCount: number;
  totalStudentsCount: number;
  tripDurationSeconds: number;
  delayMinutes: number;
  status: 'on-schedule' | 'delayed' | 'boarding' | 'completed';
}

export interface SafetyAlert {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  type: 'verified' | 'geofence' | 'delay' | 'proximity' | 'emergency';
  read: boolean;
  busNumber?: string;
  studentName?: string;
}

export interface HistoricalTrip {
  id: string;
  date: string;
  route: string;
  busNumber: string;
  departureTime: string;
  arrivalTime: string;
  onTime: boolean;
  driver: string;
  status: 'Completed' | 'Delayed';
  distance: string;
  duration: string;
}
