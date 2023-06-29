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
  const [cardDetails, setCardDetails] = useState<CharacterDetailPage | null>(
    null
  );

  const navigate = useNavigate();

  const handleButtonClick = () => navigate("/");
  const { id } = useParams() as { id: string };

  useEffect(() => {
    getCharacter(parseInt(id)).then((item) => {
      if (item) {
        setCardDetails(item);
      } else {
        navigate("/");
      }
    });
  });

  return (
    <div>
      {cardDetails && (
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
            <Typography variant="body2" color="text.primary">
              Status: {cardDetails.status}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Species: {cardDetails.species}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Gender: {cardDetails.gender}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleButtonClick}>
              Back to Home
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

export default Profile;
