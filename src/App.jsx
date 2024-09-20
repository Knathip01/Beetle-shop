import { useState, useEffect } from 'react'; 
// ข้อมูลสินค้า
const products = [
  { id: 1, name: 'ด้วงกว่างไททัน', price: 1000, image: 'sitanus.png' },
  { id: 2, name: 'ด้วงคีมทอง', price: 1500, image: 'cream.jpg' },
  { id: 3, name: 'ด้วงกว่างช้างเผือก', price: 2000, image: 'elephant.jpg' },
  { id: 4, name: 'ด้วงคีมรถถัง', price: 2500, image: 'g1truck.jpg' },
  { id: 5, name: 'ด้วงคีมก้ามปู', price: 3000, image: 'ggg.jpg' },
  { id: 6, name: 'ด้วงกว่างเฮอร์คิวลิส', price: 7500, image: 'hercuris.jpg' },
  { id: 7, name: 'ด้วงกว่างญี่ปุ่น', price: 4000, image: 'japan.jpeg' },
  { id: 8, name: 'ด้วงกว่างเนปจูน', price: 4500, image: 'nepjun.jpg' },
  { id: 9, name: 'ด้วงกว่าง ทีทิอุส', price: 500, image: 'titius.jpg' },
  { id: 10, name: 'ด้วงกว่างเซนทอร์', price: 5500, image: 'Zentro.jpg' },
];

export default function ProductList() {
  const [cart, setCart] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [showCouponImage, setShowCouponImage] = useState(false); // สถานะแสดงภาพคูปอง
  const [shippingFee] = useState(100);

  const couponColors = ['red', 'green', 'yellow', 'blue', 'cyan'];

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
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

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  // ฟังก์ชันเพิ่มลดจำนวนสินค้าในตะกร้า
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

  // ฟังก์ชันสุ่มคูปอง
  const generateRandomCoupon = () => {
    const discountOptions = [0.1, 0.2, 0.5];
    const randomIndex = Math.floor(Math.random() * discountOptions.length);
    const randomDiscount = discountOptions[randomIndex];
    setCoupon(randomDiscount);
    setShowCouponImage(true); // แสดงรูปเมื่อกดปุ่มสุ่มคูปอง
  };

  // คำนวณราคาสินค้าทั้งหมด
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // คำนวณส่วนลดจากคูปอง
  const discount = coupon ? coupon * totalPrice : 0;

  // เปลี่ยนสีข้อความ "Shopping Cart" ทุกๆ 500 มิลลิวินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % couponColors.length);
    }, 500); // ความเร็วในการเปลี่ยนสี
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* สไตล์สำหรับหัวเรื่อง */}
      <h1 style={{ 
        textAlign: 'center', 
        color: couponColors[colorIndex], // เปลี่ยนสี RGB
        fontSize: '2.5em', 
        margin: '20px 0'
      }}>
        Photharam Beetle Shop
      </h1>

      {/* แสดงรายการสินค้าโดยใช้ Flexbox */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
              width: '150px',
            }}
          >
            <img src={product.image} alt={product.name} style={{ width: '125px', height: '100px' }} />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* จัด layout สำหรับ Shopping Cart และ Coupon Section */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* Shopping Cart Section */}
        <div style={{ border: '1px solid #000', padding: '20px', width: '50%', textAlign: 'center' }}>
          <h2 style={{ color: couponColors[colorIndex], transition: 'color 0.5s' }}>
            <i class="fi fi-br-shopping-cart-add"></i> Shopping Cart
          </h2>
          {cart.length === 0 ? (
            <p>***ไม่มีสินค้าในรถเข็น***</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price} x {item.quantity}
                  <div style={{ display: 'inline-block', border: '1px solid black', marginLeft: '5px', padding: '5px' }}>
                    <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
                    <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p>ส่วนลด: ${discount.toFixed(2)}</p>
          <p>ค่าขนส่ง: ${shippingFee}</p>
          <h3>ค่าใช้จ่ายทั้งหมด: ${(totalPrice - discount + shippingFee).toFixed(2)}</h3>
          
         
        </div>

        {/* Coupon Section */}
        <div style={{
          border: '2px solid black', 
          padding: '10px', 
          maxWidth: '300px', 
          backgroundColor: couponColors[colorIndex], // เปลี่ยนสี RGB
          textAlign: 'center', 
          marginLeft: '20px',
          transition: 'background-color 0.5s'
        }}>
          <h3>สุ่มคูปองส่วนลด</h3>
          <button 
            onClick={generateRandomCoupon} 
            style={{ 
              padding: '5px', 
              fontSize: '1.2em', 
              cursor: 'pointer', 
              margin: '5px auto',
              border: '1px solid black',
              backgroundColor: '#fff',
              display: 'block'
            }}>
            กดเพื่อรับส่วนลด
          </button>
          {coupon && <p>ยินดีด้วยคุณได้รับคูปอง {(coupon * 100).toFixed(0)}% !!!</p>}

          {/* แสดงภาพเมื่อสุ่มคูปองแล้ว */}
          {showCouponImage && <img src="k.webp" alt="Coupon" style={{ width: '100px', marginTop: '100px' }} />}
        </div>
      </div>
    </div>
  );
}

