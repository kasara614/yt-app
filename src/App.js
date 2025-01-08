import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import Head from './components/Head';
import store from './utils/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainContainer from './MainContainer';
import WatchPage from './components/WatchPage';

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Body />,
  children: [
    {
      path: "/",
      element: <MainContainer />
    },
    {
      path: "watch",
      element: <WatchPage />
    }
  ]
}]);

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* <h1 className="text-blue-300">Radhe Radhe React 👏</h1> */}
        <Head />
        <RouterProvider router={appRouter} />

        { /****
      * 
      * Head
      * Body
      *   Sidebar
      *     MenuItems
      *   MainContainer
      *     ButtonList
      *     VideoContainer
      *         VideoCard
      * 
      */}

      </div>
    </Provider >
  );
}

export default App;
