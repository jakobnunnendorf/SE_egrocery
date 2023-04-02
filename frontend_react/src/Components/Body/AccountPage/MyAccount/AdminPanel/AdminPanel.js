import React, { useState } from "react";

export default function AdminPanel() {
  const [jsonData, setJsonData] = useState([]);

  const styles = {
    frame: {
      display: "flex",
      width: "100%",
      height: "500px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    input_field: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      width: "500px",
      height: "150px",
      marginBottom: "100px",
    },
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const jsonData = csvToJson(csvData);
      setJsonData(jsonData);
      console.log(jsonData);
    };
    reader.readAsText(file);
  };

  const csvToJson = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const lineData = lines[i].split(",");

      // Check if the line has the same number of columns as the headers
      if (lineData.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = lineData[j] ? lineData[j].trim() : "";
        }
        jsonData.push(obj);
      }
    }
    return jsonData;
  };


  return (
    <div style={styles.frame}>
      <h1>Admin Panel</h1>
      <div style={styles.input_field}>
        <h3>Upload the updated inventory as csv</h3>
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}
