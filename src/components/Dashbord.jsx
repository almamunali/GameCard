import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { CardsAction } from "../Slice/CardItemSlice"
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import Cards from "../components/Cards"
import { useNavigate } from 'react-router';





const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "640px",
  backgroundColor: "#fff", boxShadow: "0px 2px 15px 6px rgb(137 173 255 / 20%)",

  borderRadius: "4px",
  p: 4,
  zIndex: 1
};



export default function Dashbord() {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModle = () => setOpen(false);



 
  const [anchorEl, setAnchorEl] = useState(null);
  const [cardCount, setCardCount] = useState(0)



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cardItems = useSelector((state) => state.CardDataAll.CardGames);
  console.log("what value is", cardItems);

  useEffect(() => {

    if (cardItems) {
      setCardCount(Number(cardItems.length));
    } else {
      setCardCount(0)
    }
   
    console.log("data.......", cardItems);
  
  },[cardItems]);


// dispatch total Amout ..
  const handleCardOpen = () => {
    handleOpen();
    dispatch(CardsAction.GetTotalPrice())

  }







// const total Amoutn 
const totalAmount=useSelector((state)=>state.CardDataAll.totalPrice);
console.log("total Amout", totalAmount);






  const dispatch = useDispatch()

  const handleRemoved = (id) => {
    dispatch(CardsAction.removedCartGame(id))
    dispatch(CardsAction.GetTotalPrice())
  }
  // card quantity decremtnt..
  const handleDecrement = (item) => {
    dispatch(CardsAction.DecrementQuantity(item))
    dispatch(CardsAction.GetTotalPrice())
  }
  //add quantity
  const handleIncremet = (item) => {
    dispatch(CardsAction.AddCardItem(item))
    dispatch(CardsAction.GetTotalPrice())
  }
// CheckOut ...
 const navigation =useNavigate()
 const handleCheckOut=()=>{
  handleCloseModle();
  navigation("./Checkout")

 }



  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Game Booking
          </Typography>

          <div>
            <IconButton
              size='large'
              onClick={handleCardOpen}

              aria-label="cart">
              <StyledBadge badgeContent={cardCount} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>

       <Box sx={{padding:"10px"}}>
         <Cards/>
       </Box>
      <Modal
        open={open}
        onClose={handleCloseModle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' } }}

      >
        <Box sx={style}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Box className='mdl-popup-bg' sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Add to Cart Game Booking
            </Typography>


          </Box>
          <Box>
            <Button variant='outlined' color="error" className='close-btn' onClick={handleCloseModle}>×</Button>
          </Box>
          </Box>

          <Box id="modal-modal-description" sx={{ mt: 1 }}>
            {cardItems && cardItems.map((item) => <>

              <Box sx={{ display: "flex" }} key={item.id}>
                <h3>{item.name}</h3>
                <img src={item.img} alt={item.name} style={{ width: "60px", height: "60px" }} />


                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    m: 1,
                  },
                }}>
                   <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={() => handleDecrement(item)}>
                    -
                  </Button>

                 <Button >{item.cartQuantity}</Button>

                  <Button onClick={() => handleIncremet(item)}>
                    +
                  </Button>
                  </ButtonGroup>
                </Box>
                <Typography variant="subtitle" sx={{marginTop:"15px",marginRight:"10px"}} >Price:{item.price}</Typography>
                <Button variant="outlined" size="small" style={{height:"30px", marginTop:"10px",padding:"10px"}} onClick={() => handleRemoved(item.id)}>Removed</Button>
                <Typography variant="subtitle" sx={{marginTop:"15px",marginLeft:"5px"}} >Total Price:{item.price *item.cartQuantity}</Typography>
              </Box>
              <Divider />
            </>)}
            <Box sx={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center",padding:"10px"}}>
            
            <Button variant="outlined" onClick={handleCheckOut}>Checkout</Button>
            <Box sx={{marginLeft:"10px"}}><Typography>Total Amoutn:{totalAmount}</Typography></Box>

            </Box>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}