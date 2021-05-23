export class WeatherUtils {
  static convertCelsiusToFahrenheit(num: number): number {
    return Math.round(num * (9 / 5) + 32);
  }

  static convertFahrenheitToCelsius(num: number): number {
    return Math.round(((num - 32) * 5) / 9);
  }

  static convertKelvinToCelsius(num: number): number {
    return Math.round(num - 273.15);
  }

  static convertKmToMiles(num: number): number {
    return Math.round(num / 1.60934);
  }

  static convertMilesToKm(num: number): number {
    return Math.round(num * 1.60934);
  }

  static getDayText(str: string): string {
    switch (str) {
      case 'Tue':
        return 'Tuesday';
      case 'Wed':
        return 'Wednesday';
      case 'Thu':
        return 'Thursday';
      case 'Fri':
        return 'Friday';
      case 'Sat':
        return 'Saturday';
      case 'Sun':
        return 'Sunday';
      default:
        return str + 'day';
    }
  }

  static getWeatherIcon(weatherIcon: any): string {
    switch (weatherIcon) {
      case '03':
      case '03n':
        return 'wi wi-cloud';
      case '04':
      case '04d':
        return 'wi wi-cloudy';
      case '09':
        return 'wi wi-showers';
      case '10':
      case '10d':
        return 'wi wi-rain';
      case '11':
        return 'wi wi-thunderstorm';
      case '13':
      case '13d':
        return 'wi wi-snow';
      case '50':
      case '50d':
        return 'wi wi-fog';
      case '01d':
        return ' wi wi-day-sunny';
      case '02d':
        return 'wi wi-day-sunny-overcast';
      case '01n':
        return 'wi wi-night-clear';
      case '11d':
        return 'wi wi-thunderstorm';
      case '09d':
        return 'wi wi-raindrops';
      case '02n':
        return 'wi wi-night-partly-cloudy';
      default:
        return '';
    }
  }
}
