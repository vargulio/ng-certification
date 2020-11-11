export const zipCodePattern = "(^[0-9]{5}(-[0-9]{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}[0-9]{1}[A-Z]{1} *[0-9]{1}[A-Z]{1}[0-9]{1}$)";
export const locationsStorageKey = 'ng-cert-loc';
export const getWeatherIcon = (description: string): string => {
    switch (description) {
        case "Clear":
            return "sun";
        case "Clouds":
            return "clouds";
        case "Rain":
        case "Drizzle":
        case "Thunderstorm":
            return "rain";
        case "Snow":
            return "snow";
        default:
            return "";
    }
};