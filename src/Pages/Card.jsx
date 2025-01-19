import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import UseCard from "../UseCard";

// const fetchItems = async () => {
//   const { data } = await axios.get("http://localhost:5000/cards");
//   return data;
// };
const Card = () => {
  const [card]=UseCard();
  // const {
  //   data: items = [],
  // } = useQuery({
  //   queryKey: ["items"],
  //   queryFn: fetchItems,
  // });


  return (
    <div className="">
      <div className="mt-28 container mx-auto">this is card {card.length}</div>
    </div>
  );
};

export default Card;
