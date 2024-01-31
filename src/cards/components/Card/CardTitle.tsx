import { useCardContext } from "./CardContext";

export const CardTitle = () => {
  const { title } = useCardContext();

  return <div className="card-title">{title}</div>;
};
