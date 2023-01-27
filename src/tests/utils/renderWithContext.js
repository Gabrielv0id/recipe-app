import DataContext from '../../context/DataContext';

export const customRender = (ui, { providerProps, ...renderOptions }) => render(
  <DataContext.Provider { ...providerProps }>{ui}</DataContext.Provider>,
  renderOptions,
);
