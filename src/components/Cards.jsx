import {useState} from 'react'
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { cardDataAll } from '../CardData/cardData';
import { CardsAction } from '../Slice/CardItemSlice';
import { useDispatch } from 'react-redux';

const Cards= () => {

  const [addGame,setGame]=useState([])
  const dispatch=useDispatch()

  const handleAddCard=(item)=>{

    setGame([...addGame].concat(item));
    dispatch(CardsAction.AddCardItem(item));
  
  }
  console.log("new sew addgame",addGame)
  return (
    <>
    <Box  sx={{
     
    display: 'flex',
    justifyContent:"space-between"
  }}>
    {cardDataAll.map(item =>

    
      <Card key={item.id} sx={{width:"350px",padding:"10px"}}>
      <CardMedia
        sx={{height:"200px"}}
        image={item.img}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price:{item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>handleAddCard(item)}>Add to Card</Button>
      </CardActions>
    </Card>
     

    )}
     
     </Box>
    
    </>
  )
}

export default Cards
