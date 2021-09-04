import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import React, {useEffect} from "react";
import {fetchServicesRequest, changeSelectedId } from "../../Actions/actionCreators";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {Link, useRouteMatch,} from "react-router-dom";

const List = styled.ul`
  margin: 25px auto 0;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  
  & li {
    width: fit-content;
    margin: 0 auto;
    list-style-type: none;
    cursor: pointer;
    
    & a {
      text-decoration: none;
      color: black;
    }
  }

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
    const state = useSelector(({services}) => services);
    const dispatch = useDispatch();
    const match = useRouteMatch();

    useEffect(() => {
        dispatch(fetchServicesRequest());
    }, [dispatch])

    const handleRepeat = () => {
        dispatch(fetchServicesRequest());
    }

    const handleSelectID = (id) => {
        dispatch(changeSelectedId(id))
    }

    return (
        <List>
            {(state.error && <Error handleRepeat={handleRepeat}/>) || (state.loading || state.items.length === 0 ?
                <Spinner/> : state.items.map(item =>
                    <li key={item.id} onClick={() => handleSelectID(item.id)} className="item">
                        <Link to={`${match.url}/${item.id}`}> {item.name} {item.price} <span>₽</span></Link>
                    </li>
                    ))}
        </List>
    )
}
