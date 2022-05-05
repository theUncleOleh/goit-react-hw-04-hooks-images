import axios from 'axios';
 const axiosApi = ({ searchQuery = '', page = 1 }) => {
   return axios
     .get(
       `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
     )
     .then(res => res.data.hits)

     .catch(error => console.log(error));
 };

 export default axiosApi;
