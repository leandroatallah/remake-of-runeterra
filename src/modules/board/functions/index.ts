import { CardItem } from "@/modules/cards/models";

export function playDraggableItem(list: CardItem[], index: number) {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);

  return { result, removed };
}

export function reorderDraggableList(
  list: CardItem[],
  startIndex: number,
  endIndex: number
) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
