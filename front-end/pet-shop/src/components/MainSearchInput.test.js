import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainSearchInput from './MainSearchInput';
import { renderWithRouterAndStore } from '../helpers/renderWithRouterRedux';

import initialState from '../constants/initialState';

afterEach(cleanup);

describe('MainSearchInput component with no results', () => {
  it('should be able to type a query on input text', async () => {
    renderWithRouterAndStore(
      <MainSearchInput />, { route: '/' }, initialState,
    );

    const inputText = screen.getAllByPlaceholderText('O que você procura?');

    expect(inputText).toHaveLength(1);
    expect(inputText[0]).toBeVisible();

    userEvent.type(inputText[0], 'gato');

    const searchBtn = await screen.findAllByText('Pesquisar');

    expect(inputText[0]).toHaveValue('gato');

    expect(searchBtn).toHaveLength(1);
    expect(searchBtn[0]).not.toBeDisabled();
  });

  it('should be able to click on `Pesquisar` button after input query', async () => {
    renderWithRouterAndStore(
      <MainSearchInput />, { route: '/' }, initialState,
    );

    const inputText = screen.getAllByPlaceholderText('O que você procura?');

    userEvent.type(inputText[0], 'gato');

    const searchBtn = await screen.findAllByText('Pesquisar');

    expect(searchBtn[0]).not.toBeDisabled();

    userEvent.click(searchBtn[0]);

    const searchBtnClicked = await screen.findAllByText('Pesquisar');

    expect(searchBtnClicked[0]).toHaveClass('btn btn-secondary');
  });

  it('Text input query validation', async () => {
    renderWithRouterAndStore(
      <MainSearchInput />, { route: '/' }, initialState,
    );

    const inputText = screen.getAllByPlaceholderText('O que você procura?');

    userEvent.type(inputText[0], 'gato');

    const searchBtn = await screen.findAllByText('Pesquisar');

    expect(searchBtn[0]).not.toBeDisabled();

    userEvent.type(inputText[0], '22');

    const searchBtn1 = await screen.findAllByText('Pesquisar');

    expect(searchBtn1[0]).toBeDisabled();

    // userEvent.click(searchBtn[0]);

    // const searchBtnClicked = await screen.findAllByTestId('feedback');

    // expect(searchBtnClicked[0]).toHaveClass('btn btn-secondary');
  });
});
