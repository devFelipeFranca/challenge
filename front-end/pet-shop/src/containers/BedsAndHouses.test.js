import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helpers/renderWithRouterRedux';
import BedsAndHouses from './BedsAndHouses';

import mockedShoppingCart from '../mocks/mockedShoppiingCart';
import mockedQuery from '../mocks/mockedQuery';

const MOCKED_QUERY_URL = 'https://api.mercadolibre.com/sites/MLB/search?category=MLB1072&q=+Casinhas+e Camas&limit=5';

afterEach(cleanup);

describe('BedsAndHouses component and children', () => {
  it('should render a card item after have called global fetch', async () => {
    const apiResponse = Promise.resolve({
      json: () => Promise.resolve(mockedQuery),
      ok: true,
    });

    const mockedExchange = jest.spyOn(global, 'fetch')
      .mockImplementation(() => apiResponse);

    renderWithRouterAndStore(<BedsAndHouses />, { route: '/' }, mockedShoppingCart);

    const cardItem = await screen.findAllByText(/osso mastigável/i);

    expect(cardItem).toHaveLength(1);
    expect(cardItem[0]).toBeVisible();

    expect(mockedExchange).toHaveBeenCalled();
    expect(mockedExchange).toHaveBeenCalledTimes(1);
    expect(mockedExchange).toHaveBeenCalledWith(MOCKED_QUERY_URL);
  });
});
