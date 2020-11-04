import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = (props) => {
  const { name, cost, value, numOwned, handleClick, id, firstItem } = props;
  // console.log(props);

  const ref = useRef(null);

  const focusedButton = () => {
    if (firstItem) {
      console.log(ref.current);
      ref.current.focus();
    }
  };

  useEffect(() => {
    focusedButton();
  }, []);

  return (
    <>
      <ItemButton
        ref={ref}
        onClick={() => {
          handleClick(cost, id);
        }}
      >
        <NameAndCost>
          <Name>{name}</Name>
          <Cost>
            Cost: {cost} cookie(s).{" "}
            <span>Produces {value} cookie(s)/second</span>
          </Cost>
        </NameAndCost>

        <div>
          <Owned>{numOwned}</Owned>
        </div>
      </ItemButton>
    </>
  );
};

const ItemButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 20px;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  &:focus {
    outline: 2px solid white;
  }
`;

const Name = styled.h2`
  padding-bottom: 9px;
`;

const NameAndCost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Cost = styled.p`
  font-size: 1.1rem;
`;

const Owned = styled.p`
  font-size: 2.8rem;
  margin-left: 5rem;
`;

export default Item;
