import "./pages/Landingpage/todoIndex.css";
import TodoMain from "./pages/Routes/todomain.jsx";
import GlobalStoreProvider from "./store/GlobalContextProvider";

function App() {
  return (
    <div className="App">
      <GlobalStoreProvider>
        <TodoMain />
      </GlobalStoreProvider>
    </div>
  );
}

export default App;
