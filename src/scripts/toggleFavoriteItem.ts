import { getFavoritesAmount } from "./getFavoritesAmount.js";
import { renderUserBlock } from "./user.js";

export const toggleFavoriteItem = () => {
  let favoriteItemsMerged = [];
  const elResultsList = document.querySelector(".results-list");
  elResultsList.querySelectorAll(".favorites").forEach((item) => {
    item.addEventListener("click", (event: Event) => {
      const { target } = event;
      (target as HTMLDivElement)?.classList.toggle("active");
      const favoriteItemName = (target as HTMLDivElement)?.parentElement
        .parentElement.lastElementChild.firstElementChild.firstElementChild
        .textContent;

      const id = (target as HTMLDivElement)?.parentElement.parentElement
        .parentElement.dataset.id;

      const favoriteItemImage = (target as HTMLDivElement)?.parentElement
        .lastElementChild["src"];
      const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems"));

      if (favoriteItems !== null) {
        const found = favoriteItems.find(
          (item: { id: string }) => item.id === id
        );

        if (found) {
          favoriteItemsMerged = favoriteItems.filter(
            (item: { id: string }) => item.id !== id
          );
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(favoriteItemsMerged)
          );
        } else {
          favoriteItemsMerged = [
            ...favoriteItems,
            ...[
              {
                id: id,
                name: favoriteItemName,
                img: favoriteItemImage,
              },
            ],
          ];
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(favoriteItemsMerged)
          );
        }
      } else {
        favoriteItemsMerged = [
          {
            id: id,
            name: favoriteItemName,
            img: favoriteItemImage,
          },
        ];
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(favoriteItemsMerged)
        );
      }
      renderUserBlock("Chica", "/img/avatar.png", +getFavoritesAmount());
    });
  });
};
