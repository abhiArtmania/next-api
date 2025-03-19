import Link from "next/link";
import './style.css'

export default function Home() {
  return (
    <div className="home-page">
      <Link href='/addProduct'>Add Product</Link>
      <br/>
      <Link href='/productList'>Product List</Link>
    </div>
  );
}
