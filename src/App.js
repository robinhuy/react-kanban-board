import { useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Trash } from "react-bootstrap-icons";
import AddItem from "./AddItem";

function App() {
  const [board, setBoard] = useState([
    {
      id: "todo",
      title: "Todo",
      tasks: [
        { id: "1", content: "todo1" },
        { id: "2", content: "todo2" },
      ],
    },
    {
      id: "doing",
      title: "Doing",
      tasks: [{ id: "3", content: "doing1" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ]);

  function onDragEnd(result) {
    if (!result.destination) return;

    const { destination, source } = result;

    const newBoard = [...board];

    const sourceColumn = newBoard.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = newBoard.find(
      (column) => column.id === destination.droppableId
    );

    const [removedItem] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, removedItem);

    setBoard(newBoard);
  }

  function addColumn(name) {
    setBoard([
      ...board,
      {
        id: name,
        title: name,
        tasks: [],
      },
    ]);
  }

  return (
    <>
      <header className="d-flex justify-content-center p-3">
        <h1 className="text-center">Kanban Board</h1>
      </header>

      <Container fluid className="d-flex flex-wrap">
        <DragDropContext onDragEnd={onDragEnd}>
          {board.map((column, columnIndex) => (
            <Card className="card" key={column.id}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <span>
                    {column.title} ({column.tasks.length})
                  </span>
                  <Trash className="icon-delete" />
                </Card.Title>

                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <ListGroup ref={provided.innerRef}>
                      {column.tasks.map((task, taskIndex) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={taskIndex}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {task.content}
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </ListGroup>
                  )}
                </Droppable>
              </Card.Body>
            </Card>
          ))}

          <AddItem placeholder="Add new column" handleAddItem={addColumn} />
        </DragDropContext>
      </Container>
    </>
  );
}

export default App;
