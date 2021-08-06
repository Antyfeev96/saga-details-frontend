import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeInputField,
  changeEditedId,
  fetchService,
  saveService
} from '../../Reducers/services';
import React, { Fragment, useEffect } from "react";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import { useHistory } from "react-router-dom";

const Form = styled.form`
  input {
    display: block;
    padding: 2px;
    margin-top: 15px;
    width: 200px;
  }
  
  .form__buttons {
    margin-top: 15px;
    
    & button:nth-of-type(n + 2) {
      margin-left: 15px;
    }
  }
`

const NameInput = styled.input``

const PriceInput = styled.input``

const ContentInput = styled.input``

const Button = styled.button`
  padding: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`

export default function ServiceCard() {
  const state = useSelector(state => state.myState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state.editedId === null) return;
    dispatch(fetchService(state.editedId))
  },[dispatch, state.editedId])

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeInputField({ name, value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { editedId, name, price, content } = state
    dispatch(saveService({ id: editedId, name, price, content }))
    history.goBack();
    clearInputs();
  }

  const handleCancel = () => {
    history.goBack()
    dispatch(changeEditedId(null));
    clearInputs();
  }

  return (
      <Fragment>
        {(state.error && <Error/>) || (state.loading ? <Spinner /> :
            <Form className="form" onSubmit={handleSubmit}>
              <div>Название</div>
              <NameInput className="form__name" name='name' onChange={handleChange} value={state.name}/>
              <div>Стоимость</div>
              <PriceInput className="form__price" name='price' onChange={handleChange} value={state.price}/>
              <div>Описание</div>
              <ContentInput className="form__description" name='content' onChange={handleChange} value={state.content}/>
              <div className="form__buttons">
                <Button className="form__cancel" onClick={handleCancel} type='button'>Cancel</Button>
                <Button className="form__button" type='submit'>Save</Button>
              </div>
            </Form>)}
      </Fragment>
  )
}
