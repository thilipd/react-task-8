import './App.css';
import { Card, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from './Header';
import Home from './Home';


function App() {

  const [toggle, SetToggle] = useState(true);
  const [dataValue, SetDataValue] = useState('');

  const dashboardToggele = (val) => {
    SetToggle(val);
  }

  const dataValueParam = (name) => {
    SetDataValue(name);
  }

  return (
    <>
      <div className='container'>

        <Header dashboardToggele={dashboardToggele} />
        {(toggle) ? <>
          <Dashboard dashboardToggele={dashboardToggele} dataValue={dataValueParam} />
        </> :
          <>
            <Home value={dataValue} dataValue={dataValueParam} />
          </>}

      </div >

    </>
  );
}

export default App;



function Dashboard(props) {

  const handleClick = (e) => {

    props.dashboardToggele(false)
    props.dataValue(e.target.name);
  }

  return (
    <>

      <div className="dashboard">


        <Card sx={{ minWidth: 275, height: 200 }}
          className='card'>

          <div>

            <h1>Teachers Dashboard</h1>

          </div>
          <div className='btn'>
            <Button size="small"
              color='secondary'
              variant="contained"
              name="teacher"
              onClick={(e) => handleClick(e)}>Teachers Dashboard</Button>

          </div>
        </Card>




        <Card sx={{ minWidth: 275, height: 200 }}
          className='card'>
          <div>

            <h1>Students Dashboard</h1>

          </div>
          <div className='btn'>
            <Button size="small"
              color='secondary'
              variant="contained"
              name="student"
              onClick={(e) => handleClick(e)}>Students Dashboard</Button>

          </div>

        </Card>

      </div>
    </>

  )
}