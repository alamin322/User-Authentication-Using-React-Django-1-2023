import Navbar from './Navbar';
import UserProfile from './UserProfile';
import Main from './Main';
import Carousel from './Carousel';


function App() {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const usename = localStorage.getItem('username_login');
  console.log("Check user login or not from app.js file: ", isLoggedIn);
  console.log("Usename: ", usename);

  return (
    <>
      <Navbar />
      {/* {isLoggedIn ? <UserProfile user_name = {usename} /> : <Carousel />} */}
      {isLoggedIn ? <UserProfile user_name = {usename} /> : <Main />}
    </>
  );
}

export default App;
