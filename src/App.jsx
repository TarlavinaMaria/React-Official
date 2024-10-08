import Card from './Card';


const App = () => {
  return (
    <div className="app">
      <Card
        imageSrc="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        title="Discover Nature's Beauty"
        description="Immerse yourself in the tranquil landscapes and breathtaking vistas of the natural world."
        rating="4.9"
        reviewCount="128"
        price="$99"
      />
    </div>
  );
};

export default App;