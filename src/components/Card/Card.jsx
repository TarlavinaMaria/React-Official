/**
 * Компонент Card представляет собой карточку с изображением, краткой информацией и кнопкой.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.imageSrc - Путь к изображению.
 * @param {string} props.title - Заголовок карточки.
 * @param {string} props.description - Описание карточки.
 * @param {string} props.rating - Рейтинг карточки.
 * @param {string} props.reviewCount - Количество отзывов.
 * @param {string} props.price - Цена.
 */

const Card = ({ imageSrc, title, description, rating, reviewCount, price }) => {
  return (
    <div className="card">
      <img className="card-image" src={imageSrc} alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="card-rating">
          <span className="star">★</span>
          <span>{rating}</span>
          <span>({reviewCount} reviews)</span>
        </div>
        <div className="card-price">{price}</div>
        <button className="card-button">Buy now</button>
      </div>
    </div>
  );
};

export default Card;