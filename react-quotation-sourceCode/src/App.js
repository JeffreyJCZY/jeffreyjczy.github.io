import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuotationTable from "./QuotationTable";

import { Container, Form, Col, Row, Button } from 'react-bootstrap';

import useLocalStorage from "react-localstorage-hook";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  // const dataItems = []; // only temporary

  const dummyProductList = [
    { id: "p001", name: 'Chocolate Hershey', price: 35 },
    { id: "p002", name: 'Candy', price: 15 },
    { id: "p003", name: 'Lays Original', price: 30 },
    { id: "p004", name: 'KitKat', price: 25 },
    { id: "p005", name: 'M&M', price: 20 }
  ];





  

  const addItem = () => {
    if (itemRef.current.value === "") {
      alert("Item name is empty");
      return;
    }
    if (qtyRef.current.value === "") {
      qtyRef.current.value = 1;
    }
    if (disRef.current.value === "") {
      disRef.current.value = 0;
    }
    const pid = itemRef.current.value;
    const product = dummyProductList.find(e => e.id === pid);

    console.log(product.name, ppuRef.current.value);

    var found = false;
    dataItems.forEach(items => {
      if (items.item == product.name && items.ppu == ppuRef.current.value) {
        items.qty = parseInt(items.qty) + parseInt(qtyRef.current.value);
        items.dis = parseInt(items.dis) + parseInt(disRef.current.value);
        found = true;
      }
    })
    if (!found) {
      var itemObj = {
        item: product.name,
        ppu: ppuRef.current.value,
        dis: disRef.current.value,
        qty: qtyRef.current.value
      };
      dataItems.push(itemObj);
    }
    setDataItems([...dataItems]);
  }


  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
  };

  const options = dummyProductList.map((v) => {
    return <option value={v.id}>{v.name}</option>
  })

  const clearDataItems = () => {
    setDataItems([]);
  }




  return (
    <div style={{ backgroundColor: '#34568B', minHeight:'100vh'}}>
      <Container style={{ minHeight: '80vh', color: 'white'}}>
        <Row>
          <Col xs={4} style={{ marginTop: '20vh' }}>
            <Form>
              <Form.Group className="mb-3" controlId="formItem">
                <Form.Label>Item</Form.Label>
                <Form.Select aria-label="Default select example" ref={itemRef} onChange={productChange}>
                  {options}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price Per Unit" ref={ppuRef} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formQauntity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="number" placeholder="Discount" ref={disRef} />
              </Form.Group>

              <Button variant="outline-light" onClick={addItem}>
                Add
              </Button>
            </Form>
          </Col>
          <Col style={{ marginTop: '18vh' }}>
            <QuotationTable data={dataItems} setDataItems={setDataItems} />
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default App;
