const brands = [
  {
    brand: "Rolex",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    brand: "Omega",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90Ob4Z9TF9HMfTk80Q1OSgSTAqWYoVf6lSQ&usqp=CAU",
  },
  {
    brand: "Seiko",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVT-UgJvYRukyBCQJSgs-a508obyRRx31IKw&usqp=CAU",
  },
  
];

export default brands;
