import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
            Hoodie Store
        </Link>

        <div>
            <Link className="text-white me-3" to={'/'}>
                Home
            </Link>
            <Link className="text-white me-3" to={'products'}>
                Products
            </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
