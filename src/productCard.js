import { useState } from "react";
import {
  Card,
  Button,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  FormCheck,
} from "react-bootstrap";
import { supabase } from "./supabaseClient";

function ProductCard({ product }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [show, setShow] = useState(true);

  async function updateProduct() {
    try {
      const { data, error } = await supabase
        .from("product")
        .update({
          name: name,
          description: description,
        })
        .eq("id", product.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function updateProductShow() {
    try {
      const { data, error } = await supabase
        .from("product")
        .update({
          name: name,
          description: description,
          showInStorefront: !product.showInStorefront,
        })
        .eq("id", product.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteProduct() {
    try {
      const { data, error } = await supabase
        .from("product")
        .delete()
        .eq("id", product.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {editing === false ? (
          <>
            <Card.Title>{product.name}</Card.Title>
            <FormCheck
              type="checkbox"
              label="Show in Storefront"
              checked={product.showInStorefront}
              onChange={() => updateProductShow()}
            />
            <Card.Text>{product.description}</Card.Text>
            <Button
              className="me-1"
              variant="danger"
              onClick={() => deleteProduct()}
            >
              Delete product
            </Button>
            <Button variant="secondary" onClick={() => setEditing(true)}>
              Edit product
            </Button>
          </>
        ) : (
          <>
            <br></br>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              defaultValue={product.name}
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>

            <Button size="sm" className="me-1" onClick={() => updateProduct()}>
              Update
            </Button>
            <Button size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
