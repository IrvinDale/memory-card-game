import Header from './components/Header/Header';
import Subtitle from './components/Subtitle/Subtitle';
import CardsGrid from './components/CardsGrid/CardsGrid';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';

import useFetch from './hooks/useFetch';
import styles from './App.module.scss';


function App() {
  const { data, loading, error } = useFetch();

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Header />
      <Subtitle />
      <CardsGrid data={data} />
      <Footer />
    </div>
  )
}

export default App
