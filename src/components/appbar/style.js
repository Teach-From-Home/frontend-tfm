import { makeStyles } from '@material-ui/core/styles';

 const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        maxWidth: 70
    },
    toolbar: {
        maxWidth: 800,
        width: "100%"
    }
  }));
  
  export default useStyles