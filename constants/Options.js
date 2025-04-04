export const SelectTravellerList=[
    {
        id:1,
        title:'Just You',
        desc:"A sole Traveller",
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:"Two Travellers",
        icon:'🍻',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:"A group of 4",
        icon:'🏠',
        people:'3 to 5'
    },
    {
        id:4,
        title:'Friends',
        desc:"A gang of friends",
        icon:'🚢',
        people:'5 to 10'
    },

]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of cost',
        icon:'💸'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on an average',
        icon:'💵'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont Worry about cost',
        icon:'💰'
    }
]

export const AI_PROMPT='Generate a detailed travel itinerary for {location} for {totalDays} days and {totalNights} nights for {traveller} within a {budget} budget, starting from Kollam, Kerala, India. The response must be in JSON format only, containing: {"FlightDetails": {"options": [{"airline": "", "flightNumber": "", "departureTime": "", "arrivalTime": "", "duration": "", "stops": 0, "class": "", "baggageAllowance": "", "price": "", "bookingURL": ""}], "prices": ["Economy: $", "Business: $", "First Class: $"], "bookingURLs": [""]}, "Hotels": [{"name": "", "address": "", "price": "", "imageURL": "", "geoCoordinates": "", "rating": "", "description": ""}], "Itinerary": [{"day": 1, "places": [{"name": "", "details": "", "imageURL": "", "geoCoordinates": "", "ticketPricing": "", "travelTime": "", "bestTimeToVisit": ""}]}], "TravelSummary": {"destination": "{location}", "travelDates": "From {startDate} to {endDate}", "totalDays": {totalDays}, "totalNights": {totalNights}}}. Response Rules: The response should be in valid JSON format. Do not include any extra text, explanations, or placeholders. Ensure all required details are included in the JSON output every time. Generate **realistic** flight details from Kollam, Kerala, India to {location}, including airline names, departure times, duration, and at least three price options with booking URLs. Tailor the recommendations based on the location, including top attractions, cultural spots, and must-visit places.'