import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from "react";
import { fetchServicesRequest } from "../../Actions/actionCreators";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { Link, useRouteMatch, } from "react-router-dom";

const List = styled.ul`
  margin-top: 25px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;

  & .item:nth-of-type(n + 2) {
    margin-top: 15px;
  }

  & .item {
    button {
      margin-left: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`

export default function ItemsList() {
  const state = useSelector(({ services }) => services);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  console.log({state})

  useEffect(() => {
    dispatch(fetchServicesRequest());
  }, [dispatch])

  return (
   <List>
     {(state.error && <Error/>) || (state.loading ? <Spinner /> : state.items.map(item =>
        <li key={item.id} className="item">
        {item.name} {item.price} <span>₽</span>
        </li>))}
   </List>
  )
}
