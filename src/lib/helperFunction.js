//Convert temperature from kelvin to Celsius
export default function kelvinToCelsius(kelvin) {
  // Check if kelvin is undefined
  if (typeof kelvin !== "undefined") {
    let celsius = kelvin - 273.15;
    return celsius;
  }
  return "Undefined";
}

//convert whole number
export function customRound(number) {
  // Check if number is undefined
  if (typeof number !== "undefined") {
    // Extract the decimal part
    let decimalPart = number - Math.floor(number);

    // If the decimal part is greater than or equal to 0.5, round up, otherwise, round down
    if (decimalPart >= 0.5) {
      return Math.ceil(number);
    } else {
      return Math.floor(number);
    }
  }
  return "Undefined";
}

//capitalize the first letter of each word
export function capitalizeWords(str) {
  // Check if str is undefined
  if (typeof str !== "undefined") {
    // Split the string into an array of words
    let words = str.toLowerCase().split(" ");

    // Iterate over each word in the array
    for (let i = 0; i < words.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the array of words back into a string
    let capitalizedStr = words.join(" ");

    return capitalizedStr;
  }
  return "Undefined";
}

export function convertWindDirectionAndSpeed(degrees, speed) {
  // Check if degrees and speed are undefined
  if (typeof degrees !== "undefined" && typeof speed !== "undefined") {
    // Define directions and their corresponding degree ranges
    let directions = [
      { direction: "North", range: [337.5, 22.5] },
      { direction: "North-Northeast", range: [22.5, 67.5] },
      { direction: "Northeast", range: [67.5, 112.5] },
      { direction: "East-Northeast", range: [112.5, 157.5] },
      { direction: "East", range: [157.5, 202.5] },
      { direction: "East-Southeast", range: [202.5, 247.5] },
      { direction: "Southeast", range: [247.5, 292.5] },
      { direction: "South-Southeast", range: [292.5, 337.5] },
    ];

    // Iterate over each direction range to find the matching direction
    for (let i = 0; i < directions.length; i++) {
      let direction = directions[i];
      if (degrees >= direction.range[0] && degrees < direction.range[1]) {
        let windDirection = "From " + direction.direction;
        let windIntensity = speed >= 10 ? "high" : "light";
        return windDirection + " with " + windIntensity + " intensity";
      }
    }

    // If the degree is outside the defined ranges, return an error message
    return "Unknown direction";
  }
  return "Undefined";
}

//convert meters per second (m/s) to kilometers per hour (km/h)
export function mpsToKmph(mps) {
  // Check if mps is undefined
  if (typeof mps !== "undefined") {
    // 1 meter per second (m/s) is equivalent to 3.6 kilometers per hour (km/h)
    var kmph = mps * 3.6;
    return kmph;
  }
  return "Undefined";
}

export function addCommas(number) {
  // Check if number is undefined
  if (typeof number !== "undefined") {
    // Convert number to string
    var str = number.toString();

    // Insert commas after every third digit from the right, starting from the leftmost group of digits
    var result = "";
    var count = 0;
    for (var i = str.length - 1; i >= 0; i--) {
      result = str[i] + result;
      count++;
      if (count === 3 && i !== 0) {
        result = "," + result;
        count = 0;
      }
    }

    return result;
  }
  return "Undefined";
}

export function checkForCloud(inputString) {
  // Convert the input string to lowercase to perform a case-insensitive check
  var lowerCaseInput = inputString.toLowerCase();

  // Check if the lowercased input string contains the word "cloud"
  if (lowerCaseInput.includes("cloud")) {
    return true;
  } else {
    return false;
  }
}
