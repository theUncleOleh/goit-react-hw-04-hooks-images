import React, { Component } from 'react';
 import { ToastContainer } from 'react-toastify';
 import Loader from './Loader';
 import { AiOutlineCloseCircle } from 'react-icons/ai';
 // import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
 import 'react-toastify/dist/ReactToastify.css';
 import s from './App.module.css';
 import SearchBar from './SearchBar';
 import ImageGallery from './ImageGallery';
 import NotificationMessage from './NotificationMesage';
 import Modal from './Modal';
 import Button from './Button';
 import ErrorMessage from './ErrorMessage';
 import axiosApi from '../services/services-api';
 class App extends Component {
   state = {
     searchQuery: null,
     pictures: [],
     loading: false,
     error: null,
     status: 'idle',
     largeImageURL: '',
     page: 1,
   };

   handleFormSubmit = query => {
     // console.log(image);
     this.setState({ searchQuery: query, page: 1 });
   };

   onImageClick = largeImageURL => {
     this.setState({
       largeImageURL,
     });
     // console.log(largeImageURL);
   };

   modalClose = () => {
     this.setState({
       largeImageURL: '',
     });
   };

   handleLoadButtonClick = () => {
     console.log('click the button', this.state.page);

     this.setState(prevState => {
       return { page: prevState.page + 1 };
     });
   };

   async componentDidUpdate(prevProps, prevState) {
     console.log('before', prevState.searchQuery);
     console.log('after', this.state.searchQuery);
     if (prevState.searchQuery !== this.state.searchQuery) {
       this.setState({ status: 'pending', pictures: [] });
       this.fetchImages();
     }
     // await axios
     //   .get(
     //     `?q=${newImage}&page=1&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
     //   )
     // servicesApi
     //   .axiosApi(newImage, this.state.page)
     //   .then(response =>
     //     this.setState({ pictures: response.data.hits, status: 'resolved' })
     //   )
     //   .catch(error => {
     //     this.setState({ error, status: 'rejected' });
     //   });

     // if (newPage === 1) {
     //   this.setState({ status: 'pending' });
     //   servicesApi
     //     .axiosApi(newImage, newPage)
     //     .then(response =>
     //       this.setState({ pictures: response.data.hits, status: 'resolved' })
     //     )
     //     .catch(error => {
     //       this.setState({ error, status: 'rejected' });
     //     });
     // }
     if (prevState.page !== this.state.page) {
       this.fetchImages();
     }

     //   if (prevPage !== newPage) {
     //     this.setState({ status: 'pending' });
     //     servicesApi
     //       .axiosApi(newImage, newPage)
     //       .then(response =>
     //         this.setState(state => ({
     //           pictures: [...state.pictures, ...response.data.hits],
     //           status: 'resolved',
     //         }))
     //       )
     //       .catch(error => {
     //         this.setState({ error, status: 'rejected' });
     //       });
     //   }
     // }
   }
   fetchImages = async () => {
     const { searchQuery, page } = this.state;

     try {
       const data = await axiosApi({ searchQuery, page });

       this.setState(prevState => ({
         pictures: [...prevState.pictures, ...data],
         status: 'resolved',
         newPage: data.length,
       }));
     } catch (error) {
       this.setState({ error, status: 'rejected' });
     }
   };

   // componentDidUpdate(prevProps, prevState) {
   //   const prevImage = prevState.image;
   //   const newImage = this.state.image;
   //   if (prevImage !== newImage) {
   //     console.log('new picture');
   //     // this.setState({ loading: true, pictures: [] });
   //     this.setState({ status: 'pending' });

   //     fetch(
   //       `https://pixabay.com/api/?q=${newImage}&page=1&key=24437827-e20f686b1c65a4a2859f17630&image_type=photo&orientation=horizontal&per_page=12`
   //     )
   //       .then(response => {
   //         if (response.ok) {
   //           return response.json();
   //         }
   //         return Promise.reject(new Error('Картинки с таким названием нет'));
   //       })
   //       .then(data =>
   //         this.setState({ pictures: data.hits, status: 'resolved' })
   //       )
   //       .catch(error => this.setState({ error, status: 'rejected' }));
   //     // .finally(this.setState({ loading: false }));
   //   }
   // }

   render() {
     const { error, pictures, status, largeImageURL } = this.state;

     if (status === 'idle') {
       return (
         <div>
           <SearchBar onSubmit={this.handleFormSubmit} />
           <NotificationMessage />
           <ToastContainer position="top-right" autoClose={5000} />
         </div>
       );
     }

     if (status === 'pending') {
       return <Loader />;
     }

     if (status === 'rejected') {
       return <ErrorMessage message={error.message} />;
     }

     if (status === 'resolved') {
       return (
         <div className={s.app}>
           <SearchBar onSubmit={this.handleFormSubmit} />
           <ImageGallery pictures={pictures} onClick={this.onImageClick} />
           {pictures && <Button onClick={this.handleLoadButtonClick} />}
           {largeImageURL.length > 0 && (
             <Modal onClose={this.modalClose}>
               <button
                 type="button"
                 className={s.buttonModal}
                 onClick={this.modalClose}
               >
                 <AiOutlineCloseCircle />
               </button>
               <img
                 src={this.state.largeImageURL}
                 alt=""
                 width="100%"
                 height="100%"
               />
             </Modal>
           )}
         </div>
       );
     }
     // return (
     //   <div className={s.app}>
     //     {!image && <div>tell me what you want</div>}
     //     {error && <h2>{error.message}</h2>}
     //     {loading && <div>Loading......</div>}
     //     <SearchBar onSubmit={this.handleFormSubmit} />
     //     <ImageGallery pictures={pictures} />
     //     {pictures && <button className={s.button}>Load more</button>}

     //     <ToastContainer
     //       position="top-right"
     //       autoClose={5000}
     //       hideProgressBar={false}
     //       newestOnTop={false}
     //       closeOnClick
     //       rtl={false}
     //       pauseOnFocusLoss
     //       draggable
     //       pauseOnHover
     //     />
     //   </div>
     // );
   }
 }

export default App;
