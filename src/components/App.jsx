import { useState, useEffect } from 'react';
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

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'regected',
};
export default function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
    console.log(query);
  };

  const onImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    console.log(largeImageURL);
  };
  const modalClose = () => {
    setLargeImageURL('');
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchImage() {
      try {
        await axiosApi({ searchQuery, page }).then(data => {
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
          setTotalPages(data.totalHits);
        });
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    }

    fetchImage();
  }, [page, searchQuery]);

  const updatePage = () => {
    console.log('click the button', page);
    setPage(prevPage => prevPage + 1);
  };
  const totalPictures = pictures.length;
  if (status === Status.IDLE) {
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        <NotificationMessage />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    );
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <ErrorMessage message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={s.app}>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery pictures={pictures} onClick={onImageClick} />
        {totalPictures > 0 && totalPictures < totalPages && (
          <Button onClick={updatePage} />
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
