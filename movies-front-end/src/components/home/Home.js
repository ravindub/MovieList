// Importing Movies component
import Movies from '../movies/Movies';

// Home component to display the Movies component with movies
const Home = ({ movies }) => {
  return (
    <div>
      <Movies movies={movies} />
    </div>
  );
};

export default Home;
