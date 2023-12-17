import "./App.css";
import { useState } from "react";
import Images from "./mock/tags.json";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [items, setItems] = useState(Images);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const filteredItems = (name) => {
    const updatedItems = Images.filter((currentEle) => {
      return currentEle.tags === name;
    });
    setItems(updatedItems);
  };

  const desktopSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const tabletSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div>
      <div className="container">
        <h1>Gallery</h1>
        <div className="content">
          <h2>Photo Gallery</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
          <ul className="tags">
            <button onClick={() => setItems(Images)}>All</button>
            <button onClick={() => filteredItems("Branding")}>Branding</button>
            <button onClick={() => filteredItems("Design")}>Design</button>
            <button onClick={() => filteredItems("Development")}>
              Development
            </button>
          </ul>
        </div>
        <div className="image-grid">
          {items.map((image, index) => (
            <img
              key={index}
              src={image.picture}
              alt={`Image ${index}`}
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
        >
          {selectedImage !== null && (
            <div>
              <img
                className="popup-image"
                src={items[selectedImage].picture}
                alt={`Image ${selectedImage}`}
              />

              <Slider
                {...(window.innerWidth < 768
                  ? tabletSettings
                  : desktopSettings)}
                initialSlide={selectedImage}
              >
                {items.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.picture}
                      alt={`Image ${index}`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <button onClick={closeModal}>X</button>
        </Modal>
      </div>
    </div>
  );
}

export default App;
