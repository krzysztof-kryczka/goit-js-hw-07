import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
let instance;

const genDivItem = ({ preview, original, description }) => `
  <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>
`;

const getImages = (img) => img.map((item) => genDivItem(item)).join("");

gallery.innerHTML = getImages(galleryItems);

gallery.addEventListener("click", onClickGallery);

const genBigImg = ({ url, description }) => `
  <img
    class="gallery__image"
    src="${url}"
    width="1280"
    alt="${description}"/>
`;

function onClickGallery(e) {
  e.preventDefault();

  const url = e.target.dataset.source;
  const description = e.target.alt;

  if (!(url && description)) return;

  instance = basicLightbox.create(genBigImg({ url, description }), {
    onClose: () => {
      gallery.removeEventListener("keydown", onKeyDownEsc);
    },
  });
  instance.show();
  gallery.addEventListener("keydown", onKeyDownEsc);
}

const onKeyDownEsc = (e) => {
  if (e.key === "Escape" || e.keyCode === 27) {
    instance.close();
  }
  console.log(e.key);
};
