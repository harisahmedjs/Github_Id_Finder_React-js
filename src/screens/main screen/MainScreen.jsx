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


             <div className='profile-container'>
                <img src={item.avatar_url} alt="avatar" className='profile-img' />
                <button className='link__btn'><a  href={item.html_url} target="_blank">Visit Profile</a></button>
              </div>


          <div  className='rendering__div2' >
               <p className='bio1'><span>Username:-</span>{item.login}</p>
               <p className='bio'><span>Bio:-</span>{item.bio}</p>
               <p className='bio1'><span>Joined At:-</span> {item.created_at}</p>
               <p className='bio1'><span>Total_Repos:-</span>{item.public_repos}</p>
               <p className='bio1'><span>Following:-</span>{item.following}</p>
               <p className='bio1'><span>Followers:-</span>{item.followers}</p>
          </div>
 

   


          </div>
          
        ))}
      </div>
    </div>
  );
};

export default MainScreen;