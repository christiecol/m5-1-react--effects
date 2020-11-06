import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import cookieSrc from "../cookie.svg";
import useInterval from "../hooks/use-interval.hook";
import useKeyDown from "../hooks/useKeyDown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
  { id: "megaCursor", name: "Mega Cursor", cost: 500, value: 0 },
];
// console.log(items[0].name);

// const eachItemCost = items.map((item) => {
//   return item.cost;
// });

const initialCost = {
  cursor: 10,
  grandma: 100,
  farm: 1000,
  megaCursor: 500,
};

const initialItems = {
  cursor: 0,
  grandma: 0,
  farm: 0,
  megaCursor: 0,
};

const Game = () => {
  const [numCookies, setNumCookies] = useState(10000);
  const [purchasedItems, setPurchasedItems] = useState(initialItems);
  const [itemCost, setItemCost] = useState(initialCost);
  console.log(itemCost);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // Add this number of cookies to the total
    setNumCookies((numCookies) => numCookies + numOfGeneratedCookies);
  }, 1000);

  const calculateCookiesPerTick = () => {
    // console.log(initialItemsArray);
    const generatedCookies =
      purchasedItems.cursor * items[0].value +
      purchasedItems.grandma * items[1].value +
      purchasedItems.farm * items[2].value;
    // purchasedItems.megaCursor * items[3].clickCount;

    return generatedCookies;
  };

  const handleClick = (cost, id) => {
    console.log(cost);
    if (cost > numCookies) {
      alert("You do not have enough cookies!");
    } else {
      setNumCookies((numCookies) => numCookies - cost);
      setItemCost((itemCost) => {
        return { ...itemCost, [id]: Math.ceil(itemCost[id] * 1.25) };
      });
      setPurchasedItems((purchasedItems) => {
        return { ...purchasedItems, [id]: purchasedItems[id] + 1 };
      });
    }
  };

  useKeyDown("spacebar", useKeyDown);

  useDocumentTitle(
    `${numCookies} cookies - Cookie Clicker Workshop`,
    "Cookie Clicker Workshop"
  );

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* cookies per second*/}
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button
          onClick={() => {
            {
              setNumCookies((numCookies) => {
                return numCookies + Math.pow(2, purchasedItems.megaCursor);
              });
            }
          }}
        >
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          let firstItem = index === 0 ? true : false;
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              cost={itemCost[item.id]}
              value={item.value}
              purchasedItems={purchasedItems}
              firstItem={firstItem}
              numOwned={purchasedItems[item.id]}
              handleClick={handleClick}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
  padding-bottom: 10px;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
