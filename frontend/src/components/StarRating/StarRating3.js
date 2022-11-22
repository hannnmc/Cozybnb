import React, { Component, useEffect, useState } from "react";
import FilledStar from '../../assets/images/filled-star.svg';
import EmptyStar from '../../assets/images/empty_star.svg';

const StarRating = ({setCommunication}) => {

    const [currRating, setCurrRating] = useState(5);
    const [selectRating, setSelectRating] = useState(null);

    const finalRating = selectRating || currRating

    const onHover = (e) => {
        if (e.target.className === "star") {
            setCurrRating(e.target.dataset.value);
        }
      }
    
      const onClick= (e) => {
        if (e.target.dataset.value === currRating) {
            setSelectRating(e.target.dataset.value);
        }
      }

      useEffect(() => {
        setCommunication(finalRating)
        },[selectRating, currRating])

    return [...Array(5).keys()].map((index) => {
        return (
        <img
            key={index}
            data-value={index + 1}
            className="star"
            onMouseOver={onHover}
            onClick={onClick}
            src={selectRating ? (index + 1 <= selectRating ? FilledStar : EmptyStar) : (index + 1 <= currRating ? FilledStar : EmptyStar)}
        />
        );
    });

}
 
export default StarRating;


