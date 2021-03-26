import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

export default function AddItem({ placeholder, handleAddItem }) {
  const [value, setValue] = useState("");

  function _handleAddItem() {
    handleAddItem(value);
    setValue("");
  }

  return (
    <Form inline>
      <Form.Group>
        <Form.Control
          type="text"
          className="mr-2"
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <Button onClick={_handleAddItem}>
          <Plus size={20} /> Add
        </Button>
      </Form.Group>
    </Form>
  );
}
