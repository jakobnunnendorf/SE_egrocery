const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password1",
    phoneNumber: "123-456-7890",
    purchaseHistory: [
      { date: "2022-01-01", amount: 100.0 },
      { date: "2022-02-01", amount: 50.0 },
      { date: "2022-03-01", amount: 75.0 },
    ],
    receipts: [
      { id: "0001", date: "2022-01-01", amount: 100.0 },
      { id: "0002", date: "2022-02-01", amount: 50.0 },
      { id: "0003", date: "2022-03-01", amount: 75.0 },
    ],
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    password: "password2",
    phoneNumber: "123-456-7890",
    purchaseHistory: [
      { date: "2022-01-01", amount: 200.0 },
      { date: "2022-02-01", amount: 150.0 },
      { date: "2022-03-01", amount: 175.0 },
    ],
    receipts: [
      { id: "0004", date: "2022-01-01", amount: 200.0 },
      { id: "0005", date: "2022-02-01", amount: 150.0 },
      { id: "0006", date: "2022-03-01", amount: 175.0 },
    ],
  },
  // ...and so on, for 8 more users
];

export default users;