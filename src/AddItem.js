import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

export default function AddItem({ placeholder, handleAddItem, columnId }) {
  const [value, setValue] = useState("");

  function _handleAddItem() {
    handleAddItem(value, columnId);
    setValue("");
  }

  return (
    <div>
      <Form className="d-flex mt-4">
        <Form.Control
          className="mb-2 mr-2"
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <Button className="mb-2" onClick={_handleAddItem}>
          <Plus size={20} />
        </Button>
      </Form>
    </div>
  );
}
