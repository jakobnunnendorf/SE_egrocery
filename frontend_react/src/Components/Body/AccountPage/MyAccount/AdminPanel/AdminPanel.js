import React from 'react'

export default function AdminPanel() {
  const styles = {
    frame: {
      display: 'flex',
      width: '100%',
      height: '500px',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    input_field: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      width: "500px",
      height: "150px",
      marginBottom: "100px"
    }
  }
  return (
    <div style={styles.frame}>
      <h1>Admin Panel</h1>
      <div style={styles.input_field}>
        <h3>Upload the updated inventory as csv</h3>
        <input type="file" id="fileInput" name="fileInput" accept=".csv" />
      </div>
    </div>
  );
}
