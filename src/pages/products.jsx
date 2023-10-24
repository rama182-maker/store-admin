import React from "react";

import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProductCard from "../productCard";
import { supabase } from "../supabaseClient";

const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [adding, setAdding] = useState(false);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("product")
        .insert({
          name: name,
          description: description,
          showInStorefront: true,
        })
        .single();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="right">
        <Row>
          <Col xs={12} md={8}>
            <h3>Products in Store (DB)</h3>
            <Row>
              <div className="add_button">
                <Button variant="warning" onClick={() => setAdding(true)}>
                  ✚ New Product
                </Button>
              </div>

              {adding && (
                <div className="add_product">
                  <Col xs={12} md={8}>
                    <h4>Add Product</h4>

                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    />

                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                      type="text"
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <br></br>

                    <Button
                      variant="success"
                      className="me-1"
                      onClick={() => createProduct()}
                    >
                      Create
                    </Button>
                    <Button variant="info" onClick={() => setAdding(false)}>
                      Cancel
                    </Button>
                  </Col>
                </div>
              )}
            </Row>
            <hr></hr>
            <Row xs={1} lg={2} className="g-3">
              {products.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Products;
