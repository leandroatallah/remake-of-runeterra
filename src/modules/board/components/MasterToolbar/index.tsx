import { useState } from "react";

import { CardItem } from "@/modules/cards/models";
import { useBoardStore } from "@/contexts/board/useBoardStore";

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
    playerState: { hand: playerHand, deck: playerDeck, board: playerBoard },
    enemyState: { hand: enemyHand, deck: enemyDeck, board: enemyBoard },
    drawCardFromDeckToHand,
    drawInitialHand,
    deleteBoardCard,
  } = useBoardStore();

  const [inputModal, setInputModal] = useState<InputModal>(initialInputModal);
  const [open, setOpen] = useState(false);

  const handleLogPlayerHand = () => logger("Player hand", playerHand);
  const handleLogPlayerDeck = () => logger("Player deck", playerDeck);
  const handleLogPlayerBoard = () => logger("Player board", playerBoard);

  const handleLogEnemyHand = () => logger("Enemy hand", enemyHand);
  const handleLogEnemyDeck = () => logger("Enemy deck", enemyDeck);
  const handleLogEnemyBoard = () => logger("Enemy board", enemyBoard);

  const handleDeleteBoardCard = (isEnemy?: boolean) => {
    setInputModal({
      ...initialInputModal,
      callback: (index: string) => {
        const card = playerBoard.find((card) => card.deckId === index);
        if (!card) {
          console.error("Error deleting card");
          return;
        }
        deleteBoardCard(card, isEnemy);
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

  const handleDeleteFirstBoardCard = (isEnemy?: boolean) => {
    const [firstCard] = playerBoard || [];

    if (!firstCard) {
      console.error("Error deleting card");
      return;
    }

    deleteBoardCard(firstCard, isEnemy);
  };

  const resetInputModal = () => setInputModal(initialInputModal);

  const groupActions = [
    {
      label: "Player",
      actions: [
        {
          label: "draw a card",
          handler: () => drawCardFromDeckToHand(),
        },
        {
          label: "draw hand",
          handler: drawInitialHand,
        },
        {
          label: "Log deck",
          handler: handleLogPlayerDeck,
        },
        {
          label: "Log hand",
          handler: handleLogPlayerHand,
        },
        {
          label: "Log board",
          handler: handleLogPlayerBoard,
        },
        {
          label: "Log all",
          handler: () => {
            handleLogPlayerDeck();
            handleLogPlayerHand();
            handleLogPlayerBoard();
          },
        },
        {
          label: "destroy a card",
          handler: handleDeleteBoardCard,
        },
        {
          label: "destroy first card",
          handler: handleDeleteFirstBoardCard,
        },
      ],
    },
    {
      label: "Enemy",
      actions: [
        {
          label: "draw a card",
          handler: () => drawCardFromDeckToHand(1, true),
        },
        {
          label: "draw hand",
          handler: () => drawInitialHand(true),
        },
        {
          label: "Log deck",
          handler: handleLogEnemyDeck,
        },
        {
          label: "Log hand",
          handler: handleLogEnemyHand,
        },
        {
          label: "Log board",
          handler: handleLogEnemyBoard,
        },
        {
          label: "Log all",
          handler: () => {
            handleLogEnemyHand();
            handleLogEnemyDeck();
            handleLogEnemyBoard();
          },
        },
        {
          label: "destroy a card",
          handler: () => handleDeleteBoardCard(true),
        },
        {
          label: "destroy first card",
          handler: () => handleDeleteFirstBoardCard(true),
        },
      ],
    },
  ];
  function toggleToolbar() {
    setOpen(!open);
  }

  return (
    <>
      {inputModal?.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
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
      <div className="w-full fixed top-0 text-zinc-950 z-20">
        <div className="p-2 border-2 border-t-0 border-zinc-500 bg-zinc-300 max-w-[1024px] m-auto rounded-b-md">
          <h1 className="text-[12px] tracking-widest uppercase text-center font-bold flex justify-between items-center px-2">
            Master Toolbar
            <button className="border px-2" onClick={toggleToolbar}>
              Toggle
            </button>
          </h1>
          {open && (
            <div className="flex flex-col gap-4 mt-2">
              {groupActions.map((group) => (
                <div className="bg-zinc-200 text-center p-2" key={group.label}>
                  <div className="text-[12px] uppercase pb-1 mb-2 border-b border-zinc-300">
                    {group.label}
                  </div>
                  <div className="flex gap-2">
                    {group.actions.map(({ label, handler }) => (
                      <button
                        key={label}
                        className="w-full flex justify-center items-center border-2 border-zinc-50 bg-zinc-50 rounded-md"
                        onClick={() => handler()}
                      >
                        <span className="text-zinc-900 text-[10px]">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
