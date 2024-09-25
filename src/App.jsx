import { useState, useEffect } from 'react';  

// ข้อมูลสินค้า
const products = [
  { id: 1, name: 'ด้วงกว่างสามเขา', price: 1000, image: 'https://lh6.googleusercontent.com/HjX-62BEMAv8EKFrqMFk63J6eZ_6-Lx9I7BNapHeqTlVUx2bfWNWpKfvDpaRdjbpLFlPNEJ-2UGpfKf6l3YXyapOq3k98J9jCzeDoPK8oJOnw8UuJASusFvqkSCR_yWplfiZB4UCHtNDfJ6JYPeoS3PkgMlk1Muy0GxbSrp60oX3AkkO6wIJUYFRqj9IHw' },
  { id: 2, name: 'ด้วงคีมสายรุ้ง', price: 1500, image: 'https://www.9845.jp/wp-content/uploads/16040209.jpg' },
  { id: 3, name: 'ด้วงกว่างช้างเผือก', price: 2000, image: 'https://th.bing.com/th/id/R.26b794f5c3402b4433d6c8db872291af?rik=4RWz5derZDUxJA&riu=http%3a%2f%2fchugoku16.domohajimemashite.net%2f006.jpg&ehk=vSLQ6wuzGQ7MOXUjNi1nglC%2bOUF9XduO3R4OEPFdcXs%3d&risl=&pid=ImgRaw&r=0' },
  { id: 4, name: 'ด้วงคีมทองกาญ', price: 2500, image: 'https://m.media-amazon.com/images/I/91Yykb5ROoL._AC_SL1500_.jpg' },
  { id: 5, name: 'ด้วงกว่างทีทิอุส', price: 3000, image: 'https://www.tsukiyono.co.jp/stag2/files/2024/02/f40de3636165dac5848145fc3d524205.jpg' },
  { id: 6, name: 'ด้วงกว่างเฮอร์คิวลิส', price: 7500, image: 'https://media.istockphoto.com/id/1017548722/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%87-hercules-%E0%B8%9A%E0%B8%99%E0%B8%81%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%83%E0%B8%99%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99.jpg?s=612x612&w=0&k=20&c=hhsCUISAL6hERpWgQSIXbAwXRziDgHuXj9YS89aTQLE=' },
  { id: 7, name: 'ด้วงกว่างญี่ปุ่น', price: 4000, image: 'https://media.istockphoto.com/id/146919998/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%94.jpg?s=612x612&w=0&k=20&c=D0PJnt8n_s5VlwSvZThmoDu_pq_n0UzeY3_7K1lgQmQ=' },
  { id: 8, name: 'ด้วงกว่างเนปจูน', price: 4500, image: 'https://mushinavi.com/kabukabu/jp-nep/f-nep10.jpg' },
  { id: 9, name: 'ด้วงดอกไม้อูแกน', price: 500, image: 'https://sanyonomori.ocnk.net/data/sanyonomori/product/20200424_bc82c5.jpg' },
  { id: 10, name: 'ด้วงคีมแลมพลิม่า', price: 5500, image: 'https://image1.shopserve.jp/bighornnet.com/pic-labo/papuakinniro.jpg?t=20230118144516' },
];

export default function ProductList() {
  const [cart, setCart] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [shippingFee] = useState(100);

  const couponColors = ['red', 'green', 'black', 'blue', 'cyan'];

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const generateRandomCoupon = () => {
    const discountOptions = [0.1, 0.2, 0.5];
    const randomIndex = Math.floor(Math.random() * discountOptions.length);
    const randomDiscount = discountOptions[randomIndex];
    setCoupon(randomDiscount);
  };

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const discount = coupon ? coupon * totalPrice : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % couponColors.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={{ 
      backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)', 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: couponColors[colorIndex], 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        Photharam Beetle Shop
        <div style={{ marginLeft: '10px', display: 'inline-block' }}>
          🛒 ({totalItemsInCart})
        </div>
      </h1>

      <button onClick={generateRandomCoupon} style={{ display: 'block', margin: '0 auto' }}>
        🎁 สุ่มคูปองส่วนลด
      </button>

      {coupon && (
        <p style={{ textAlign: 'center', color: 'green', fontSize: '16px' }}>
          ยินดีด้วย! คุณได้รับคูปองส่วนลด {coupon * 100}%!
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '25px', padding: '25px', backgroundColor: '#f0fff0' }}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
            <h3 style={{ color: 'black' }}>{product.name}</h3>
            <p style={{ color: 'black' }}>ราคา: {product.price} บาท</p>
            <button onClick={() => addToCart(product)} style={{ color: couponColors[colorIndex] }}>
              🛒 เพิ่มลงตะกร้า
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', border: '2px solid #000', padding: '20px', backgroundColor: '#e0f7e0' }}>
        <h2 style={{ color: couponColors[colorIndex] }}>🛍️ ตะกร้าสินค้า</h2>
        {cart.length === 0 ? (
          <p style={{ color: 'black' }}>ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((product) => (
              <li key={product.id} style={{ marginBottom: '10px', color: 'black' }}>
                {product.name} - {product.price} บาท x {product.quantity}
                <div>
                  <button onClick={() => updateQuantity(product, product.quantity - 1)}>➖</button>
                  <button onClick={() => updateQuantity(product, product.quantity + 1)}>➕</button>
                  <button onClick={() => removeFromCart(product)}>❌ ลบ</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p style={{ color: 'black' }}>ยอดรวม: {totalPrice} บาท</p>
        {coupon && <p style={{ color: 'black' }}>ส่วนลด: {discount} บาท</p>}
        <p style={{ color: 'black' }}>ค่าจัดส่ง: {shippingFee} บาท</p>
        <p style={{ color: 'black' }}>ยอดชำระทั้งหมด: {totalPrice - discount + shippingFee} บาท</p>
      </div>
    </div>
  );
}