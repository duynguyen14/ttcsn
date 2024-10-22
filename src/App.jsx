
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { PublicPage, PrivatePage } from './page';
function App() {
  return (
    <Router>
      <div className='App'>
      <Routes>
      {
        PublicPage.map((page,index)=>{
          const Page=page.component
          const Layout=page.layout
          if(Layout==null) return (
            <Route key={index}  path={page.path} element={
                <Page/>
            }
            />
          )
          else {
            return(
              <Route key={index}  path={page.path} element={
                <Layout>
                  <Page/>
                </Layout>
              }
              />
            )
          }
        })
      }
    </Routes>
      </div>
    </Router>
  );
}
export default App
