import styles from "./index.module.scss";
import Product from "../Product";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

// fetcher function
const fetchProducts = async () => {
  const url = "https://api.simplyrets.com/properties";

  const res = await (await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa('simplyrets:simplyrets'),
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'api.simplyrets.com'
    }
  })).json();

  return res;
};

const ProductContainer = () => {
  const { status, data } = useQuery("products", fetchProducts);
  const [fvtItems, setFvtItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('fvtItems'));
    if (items) {
      setFvtItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fvtItems', JSON.stringify(fvtItems));
  }, [fvtItems]);

  const handleFvt = id => {
    if (!fvtItems.includes(id)) {
      setFvtItems(prev => [...prev, id]);
    } else {
      setFvtItems(prev => [...prev.filter(itemId => itemId !== id)]);
    }
  };
  return (
    <div className={styles.prodContainerMainWrapper}>
      <Container>
        <Row>
          {status === "loading" && <h1>Loading Data</h1>}
          {status === "error" && <h1>Error while fetching data</h1>}
          {status === "success" && (
            data.map((item, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Product data={item} handleFvt={handleFvt} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductContainer;