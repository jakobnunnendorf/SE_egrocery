const filters = {
    categories: {
      name: "Categories",
      filter_array: ["Fruits", "Vegetables", "Dairy", "Meats", "Bakery", "Beverages", "Snacks", "Frozen", "Pantry", "Personal Care", "Household"],
    },
    prices: {
      name: "Price",
      filter_array: ["0-1 $", "1-3 $", "3-5 $", "5-10 $", "10-20 $", "20-50 $", ">50 $"],
    },
    diets: {
      name: "Dietary Preferences",
      filter_array: ["Vegetarian", "Vegan", "Gluten-Free", "Organic", "Non-GMO", "Dairy-Free", "Nut-Free", "Kosher", "Halal"],
    },
    allergens: {
      name: "Allergens",
      filter_array: ["Peanuts", "Tree Nuts", "Milk", "Eggs", "Fish", "Shellfish", "Soy", "Wheat"],
    },
    nutrition: {
      name: "Nutrition",
      filter_array: ["Low Sodium", "Low Sugar", "Low Fat", "Low Carb", "Low Calorie", "High Protein", "High Fiber"],
    },
    brands: {
      name: "Brands",
      filter_array: ["Coca-Cola", "Pepsi", "Nestle", "Procter & Gamble", "Unilever", "Kraft Heinz", "Kellogg's", "General Mills", "Campbell Soup", "Colgate-Palmolive"],
    },
    ratings: {
      name: "Ratings",
      filter_array: ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"],
    },
    promotions: {
      name: "Promotions",
      filter_array: ["On Sale", "Special Offers", "Coupons", "Buy One Get One Free", "Clearance"],
    },
    arrivals: {
      name: "Arrivals",
      filter_array: ["New Arrivals", "Best Sellers", "Most Popular", "Most Reviewed", "Most Viewed"],
    },
    locations: {
      name: "Location",
      filter_array: ["Local", "International"],
    },
    sustainability: {
      name: "Sustainability",
      filter_array: ["Eco-Friendly", "Fair Trade", "Sustainable Packaging", "Carbon Neutral", "Recyclable"],
    },
    certifications: {
      name: "Certifications",
      filter_array: ["USDA Organic", "Non-GMO Project Verified", "Fair Trade Certified", "Rainforest Alliance Certified", "Certified Gluten-Free", "Certified Vegan", "Certified B Corporation"],
    },
  };

export default filters;