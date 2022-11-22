import React, { Component, useState } from "react";
import "./StarRating.css";
import FilledStar from '../../assets/images/filled-star.svg';
import EmptyStar from '../../assets/images/empty_star.svg';

const StarRating = () => {

    const [currRating, setCurrRating] = useState(5);
    const [selectRating, setSelectRating] = useState(null);

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


