import { useCardContext } from "./CardContext";

export const CardHeader = () => {
  const { cost, regions } = useCardContext();

  return (
    <div>
      <div>Cost: {cost}</div>
      <div>Region: {regions.map((region) => region.name).join(", ")}</div>
    </div>
  );
};
