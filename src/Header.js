import './App.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';




const Header = (props) => {

    console.log(props)

    return (
        <>
            <div className='headContainer'>
                <div className='containerHead'>

                    <h2>Student and teacher Crud Dashboard</h2>
                    <div className='homeIcon'>
                        <IconButton sx={{ color: "white" }}
                            size="large"
                            aria-label='Home'
                            onClick={() => { props.dashboardToggele(true) }}
                        >
                            <HomeOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Header;