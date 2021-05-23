export interface IWeatherData {
  name: string;
  date: number;
  description: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
  visibility: number;
  feels_like: number;
  temperature: number;
  temp_min: number;
  temp_max: number;
  icon: string;
  condition: string;
  country: string;
  sunrise: number;
  sunset: number;
  lon: number;
  lat: number;
}
