/**
 * India Locations Dataset & Utilities
 * Comprehensive list of 28 States, 8 Union Territories, and 200+ major Indian cities
 * with auto-association mapping.
 */

export const INDIAN_STATES_AND_UTS = [
  // 28 States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // 8 Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const POPULAR_CITIES = [
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Delhi", state: "Delhi" },
  { name: "Bengaluru", state: "Karnataka" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Ahmedabad", state: "Gujarat" },
  { name: "Kochi", state: "Kerala" },
  { name: "Thiruvananthapuram", state: "Kerala" },
  { name: "Kozhikode", state: "Kerala" },
  { name: "Thrissur", state: "Kerala" },
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Noida", state: "Uttar Pradesh" },
  { name: "Gurugram", state: "Haryana" },
  { name: "Chandigarh", state: "Chandigarh" },
  { name: "Indore", state: "Madhya Pradesh" },
  { name: "Coimbatore", state: "Tamil Nadu" },
  { name: "Surat", state: "Gujarat" },
  { name: "Nagpur", state: "Maharashtra" },
  { name: "Visakhapatnam", state: "Andhra Pradesh" },
  { name: "Bhopal", state: "Madhya Pradesh" },
  { name: "Patna", state: "Bihar" },
  { name: "Vadodara", state: "Gujarat" },
  { name: "Ghaziabad", state: "Uttar Pradesh" },
  { name: "Ludhiana", state: "Punjab" },
  { name: "Agra", state: "Uttar Pradesh" },
  { name: "Nashik", state: "Maharashtra" },
  { name: "Faridabad", state: "Haryana" },
  { name: "Meerut", state: "Uttar Pradesh" },
  { name: "Rajkot", state: "Gujarat" },
  { name: "Varanasi", state: "Uttar Pradesh" },
  { name: "Srinagar", state: "Jammu and Kashmir" },
  { name: "Amritsar", state: "Punjab" },
  { name: "Navi Mumbai", state: "Maharashtra" },
  { name: "Allahabad (Prayagraj)", state: "Uttar Pradesh" },
  { name: "Ranchi", state: "Jharkhand" },
  { name: "Howrah", state: "West Bengal" },
  { name: "Jabalpur", state: "Madhya Pradesh" },
  { name: "Gwalior", state: "Madhya Pradesh" },
  { name: "Vijayawada", state: "Andhra Pradesh" },
  { name: "Jodhpur", state: "Rajasthan" },
  { name: "Madurai", state: "Tamil Nadu" },
  { name: "Raipur", state: "Chhattisgarh" },
  { name: "Kota", state: "Rajasthan" },
  { name: "Guwahati", state: "Assam" },
  { name: "Chandigarh", state: "Punjab" },
  { name: "Solapur", state: "Maharashtra" },
  { name: "Hubballi-Dharwad", state: "Karnataka" },
  { name: "Mysuru", state: "Karnataka" },
  { name: "Tiruchirappalli", state: "Tamil Nadu" },
  { name: "Bareilly", state: "Uttar Pradesh" },
  { name: "Aligarh", state: "Uttar Pradesh" },
  { name: "Tiruppur", state: "Tamil Nadu" },
  { name: "Moradabad", state: "Uttar Pradesh" },
  { name: "Jalandhar", state: "Punjab" },
  { name: "Bhubaneswar", state: "Odisha" },
  { name: "Salem", state: "Tamil Nadu" },
  { name: "Warangal", state: "Telangana" },
  { name: "Guntur", state: "Andhra Pradesh" },
  { name: "Dehradun", state: "Uttarakhand" },
  { name: "Kollam", state: "Kerala" },
  { name: "Kannur", state: "Kerala" },
  { name: "Kottayam", state: "Kerala" },
  { name: "Palakkad", state: "Kerala" },
  { name: "Alappuzha", state: "Kerala" },
  { name: "Malappuram", state: "Kerala" },
  { name: "Kasaragod", state: "Kerala" },
  { name: "Pathanamthitta", state: "Kerala" },
  { name: "Idukki", state: "Kerala" },
  { name: "Wayanad", state: "Kerala" },
  { name: "Mangaluru", state: "Karnataka" },
  { name: "Belagavi", state: "Karnataka" },
  { name: "Udupi", state: "Karnataka" },
  { name: "Manipal", state: "Karnataka" },
  { name: "Thane", state: "Maharashtra" },
  { name: "Kalyan", state: "Maharashtra" },
  { name: "Vasai-Virar", state: "Maharashtra" },
  { name: "Aurangabad (Chhatrapati Sambhajinagar)", state: "Maharashtra" },
  { name: "Kolhapur", state: "Maharashtra" },
  { name: "Amravati", state: "Maharashtra" },
  { name: "Nanded", state: "Maharashtra" },
  { name: "Sangli", state: "Maharashtra" },
  { name: "Jalgaon", state: "Maharashtra" },
  { name: "Akola", state: "Maharashtra" },
  { name: "Latur", state: "Maharashtra" },
  { name: "Dhule", state: "Maharashtra" },
  { name: "Ahmednagar", state: "Maharashtra" },
  { name: "Panaji", state: "Goa" },
  { name: "Margao", state: "Goa" },
  { name: "Vasco da Gama", state: "Goa" },
  { name: "Gandhinagar", state: "Gujarat" },
  { name: "Bhavnagar", state: "Gujarat" },
  { name: "Jamnagar", state: "Gujarat" },
  { name: "Junagadh", state: "Gujarat" },
  { name: "Anand", state: "Gujarat" },
  { name: "Navsari", state: "Gujarat" },
  { name: "Morbi", state: "Gujarat" },
  { name: "Bharuch", state: "Gujarat" },
  { name: "Bhilai", state: "Chhattisgarh" },
  { name: "Bilaspur", state: "Chhattisgarh" },
  { name: "Korba", state: "Chhattisgarh" },
  { name: "Durg", state: "Chhattisgarh" },
  { name: "Shimla", state: "Himachal Pradesh" },
  { name: "Dharamshala", state: "Himachal Pradesh" },
  { name: "Solan", state: "Himachal Pradesh" },
  { name: "Mandi", state: "Himachal Pradesh" },
  { name: "Kullu", state: "Himachal Pradesh" },
  { name: "Jamshedpur", state: "Jharkhand" },
  { name: "Dhanbad", state: "Jharkhand" },
  { name: "Bokaro Steel City", state: "Jharkhand" },
  { name: "Deoghar", state: "Jharkhand" },
  { name: "Hazaribagh", state: "Jharkhand" },
  { name: "Ujjain", state: "Madhya Pradesh" },
  { name: "Sagar", state: "Madhya Pradesh" },
  { name: "Dewas", state: "Madhya Pradesh" },
  { name: "Satna", state: "Madhya Pradesh" },
  { name: "Ratlam", state: "Madhya Pradesh" },
  { name: "Rewa", state: "Madhya Pradesh" },
  { name: "Cuttack", state: "Odisha" },
  { name: "Rourkela", state: "Odisha" },
  { name: "Berhampur", state: "Odisha" },
  { name: "Sambalpur", state: "Odisha" },
  { name: "Puri", state: "Odisha" },
  { name: "Balasore", state: "Odisha" },
  { name: "Bathinda", state: "Punjab" },
  { name: "Patiala", state: "Punjab" },
  { name: "Mohali (SAS Nagar)", state: "Punjab" },
  { name: "Hoshiarpur", state: "Punjab" },
  { name: "Pathankot", state: "Punjab" },
  { name: "Bikaner", state: "Rajasthan" },
  { name: "Ajmer", state: "Rajasthan" },
  { name: "Udaipur", state: "Rajasthan" },
  { name: "Bhilwara", state: "Rajasthan" },
  { name: "Alwar", state: "Rajasthan" },
  { name: "Sikar", state: "Rajasthan" },
  { name: "Vellore", state: "Tamil Nadu" },
  { name: "Thoothukudi", state: "Tamil Nadu" },
  { name: "Tirunelveli", state: "Tamil Nadu" },
  { name: "Erode", state: "Tamil Nadu" },
  { name: "Dindigul", state: "Tamil Nadu" },
  { name: "Thanjavur", state: "Tamil Nadu" },
  { name: "Kanchipuram", state: "Tamil Nadu" },
  { name: "Nizamabad", state: "Telangana" },
  { name: "Karimnagar", state: "Telangana" },
  { name: "Ramagundam", state: "Telangana" },
  { name: "Khammam", state: "Telangana" },
  { name: "Mahbubnagar", state: "Telangana" },
  { name: "Nalgonda", state: "Telangana" },
  { name: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Saharanpur", state: "Uttar Pradesh" },
  { name: "Gorakhpur", state: "Uttar Pradesh" },
  { name: "Jhansi", state: "Uttar Pradesh" },
  { name: "Mathura", state: "Uttar Pradesh" },
  { name: "Ayodhya", state: "Uttar Pradesh" },
  { name: "Haridwar", state: "Uttarakhand" },
  { name: "Roorkee", state: "Uttarakhand" },
  { name: "Haldwani", state: "Uttarakhand" },
  { name: "Rudrapur", state: "Uttarakhand" },
  { name: "Rishikesh", state: "Uttarakhand" },
  { name: "Nainital", state: "Uttarakhand" },
  { name: "Siliguri", state: "West Bengal" },
  { name: "Durgapur", state: "West Bengal" },
  { name: "Asansol", state: "West Bengal" },
  { name: "Bardhaman", state: "West Bengal" },
  { name: "Kharagpur", state: "West Bengal" },
  { name: "Malda", state: "West Bengal" },
  { name: "Jammu", state: "Jammu and Kashmir" },
  { name: "Anantnag", state: "Jammu and Kashmir" },
  { name: "Baramulla", state: "Jammu and Kashmir" },
  { name: "Puducherry", state: "Puducherry" },
  { name: "Port Blair", state: "Andaman and Nicobar Islands" },
  { name: "Silvassa", state: "Dadra and Nagar Haveli and Daman and Diu" },
  { name: "Daman", state: "Dadra and Nagar Haveli and Daman and Diu" },
  { name: "Leh", state: "Ladakh" },
  { name: "Kargil", state: "Ladakh" },
  { name: "Imphal", state: "Manipur" },
  { name: "Shillong", state: "Meghalaya" },
  { name: "Aizawl", state: "Mizoram" },
  { name: "Kohima", state: "Nagaland" },
  { name: "Dimapur", state: "Nagaland" },
  { name: "Gangtok", state: "Sikkim" },
  { name: "Agartala", state: "Tripura" },
  { name: "Itanagar", state: "Arunachal Pradesh" },
];

// Quick map for O(1) lookup
export const CITY_TO_STATE_MAP = POPULAR_CITIES.reduce((acc, item) => {
  acc[item.name.toLowerCase()] = item.state;
  return acc;
}, {});

/**
 * Returns the auto-mapped state for a given city name (case-insensitive)
 */
export function getStateForCity(cityName) {
  if (!cityName) return "";
  const cleanName = cityName.trim().toLowerCase();
  
  // Exact match
  if (CITY_TO_STATE_MAP[cleanName]) {
    return CITY_TO_STATE_MAP[cleanName];
  }
  
  // Substring match
  const found = POPULAR_CITIES.find(
    (c) => c.name.toLowerCase() === cleanName || cleanName.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(cleanName)
  );
  
  return found ? found.state : "";
}

/**
 * Returns all cities belonging to a particular state
 */
export function getCitiesForState(stateName) {
  if (!stateName) return POPULAR_CITIES;
  return POPULAR_CITIES.filter(
    (c) => c.state.toLowerCase() === stateName.trim().toLowerCase()
  );
}

/**
 * Search cities by text query, optionally filtered by selected state
 */
export function searchCities(query, stateFilter = "") {
  const q = (query || "").trim().toLowerCase();
  let baseList = stateFilter ? getCitiesForState(stateFilter) : POPULAR_CITIES;
  
  if (!q) return baseList;
  
  return baseList.filter(
    (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
  );
}
