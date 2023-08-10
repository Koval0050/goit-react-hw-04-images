import { useEffect, useState } from 'react';

import { Searchbar, ImageGallery, Modal, Button, Loader } from './components';
import { fetchImages } from 'services/api';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    if (searchTerm.trim() === '') return;
    requestImages(searchTerm, currentPage);
  }, [currentPage, searchTerm]);

  const requestImages = async (searchTerm, currentPage) => {
    try {
      setIsFetching(true);

      const { hits } = await fetchImages(searchTerm, currentPage);
      if (currentPage === 1) {
        setImages(hits);
      } else {
        setImages(prev => [...prev, ...hits]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmitSearchTerm = searchTerm => {
    if (searchTerm.trim() === '') {
      return;
    }
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleOpenModal = (src, alt) => {
    setModal({ isOpen: true, src, alt });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, src: '', alt: '' });
  };

  const showLoadMoreBtn = images.length > 0 && !isFetching;
  const { isOpen, src, alt } = modal;

  return (
    <div className="app">
      <Searchbar onSubmit={handleSubmitSearchTerm} />
      <ImageGallery
        error={error}
        isFetching={isFetching}
        images={images}
        openFullScreenMode={handleOpenModal}
      />
      {isFetching && <Loader />}
      {showLoadMoreBtn && <Button onClick={handleLoadMore} />}
      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          <img className="modalImg" src={src} alt={alt} />
        </Modal>
      )}
    </div>
  );
};
export default App;
