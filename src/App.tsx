import React from 'react';
import './App.scss';
import RateLoader from './app/cmp/RateLoader';
import Exchange from './app/features/exchange/Exchange';

const App = () => (
  <section className={'app'}>
    <header className={'app-header'}>
      <h1 className={'branding'}>balance</h1>
    </header>

    <main>
      <RateLoader>
        <Exchange />
      </RateLoader>
    </main>
  </section>
);

export default App;
