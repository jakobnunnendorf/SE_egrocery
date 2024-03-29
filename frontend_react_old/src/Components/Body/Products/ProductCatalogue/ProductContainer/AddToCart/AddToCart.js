import React from "react"

export default function AddToCart(props) {
    const styles = {
        buttonStyle: {
            position: "relative",
            fontSize: "16px",
            fontWeight: "545",
            bottom: "10px",
            width: "95%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#557D71",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "11px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            marginTop: "15px"
        }, 
        iconStyle: {
            width: "30px",
            height: "25px",
            marginLeft: "10px"
        },
        divStyle: {
            position: "relative",
            bottom: "5px",
            width: "100%",
            height: "60px",
            display: "flex",
            alignItems: "center",
            marginBottom: "15px"
        }

      };
    
      return (
        <div style={styles.divStyle}>
          <button style={styles.buttonStyle}
          onClick={()=>props.addItemToCart(props.product)}>
            ADD TO CART
            <img
              style={styles.iconStyle}
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png" // to be replaced with the correct icon
              alt=""
            />
          </button>
        </div>
      );
    }