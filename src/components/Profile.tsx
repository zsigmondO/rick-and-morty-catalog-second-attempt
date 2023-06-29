import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { CharacterDetailPage } from "../characters";
import { getCharacter } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const [cardID, setCardID] = useState<number>(577);
  const [cardDetails, setCardDetails] = useState<CharacterDetailPage>({
    id: 6,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    image: "",
    created: "",
  });

  let navigate = useNavigate();
  const handleButtonClick = () => {
    let path: string = `/`;
    navigate(path);
  };

  const { id } = useParams() as {id: string};
  useEffect(() => {    
    setCardID(parseInt(id, 10));
  }, [id]);

  useEffect(() => {
    getCharacter(cardID).then((item) => {
      setCardDetails(item);
      console.log(item);
    });
  }, [cardID]);

  return (
    <div>
      <Card raised sx={{ width: 300, margin: "auto", padding: "0.1em" }}>
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image={cardDetails.image}
          title={cardDetails.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardDetails.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {cardDetails.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Species: {cardDetails.species}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gender: {cardDetails.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: {cardDetails.created}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleButtonClick}>
            Back to Home
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Profile;
