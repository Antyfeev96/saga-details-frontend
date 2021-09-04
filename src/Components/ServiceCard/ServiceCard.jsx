import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchServiceRequest,
  clearSelectedId
} from '../../Actions/actionCreators';
import React, { Fragment, useEffect } from "react";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import { useHistory } from "react-router-dom";

const Container = styled.div`
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
`;

const NameField = styled.div``;

const PriceField = styled.div``;

const ContentField = styled.div``;

const Button = styled.button`
  padding: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`;

export default function ServiceCard() {
  const state = useSelector(({ services }) => services);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state.selectedId === null && state.selectedService.name === '') return;
    dispatch(fetchServiceRequest(state.selectedId))
  }, [state.selectedId, dispatch])

  const handleCancel = () => {
    history.goBack()
    dispatch(clearSelectedId());
  }

  const handleRepeat = async () => {
    dispatch(fetchServiceRequest(state.selectedId))
  }

  return (
      <Fragment>
        {(state.error && <Error handleRepeat={handleRepeat} />) ||
        ((state.loading || state.selectedService.name === '') ? (
            <Spinner />
        ) : (
            <Container className='form'>
              <NameField className='form__name' name='name'>
                Название: {state.selectedService.name}
              </NameField>
              <PriceField className='form__price' name='price'>
                Стоимость: {state.selectedService.price}
              </PriceField>
              <ContentField className='form__content' name='content'>
                Описание: {state.selectedService.content}
              </ContentField>
              <div className='form__buttons'>
                <Button
                    className='form__cancel'
                    onClick={handleCancel}
                    type='button'
                >
                  Cancel
                </Button>
              </div>
            </Container>
        ))}
      </Fragment>
  )
}
