interface DroppableProps {
  children: React.ReactNode;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const Droppable = ({ children, onDrop }: DroppableProps) => {
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("droppable - onDragEnter");
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setTimeout(() => {
      console.log("droppable - onDragOver");
    }, 0);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("droppable - onDragLeave");
  };

  return <div id="board">{children}</div>;
};
