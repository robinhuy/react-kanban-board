import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

function App() {
  const [jobs, setJobs] = useState(["abc", "def", "GHI"]);

  function onDragEnd(result) {
    console.log(result);
    if (result.destination) {
      const items = [...jobs];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setJobs(items);
    }
  }

  return (
    <Container>
      <h1>Kanban Board</h1>

      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>TODO (1)</Card.Title>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todo">
                  {(provided) => (
                    <ListGroup
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {jobs.map((job, index) => (
                        <Draggable
                          key={index}
                          draggableId={index + ""}
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {job}
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </ListGroup>
                  )}
                </Droppable>
              </DragDropContext>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>IN PROGRESS (1)</Card.Title>

              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>TODO (1)</Card.Title>

              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
