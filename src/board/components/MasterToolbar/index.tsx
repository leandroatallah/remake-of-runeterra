import { useState } from "react";

import { useBoardContext } from "../BoardContext";
import { CardItem } from "@/cards/models";

function logger(label: string, items: CardItem[]) {
  console.log(label, {
    count: items.length,
    items,
  });
}

type InputModal = {
  callback: Function;
  inputType: "text" | "number";
  modalBody: string | JSX.Element;
  modalTitle: string;
  value: string;
  visible: boolean;
};

const initialInputModal: InputModal = {
  callback: () => {},
  inputType: "text",
  modalBody: "",
  modalTitle: "",
  value: "",
  visible: false,
};

export const MasterToolbar = () => {
  const {
    playerHand,
    playerDeck,
    playerBoard,
    drawCardFromDeckToHand,
    drawInitialHand,
    deleteBoardCard,
  } = useBoardContext();

  const [inputModal, setInputModal] = useState<InputModal>(initialInputModal);

  const handleLogPlayerOneHand = () => logger("P1 hand", playerHand);
  const handleLogPlayerOneDeck = () => logger("P1 deck", playerDeck);
  const handleLogPlayerOneBoard = () => logger("P1 board", playerBoard);

  const handleDeleteBoardCard = () => {
    setInputModal({
      ...initialInputModal,
      callback: (index: string) => {
        const card = playerBoard.find((card) => card.deckId === index);
        if (!card) {
          console.error("Error deleting card");
          return;
        }
        deleteBoardCard(card);
      },
      modalTitle: "Delete card",
      modalBody: (
        <div>
          <ul className="list-disc list-inside my-4">
            {playerBoard.map((card) => (
              <li className="text-[10px]" key={card.deckId}>
                {card.deckId}
              </li>
            ))}
          </ul>
          <div className="text-[12px]">Enter card index to delete</div>
        </div>
      ),
      visible: true,
    });
  };

  const resetInputModal = () => setInputModal(initialInputModal);

  const actions = [
    {
      label: "P1 draw a card",
      handler: drawCardFromDeckToHand,
    },
    {
      label: "P1 draw hand",
      handler: drawInitialHand,
    },
    {
      label: "P1 Log deck",
      handler: handleLogPlayerOneDeck,
    },
    {
      label: "P1 Log hand",
      handler: handleLogPlayerOneHand,
    },
    {
      label: "P1 Log board",
      handler: handleLogPlayerOneBoard,
    },
    {
      label: "P1 Log all",
      handler: () => {
        handleLogPlayerOneDeck();
        handleLogPlayerOneHand();
        handleLogPlayerOneBoard();
      },
    },
    {
      label: "P1 destroy card",
      handler: () => handleDeleteBoardCard(),
    },
  ];

  return (
    <>
      {inputModal?.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center">
          <div className="bg-zinc-300 p-6 pt-4 rounded-md text-zinc-900">
            <h2 className="text-[18px] mb-1 leading-none">
              {inputModal?.modalTitle || "Input"}
            </h2>
            <div className="text-[14px]">{inputModal?.modalBody}</div>
            <input
              value={inputModal?.value || ""}
              onChange={(e) =>
                setInputModal((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              type="text"
              className="w-full h-10 px-2 border-2 border-zinc-400"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="w-1/2 bg-zinc-700 text-zinc-50 p-2 rounded-md"
                onClick={resetInputModal}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-zinc-700 text-zinc-50 p-2 rounded-md"
                onClick={() => {
                  inputModal.callback(inputModal?.value);
                  resetInputModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full fixed top-0 text-zinc-950">
        <div className="p-4 border-2 border-t-0 border-zinc-700 bg-zinc-300 max-w-[480px] m-auto rounded-b-md">
          <h1 className="text-[14px] uppercase text-center font-bold mb-4">
            Master Toolbar
          </h1>
          <div className="flex gap-1">
            {actions.map(({ label, handler }) => (
              <button
                key={label}
                className="w-full flex justify-center items-center border-2 border-zinc-50 bg-zinc-50 px-2 rounded-md"
                onClick={() => handler()}
              >
                <span className="text-zinc-900 text-[12px]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
