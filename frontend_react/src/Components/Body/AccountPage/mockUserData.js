const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password1",
    phoneNumber: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    birthdate: "1990-01-01",
    purchaseHistory: [
      { date: "2022-01-01", amount: 100.0, id: "0001" },
      { date: "2022-02-01", amount: 50.0, id: "0002"},
      { date: "2022-03-01", amount: 75.0, id: "0002" },
    ],
    receipts: [
      { id: "0001", date: "2022-01-01", amount: 100.0 },
      { id: "0002", date: "2022-02-01", amount: 50.0 },
      { id: "0003", date: "2022-03-01", amount: 75.0 },
    ],
    imageURL:
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    password: "password2",
    phoneNumber: "123-456-7890",
    address: "456 Oak St, Anytown, USA",
    birthdate: "1991-02-01",
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
    imageURL:
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    password: "password3",
    phoneNumber: "123-456-7890",
    address: "789 Elm St, Anytown, USA",
    birthdate: "1992-03-01",
    purchaseHistory: [
      { date: "2022-01-01", amount: 300.0 },
      { date: "2022-02-01", amount: 250.0 },
      { date: "2022-03-01", amount: 275.0 },
    ],
    receipts: [
      { id: "0007", date: "2022-01-01", amount: 300.0 },
      { id: "0008", date: "2022-02-01", amount: 250.0 },
      { id: "0009", date: "2022-03-01", amount: 275.0 },
    ],
    imageURL:
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "password3",
    phoneNumber: "555-555-1234",
    address: "246 Pine St, Anytown, USA",
    birthdate: "1993-04-01",
    purchaseHistory: [
      { date: "2022-01-01", amount: 50.0 },
      { date: "2022-02-01", amount: 75.0 },
      { date: "2022-03-01", amount: 100.0 },
    ],
    receipts: [
      { id: "0007", date: "2022-01-01", amount: 50.0 },
      { id: "0008", date: "2022-02-01", amount: 75.0 },
      { id: "0009", date: "2022-03-01", amount: 100.0 },
    ],
    imageURL:
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
  },
];

export default users;