import { useEffect, useState } from 'react'
import Header from './Components/Header/Header';
import Repo from './Components/Repocitory/Repo';
import { useDispatch,useSelector } from 'react-redux';
import { fetchReposRequest } from './Slices/reposSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Chart from './Components/HighChart/Chart';




function App() {
 const {repos,loading} = useSelector((state)=>state.repos);
 const [page,setPage] = useState(1);
 const [value,setValue] = useState('1 month'); // keep track for filtering
 const [throttle,setThrottle] = useState(false);// variable for controlling api call
const dispatch = useDispatch();

let filterArry = [...repos]

// function to filter repos according to the selected value
function filterRepos(noOfWeeks){
  // find weeks in milliseconds
  let weekInMilliseconds = 24*60*60*1000*7*noOfWeeks;
  let tmp = repos.filter((item)=>{
    let date  = new Date(item.created_at);
    let currDate = new Date();
    let differenceInMilliseconds = currDate-date;
    return differenceInMilliseconds<=weekInMilliseconds;w
  })
  return tmp;
}

if(value==='1 week'){
 let tmp = filterRepos(1);
 filterArry = [...tmp];
}
else if(value==='2 week'){
  let tmp = filterRepos(2);
 filterArry = [...tmp];
}

  
// dispatch repo data depend on page state
  useEffect(()=>{
    if (!throttle && isBottom()) {
      setThrottle(true);
      dispatch(fetchReposRequest(page))
    // for controlling api call
    setTimeout(()=>{
      setThrottle(false);
    },2000)
  }
  },[page])




// return a boolean if it scroll reach on bottom of page
function isBottom() {
  return Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

// fetch repos data when scroll is in bottom position 
window.addEventListener('scroll', () => {
  if (!throttle && isBottom()) {
    setPage(page+1)
  }
});


  return (
    <>
      <Header setValue={setValue} />
      <div className='repo-container'>
        {
          filterArry.length>0 && filterArry.map((item,index)=>(
            <div key={index} style={{width:'70%'}}>
              <Repo data={item} />
            </div>
          ))
        }
        {
          loading && <CircularProgress/>
        }
      </div>
    </>
  )
}

export default App
