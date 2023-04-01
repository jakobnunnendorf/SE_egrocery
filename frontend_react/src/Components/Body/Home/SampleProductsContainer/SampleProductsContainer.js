import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductContainer from '../../Products/ProductCatalogue/ProductContainer/ProductContainer';
import axios from 'axios';


export default function SampleProductsContainer(props) {

  // fetch products from backend
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    console.log("commencing fetch products");
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;
    const randomProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
    const styles = {
      outerContainer: {
        // overflowX: "auto",
        margin: "0 0 0 0",
        // marginLeft: "-50px",
        display: "flex",
        alignItems: "center",
        marginTop: "20px",

      },
      innerContainer: {
        display: "flex",
        flexWrap: "nowrap",
        margin: "0 0 0 0",
        whiteSpace: "nowrap",
        alignItems: "center",

      },
      product: {
        flexGrow: 1,
        marginTop: "0px",
      },
      prevButton: {

        margin: "0 0 0 0",
        marginRight: "25px",
        color: startIndex === 0 ? "white" : "#111111",
        cursor: "pointer",
        fontSize: "24px",
        border: "none",
        padding: "0",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      nextButton: {
        margin: "0 0 0 0",
        color: startIndex + itemsPerPage >= products.length ? "white" : "#111111",
        cursor: "pointer",
        fontSize: "24px",
        border: "none",
        padding: "0",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      
    };
  
    const handleNext = () => {
        const maxIndex = products.length - 1;
        const nextIndex = startIndex + 1;
        const canMoveNext = nextIndex <= maxIndex - itemsPerPage + 1;
        if (canMoveNext) {
          setStartIndex(nextIndex);
          randomProducts.push(products[nextIndex + itemsPerPage - 1]);
          randomProducts.shift();
        }
      };
    
    const handlePrev = () => {
      if (startIndex - 1 >= 0) {
        setStartIndex(startIndex - 1);
      }
    };
  
    return (
        <div style={styles.outerContainer}>
          <div style={styles.innerContainer}>
          <div style={styles.prevButton} onClick={handlePrev}> <FontAwesomeIcon icon={faChevronLeft} /></div>
            {randomProducts.map((product, index) => (
              <ProductContainer key={index} product={product} addItemToCart={props.addItemToCart}/>
            ))}
            <div
              style={styles.nextButton}
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= products.length}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      );
  }
  



  // <div style={containerStyles}>
  //     {props.matchingProducts.map((product, index) => (
  //       <ProductContainer
  //       key={index} 
  //       product={product}
  //       addItemToCart={props.addItemToCart}/>
  //     ))}
  //   </div>