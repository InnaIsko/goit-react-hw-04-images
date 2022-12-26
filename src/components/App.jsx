import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [visibleLoader, setVisibleLoader] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }
    setVisibleLoader(true);

    const onFetchApi = () => {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = 'key=30946911-c6f6e3f672fcb97cd0cd3059d';
      const OPTIONS = '&image_type=photo&orientation=horizontal&per_page=12';

      const response = fetch(
        `${BASE_URL}?q=${name}&page=${page}&${API_KEY}${OPTIONS}`
      );
      return response;
    };

    onFetchApi()
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(
          new Error(`There are no images for your request`)
        );
      })
      .then(data => {
        if (data.hits.length === 0) {
          notify();
        }
        setData(prevState => {
          return [...prevState, ...data.hits];
        });
      })
      .catch(error => setError(error))
      .finally(() => {
        setVisibleLoader(false);
      });
  }, [name, page]);

  const notify = () => toast.info('There are no images for your request');

  const onSubmit = nameImg => {
    setName(nameImg);

    setData([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="finderWraper">
      {error && <p>{error.massage}</p>}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery data={data} />
      <Loader visible={visibleLoader} />
      {data.length >= 12 && <Button onClickBtn={onLoadMore} />}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
