import React, { useEffect, useState } from "react";
import { fetchCitiesData } from "../../lib/fetchApi";
import Autosuggest from "react-autosuggest";

const Search = ({ setCityName }) => {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch city data based on country
  const handleFetchCitiesData = async (country) => {
    try {
      const cityData = await fetchCitiesData(country);
      if (cityData && cityData.data) {
        setCities(cityData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Initial fetch for country 'india' when component mounts
  useEffect(() => {
    const payload = {
      country: "india",
    };
    handleFetchCitiesData(payload);
  }, []);

  // Triggered when input value changes
  const onChange = (event, { newValue }) => {
    setInputValue(newValue);

    // If newValue is empty, clear the state
    if (!newValue) {
      setCityName("");
    }
  };

  // Fetch suggestions based on input value
  const onSuggestionsFetchRequested = ({ value }) => {
    if (value && cities && cities.length > 0) {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCities);
    }
  };

  // Clear suggestions when input value is empty
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Triggered when a suggestion is selected
  const onSuggestionSelected = (event, { suggestion }) => {
    setInputValue(suggestion); // Update input value with the selected suggestion
    setCityName(suggestion);
  };

  // Render each suggestion item
  const renderSuggestion = (suggestion) => {
    return (
      <div>
        <span>{suggestion}</span>
      </div>
    );
  };

  const inputProps = {
    placeholder: "Search City",
    value: inputValue,
    onChange: onChange,
  };

  // Custom theme object for Autosuggest component
  const customTheme = {
    container: "relative mt-10",
    input:
      "w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:border-blue-500",
    suggestionsContainer:
      "absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg max-h-56 overflow-y-auto scrollbar",
    suggestion: "px-4 py-2 cursor-pointer hover:bg-gray-100",
  };

  return (
    <div className="grid justify-center">
      <Autosuggest
        theme={customTheme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};

export default Search;
