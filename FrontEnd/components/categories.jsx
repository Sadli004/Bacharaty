import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Serum", "Face wash", "Creme", "Shampoo"];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row my-2 "
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedCategory(category)}
          className={`px-4 py-2 mx-1 rounded-full ${
            selectedCategory === category
              ? "bg-primary text-white"
              : "bg-secondary"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              selectedCategory === category ? "text-white" : "text-black"
            }`}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;
