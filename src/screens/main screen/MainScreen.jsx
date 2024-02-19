import React, { useRef, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const MainScreen = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useRef();

  const handleBtn = async () => {
    const userName = user.current.value;

    try {
      setLoading(true);

      const response = await axios.get(`https://api.github.com/users/${userName}`);
      const newData = response.data;
console.log(newData);
      
      setUserData((prevData) => [...prevData, newData]);

     
      user.current.value = '';
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main__div'>
      <div>
        <input className='input__field' type="text" placeholder="Enter Username" ref={user} />
        <button className='btn1' onClick={handleBtn}>search</button>
      </div>
      <div>
        <div className='loader'>
        {loading && <CircularProgress />}
         </div>
        {userData.map((item, index) => (
          
          <div key={index} className='main__rendering'>

              <div  className='rendering__div'>
               <h1>{item.login}</h1>
               <img src={item.avatar_url} alt="avatar" />
             </div>

          <div  className='rendering__div2' >
            <button><a href={item.html_url} target="_blank" rel="noopener noreferrer">go to link</a></button>
          </div>

          </div>
          
        ))}
      </div>
    </div>
  );
};

export default MainScreen;