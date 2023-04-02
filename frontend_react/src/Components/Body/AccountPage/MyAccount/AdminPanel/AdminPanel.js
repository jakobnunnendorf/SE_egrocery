import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faQuestionCircle, faUserShield, faCloudUploadAlt, faFile} from '@fortawesome/free-solid-svg-icons'
import "./AdminPanel.css";
export default function AdminPanel() {
  const [jsonData, setJsonData] = useState([]);


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
    <div> 
      <h1> <FontAwesomeIcon icon={faUserShield} size="2x" /></h1> 
      <h2>Admin Panel</h2>
    <div className="frame"> 
      <div className="instructionsFrame"> 
        <h4> <FontAwesomeIcon icon={faQuestionCircle} /> Instructions </h4>
        <p>1. Open the Excel sheet containing the product inventory.</p>
        <p>2. Review and update the product information as needed.</p>
        <p>3. Save the Excel sheet as a CSV (Comma Separated Values) file.</p>
        <p>4. Navigate to the upload section of the admin panel on the website.</p>
        <p>5. Click the "Choose File" button and select the CSV file from your computer.</p>
        <p>6. Click the "Upload" button to upload the CSV file to the system.</p>
        <p>7. Wait for the system to process the file and update the product inventory.</p>
        <p>8. Verify that the product inventory has been updated with the new information.</p>
    </div>
      <div className="input_field">
        <h4> <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Updated Inventory as csv </h4>
        <span> 
        <FontAwesomeIcon icon={faFile} /> &nbsp;
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          accept=".csv"
          onChange={handleFileUpload}
        />
        </span>
        <div className="successfulUpload"> {jsonData.length > 0 && <p> <FontAwesomeIcon icon={faCheckCircle} /> Uploaded Successfully!</p>}</div>
      </div>
    </div>
    </div>
  );
}
