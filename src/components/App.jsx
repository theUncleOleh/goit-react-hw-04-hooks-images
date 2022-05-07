import { useState, useEffect, useRef } from 'react';
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
export default function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [pictures, setPictures] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const firstRender = useRef(true);

  const handleFormSubmit = query => {
    // console.log(image);
    setSearchQuery(query, page);
  };

  const onImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    // console.log(largeImageURL);
  };
  const modalClose = () => {
    setLargeImageURL('');
  };
  const handleLoadButtonClick = () => {
    console.log('click the button', this.state.page);

    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (firstRender.current) {
      console.log(firstRender);
      firstRender.current = false;
      console.log(firstRender);
      return;
    }

    // if (searchQuery === '') {
    //   return;
    // }

    async function fetchImage() {
      try {
        const data = await axiosApi({ searchQuery, page });
        setPictures(state => [...state, ...data]);
        setStatus('resolved');

        // this.setState(prevState => ({
        //   pictures: [...prevState.pictures, ...data],
        //   status: 'resolved',
        //   newPage: data.length,
        // }));
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    setStatus('pending');
    setPictures([]);
    fetchImage();
  }, [searchQuery, page]);

  const totalPictures = pictures.length;
  if (status === 'idle') {
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
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
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery pictures={pictures} onClick={onImageClick} />
        {totalPictures > 0 && totalPictures >= 12 && (
          <Button onClick={handleLoadButtonClick} />
        )}
        {largeImageURL.length > 0 && (
          <Modal onClose={modalClose}>
            <button
              type="button"
              className={s.buttonModal}
              onClick={modalClose}
            >
              <AiOutlineCloseCircle />
            </button>
            <img src={largeImageURL} alt="" width="100%" height="100%" />
          </Modal>
        )}
      </div>
    );
  }
}

//  class App extends Component {
//    state = {
//      searchQuery: null,
//      pictures: [],
//      loading: false,
//      error: null,
//      status: 'idle',
//      largeImageURL: '',
//      page: 1,
//    };

//    handleFormSubmit = query => {
//      // console.log(image);
//      this.setState({ searchQuery: query, page: 1 });
//    };

// onImageClick = largeImageURL => {
//   this.setState({
//     largeImageURL,
//   });
//   // console.log(largeImageURL);
// };

// modalClose = () => {
//   this.setState({
//     largeImageURL: '',
//   });
// };

// handleLoadButtonClick = () => {
//   console.log('click the button', this.state.page);

//   this.setState(prevState => {
//     return { page: prevState.page + 1 };
//   });
// };

//    async componentDidUpdate(prevProps, prevState) {
//      console.log('before', prevState.searchQuery);
//      console.log('after', this.state.searchQuery);
//      if (prevState.searchQuery !== this.state.searchQuery) {
//        this.setState({ status: 'pending', pictures: [] });
//        this.fetchImages();
//      }

//      if (prevState.page !== this.state.page) {
//        this.fetchImages();
//      }
//    }
// fetchImages = async () => {
//   const { searchQuery, page } = this.state;

//   try {
//     const data = await axiosApi({ searchQuery, page });

//     this.setState(prevState => ({
//       pictures: [...prevState.pictures, ...data],
//       status: 'resolved',
//       newPage: data.length,
//     }));
//   } catch (error) {
//     this.setState({ error, status: 'rejected' });
//   }
// };

//  render() {
//    const { error, pictures, status, largeImageURL } = this.state;
//    const totalPictures = pictures.length;
//    if (status === 'idle') {
//      return (
//        <div>
//          <SearchBar onSubmit={this.handleFormSubmit} />
//          <NotificationMessage />
//          <ToastContainer position="top-right" autoClose={5000} />
//        </div>
//      );
//    }

//    if (status === 'pending') {
//      return <Loader />;
//    }

//    if (status === 'rejected') {
//      return <ErrorMessage message={error.message} />;
//    }

//    if (status === 'resolved') {
//      return (
//        <div className={s.app}>
//          <SearchBar onSubmit={this.handleFormSubmit} />
//          <ImageGallery pictures={pictures} onClick={this.onImageClick} />
//          {totalPictures > 0 && totalPictures >= 12 && (
//            <Button onClick={this.handleLoadButtonClick} />
//          )}
//          {largeImageURL.length > 0 && (
//            <Modal onClose={this.modalClose}>
//              <button
//                type="button"
//                className={s.buttonModal}
//                onClick={this.modalClose}
//              >
//                <AiOutlineCloseCircle />
//              </button>
//              <img
//                src={this.state.largeImageURL}
//                alt=""
//                width="100%"
//                height="100%"
//              />
//            </Modal>
//          )}
//        </div>
//      );
//      }
//      // return (
//      //   <div className={s.app}>
//      //     {!image && <div>tell me what you want</div>}
//      //     {error && <h2>{error.message}</h2>}
//      //     {loading && <div>Loading......</div>}
//      //     <SearchBar onSubmit={this.handleFormSubmit} />
//      //     <ImageGallery pictures={pictures} />
//      //     {pictures && <button className={s.button}>Load more</button>}

//      //     <ToastContainer
//      //       position="top-right"
//      //       autoClose={5000}
//      //       hideProgressBar={false}
//      //       newestOnTop={false}
//      //       closeOnClick
//      //       rtl={false}
//      //       pauseOnFocusLoss
//      //       draggable
//      //       pauseOnHover
//      //     />
//      //   </div>
//      // );
//    }
//  }

// export default App;
