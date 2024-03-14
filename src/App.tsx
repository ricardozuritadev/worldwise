import CitiesContextProvider from "contexts/CitiesContext";
import Routes from "routes/Routes";

const App = () => {
  return (
    <CitiesContextProvider>
      <Routes />
    </CitiesContextProvider>
  );
};
export default App;
