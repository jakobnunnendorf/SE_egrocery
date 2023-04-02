import React from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function FormInput(props) {
    const styles = {
        bg: {
            backgroundColor: "white",
            borderRadius: "10px",
            padding: props.version === "desktop" ? "20px" : "0px",
        },
        h3: {
            fontSize: "50px",
            color: "#33bff0",
            marginBottom: "5vh",
            marginLeft: "30px",
        },
        form: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridGap: '10px',
            color: "black",
            padding: props.version === "desktop" ? "40px" : "20px",
        }
    }
    const namecol = props.version === 'desktop' ? '3 / 7' : '1 / 7';
    const phonecol = props.version === 'desktop' ? '7 / 11' : '7 / 13';
    const email = props.version === 'desktop' ? '3 / 11' : '1 / 13';
    const message = props.version === 'desktop' ? '3 / 11' : '1 / 13';
    const button = '4 / 10';

    const form = useRef();
    
    function sendEmail() {
        emailjs
          .send(
            "service_raio2fy",
            "template_kodpvyf",
            emailParams,
            "tKEmu2eMAB7uAjgYz"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        props.handleToggle();
      }
      
    return (
    <>
    <h3 style={styles.h3}></h3>
            <div style={styles.bg}>
                <form
                ref={form}
                onSubmit={sendEmail} 
                style={styles.form}>

                    <label htmlFor="name" style={{ 
                        gridColumn: namecol,
                        gridRow: '1 / 2'
                        }}>Name</label>
                    <input type="text" id="name" name="name" style={{
                        gridColumn: namecol, 
                        gridRow: '2 / 3'
                        }} /><br />

                    <label htmlFor="phone" style={{
                        gridColumn: phonecol,
                        gridRow: '1 / 2',
                        }}>Phone number</label>
                    <input type="tel" id="phone" name="phone" style={{
                        gridColumn: phonecol,
                        gridRow: '2 / 3',
                        }} /><br />

                    <label htmlFor="email" style={{
                        gridColumn: email,
                        gridRow: '3 / 4'
                        }}>Email</label>
                    <input type="email" id="email" name="email" style={{
                        gridColumn: email,
                        gridRow: '4 / 5',
                        }} /><br />

                    <label htmlFor="message" style={{
                        gridColumn: message,
                        gridRow: '5 / 6',
                        }}>Message</label>
                    <textarea id="message" name="message" style={{
                        gridColumn: message,
                        gridRow: '6 / 7',
                        }} />
                    <br />

                    <button
                    type="submit"
                    style={{
                        gridColumn: button,
                        gridRow: '9 / 10',
                        marginTop: "1vh"
                        }}
                    className="test">Submit</button>

                </form>
    </div>
    </>
  )
}
