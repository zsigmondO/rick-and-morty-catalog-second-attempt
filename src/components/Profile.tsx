import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/*
 id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
*/

function Profile() {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }} >
        <CardMedia
          sx={{ height: 140 }}
          image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          title="kolbasz"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Gáspár Laci
          </Typography>
          <Typography variant="body2" color="text.secondary">
            státusza Lacinak
          </Typography>
          <Typography variant="body2" color="text.secondary">
            fajtája Lacinak
          </Typography>
          <Typography variant="body2" color="text.secondary">
            neme Lacinak
          </Typography>
          <Typography variant="body2" color="text.secondary">
            kreálva Laci
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Back to Home</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Profile;
