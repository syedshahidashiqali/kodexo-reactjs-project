import styles from "./index.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <div className={styles.headerMainWrapper}>
      <Container>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className={styles.headerTextWrapper}>
              property listings
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;